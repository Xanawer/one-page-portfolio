import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 320, height: 568 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`${viewport.name} layout stays inside the viewport`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sections: Array.from(document.querySelectorAll(".portfolio-section")).map(
        (section) => {
          const rect = section.getBoundingClientRect();
          return { left: rect.left, right: rect.right };
        },
      ),
    }));

    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
    for (const section of dimensions.sections) {
      expect(section.left).toBeGreaterThanOrEqual(0);
      expect(section.right).toBeLessThanOrEqual(dimensions.clientWidth);
    }

    const mobileNavigation = page.getByRole("navigation", {
      name: "Portfolio sections",
    });
    if (viewport.width < 768) {
      await expect(mobileNavigation).toBeVisible();
    } else {
      await expect(mobileNavigation).toBeHidden();
    }
  });
}

test("mobile navigation reaches contact without hiding it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await page.waitForTimeout(1_000);
  await page.getByRole("button", { name: "Contact", exact: true }).click();

  await expect
    .poll(() =>
      page
        .locator("#contact")
        .evaluate((element) => Math.round(element.getBoundingClientRect().top)),
    )
    .toBeLessThan(80);
});

test("mobile active chip moves directly to the requested section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 654, height: 734 });
  await page.goto("/");
  await page.waitForTimeout(1_000);
  await page.locator("#skills").evaluate((section) => {
    window.scrollTo({
      top: (section as HTMLElement).offsetTop,
      behavior: "instant" as ScrollBehavior,
    });
  });

  await expect
    .poll(() =>
      page
        .locator("[data-active-chip]")
        .evaluate((chip) => chip.parentElement?.textContent?.trim()),
    )
    .toBe("Skills");

  await page.evaluate(() => {
    const selected: string[] = [];
    const sample = () => {
      const text = document
        .querySelector("[data-active-chip]")
        ?.parentElement?.textContent?.trim();
      if (text && selected.at(-1) !== text) selected.push(text);
    };
    sample();
    const interval = window.setInterval(sample, 16);
    window.setTimeout(() => window.clearInterval(interval), 1_500);
    Object.assign(window, { __selectedChipSequence: selected });
  });

  await page.getByRole("button", { name: "About", exact: true }).click();
  await page.waitForTimeout(1_500);

  const sequence = await page.evaluate(
    () =>
      (
        window as typeof window & {
          __selectedChipSequence: string[];
        }
      ).__selectedChipSequence,
  );
  expect(sequence).toEqual(["Skills", "About"]);
});

test("desktop sidebar navigation settles on the latest selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  await page.getByRole("link", { name: "Contact.", exact: true }).click();
  await page.getByRole("link", { name: "About.", exact: true }).click();

  await expect
    .poll(
      () =>
        page
          .locator(".portfolio-section")
          .nth(0)
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      { timeout: 1_500 },
    )
    .toBeLessThan(80);
});

test("desktop sections fill the viewport and keep outgoing panels stable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  const sectionHeights = await page
    .locator(".portfolio-section")
    .evaluateAll((sections) =>
      sections.map((section) => section.getBoundingClientRect().height),
    );
  for (const height of sectionHeights) {
    expect(height).toBeGreaterThanOrEqual(900);
  }

  await page.getByRole("link", { name: "Projects.", exact: true }).click();
  await expect
    .poll(() =>
      page.locator("#projects .portfolio-panel").evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none"
          ? 0
          : Math.round(new DOMMatrixReadOnly(transform).m42);
      }),
    )
    .toBe(0);

  await page.evaluate(() => {
    const transforms: number[] = [];
    const sample = () => {
      const panel = document.querySelector("#projects .portfolio-panel");
      if (!panel) return;
      const transform = getComputedStyle(panel).transform;
      transforms.push(
        transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42,
      );
    };
    sample();
    const interval = window.setInterval(sample, 16);
    window.setTimeout(() => window.clearInterval(interval), 1_500);
    Object.assign(window, { __projectPanelTransforms: transforms });
  });

  await page.getByRole("link", { name: "Skills.", exact: true }).click();
  await page.waitForTimeout(1_500);

  const transforms = await page.evaluate(
    () =>
      (
        window as typeof window & {
          __projectPanelTransforms: number[];
        }
      ).__projectPanelTransforms,
  );
  expect(Math.max(...transforms.map(Math.abs))).toBeLessThanOrEqual(1);
});

test("active sidebar text follows its expanding bar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  const aboutLink = page.getByRole("link", { name: "About.", exact: true });
  const inactiveX = (await aboutLink.boundingBox())?.x;
  await aboutLink.click();
  await page.waitForTimeout(300);
  const activeX = (await aboutLink.boundingBox())?.x;

  expect(inactiveX).toBeDefined();
  expect(activeX).toBeDefined();
  expect(activeX! - inactiveX!).toBeGreaterThan(50);
});

test("sidebar bar aligns with the bottom of its label", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  const labelBounds = await page
    .getByRole("link", { name: "ASCII.", exact: true })
    .boundingBox();
  const lineBounds = await page
    .locator('[data-sidebar-line="ascii"]')
    .boundingBox();

  expect(labelBounds).not.toBeNull();
  expect(lineBounds).not.toBeNull();
  expect(
    Math.abs(
      lineBounds!.y +
        lineBounds!.height -
        (labelBounds!.y + labelBounds!.height),
    ),
  ).toBeLessThanOrEqual(2);
});

test("animated section headings only react over their visible text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#projects");
  await page.waitForTimeout(1_000);

  const widths = await page
    .locator('#projects a[href="#"]')
    .evaluate((link) => {
      const letters = Array.from(link.querySelectorAll("div:first-child span"));
      const first = letters[0]?.getBoundingClientRect();
      const last = letters.at(-1)?.getBoundingClientRect();

      return {
        hitbox: link.getBoundingClientRect().width,
        text:
          first && last
            ? last.right - first.left
            : link.getBoundingClientRect().width,
      };
    });

  expect(widths.hitbox - widths.text).toBeLessThanOrEqual(2);
});

test("repeated navigation keeps the latest pending target active", async ({
  page,
}) => {
  await page.setViewportSize({ width: 654, height: 734 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  const projectsButton = page.getByRole("button", {
    name: "Projects",
    exact: true,
  });
  await projectsButton.click();
  await projectsButton.click();

  await expect(page.locator("[data-waterfall-variant]")).toHaveAttribute(
    "data-waterfall-variant",
    "projects",
  );
});

test("waterfall persists with a stable variation for each section", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1_000);

  const waterfall = page.locator("[data-waterfall-variant]");
  const initialStream = await waterfall
    .locator(".ascii-waterfall-column")
    .first()
    .textContent();
  await expect(waterfall).toHaveAttribute("data-waterfall-variant", "ascii");
  await expect(waterfall.locator("..")).toHaveCSS("position", "fixed");

  await page.getByRole("link", { name: "Projects.", exact: true }).click();
  await expect(waterfall).toHaveAttribute("data-waterfall-variant", "projects");
  await expect(
    waterfall.locator(".ascii-waterfall-column").first(),
  ).not.toHaveText(initialStream ?? "");

  await page.getByRole("link", { name: "ASCII.", exact: true }).click();
  await expect(waterfall).toHaveAttribute("data-waterfall-variant", "ascii");
  await expect(waterfall.locator(".ascii-waterfall-column").first()).toHaveText(
    initialStream ?? "",
  );
});

test("mobile chat remains inside the available viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await page.waitForTimeout(1_000);
  await page.locator("pre", { hasText: "Chat with me!" }).click();

  const closeButton = page.getByRole("button", { name: "Close", exact: true });
  await expect(closeButton).toBeVisible();
  const panelBounds = await page.getByTestId("chat-panel").boundingBox();

  expect(panelBounds).not.toBeNull();
  expect(panelBounds!.x).toBeGreaterThanOrEqual(0);
  expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(320);
  expect(panelBounds!.y).toBeGreaterThanOrEqual(0);
  expect(panelBounds!.y + panelBounds!.height).toBeLessThanOrEqual(568);
});

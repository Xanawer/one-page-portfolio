import { expect, test } from "@playwright/test";

test("opens the chat dialog from the Chat with me control", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Chat with me!" }).click();

  await expect(page.getByRole("dialog")).toBeVisible();
});

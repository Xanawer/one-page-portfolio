import Script from "next/script";

export default function ASCIIUpload() {
  return (
    <div>
      <header>
        <h1>Ascii Art Converter</h1>
        <p>Upload a picture and turn it into pure ASCII masterpiece!</p>
      </header>

      <input type="file" name="picture" />
      <canvas id="preview" style={{ display: "none" }}></canvas>
      <pre id="ascii" className="line-clamp-0 text-xs tracking-[0.1em]"></pre>
      <Script src="/scripts/ascii.js" />
    </div>
  );
}

# Terminal Guide: Converting SVG Vector Graphics to PNG

This guide explains how to convert SVG vector graphics to high-resolution PNG images directly from your terminal using Node.js tools.

---

## 1. Quick One-Line Command (Using `resvg-cli`)

Run this command directly in your terminal to convert any SVG to PNG:

```bash
npx resvg-cli path/to/input.svg path/to/output.png --fit-width 512
```

### Options Breakdown:
- `--fit-width 512`: Scales the width to 512 pixels (maintaining aspect ratio).
- `--fit-height 512`: Set height explicitly.
- `--background "rgba(0,0,0,0)"`: Useful if you want to force a specific background color.

---

## 2. Alternative Command (Using `sharp-cli`)

Another powerful image processing tool is **`sharp-cli`**:

```bash
npx sharp-cli -i path/to/input.svg -o path/to/output_folder -f png
```

---

## 3. Why Use CLI Conversion?
- **Ultra Fast**: Converts vector graphics into crisp pixel bitmaps in milliseconds.
- **Zero Software Needed**: You don't need Photoshop, Illustrator, or Figma installed.
- **Preserves Quality**: You can specify any dimension (e.g. 512px, 1024px) for super sharp icons and badges.

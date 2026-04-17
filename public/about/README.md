# About photo

Drop your head-and-shoulders portrait here as **`jagraj.jpg`** (exact filename).

Specs:
- **Square** (1:1), ideally ≥600×600 px
- **JPG or WebP**, target ≤80 KB after compression ([squoosh.app](https://squoosh.app) is the easiest tool)
- Neutral background, soft natural light, no filters

The About section at `src/components/sections/About.tsx` renders this file via
`next/image`. Until the file exists the build will succeed but the image will
404 in the browser.

If you want to use a different filename or format, edit the `<Image src="…">`
prop in `About.tsx`.

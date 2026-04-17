# Resume PDF

Drop your latest resume here as **`jagraj-singh-resume.pdf`** (exact filename).

The `/resume` route at `src/app/resume/route.ts` reads this file and serves it
inline. The hero "Download resume" button, the nav "Resume" link, and the
footer all point at `/resume`.

Until the PDF exists, `/resume` returns a 404 with a helpful error message.

```
public/
└── resume/
    ├── README.md                      ← this file
    └── jagraj-singh-resume.pdf        ← put it here
```

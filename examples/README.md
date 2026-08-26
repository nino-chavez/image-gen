# Examples

One-off design explorations — a business card, a laptop skin, a LinkedIn banner,
profile-logo studies. They are finished documents, not data-driven templates.

They live here rather than in `templates/` for three reasons: they contain no
`{{placeholder}}`, so `image-gen template --data …` would render them ignoring
the data; `listTemplates()` walks `templates/` and would advertise them as
things you can fill in; and `package.json`'s `files` ships `templates/` to every
consumer of the published package, which is the wrong place for someone's
personal contact card.

Render one the same way as any HTML file:

```bash
image-gen render examples/profile-logo/01-monogram.html -o logo.png
```

## Some of these need assets you generate locally

`laptop-skin/option-2b-flickday-pepper.html` references
`output/poster-mocks/concept-ghost-pepper-PRO-v2.png`. `output/` is gitignored,
so that file is not in the repo and the render comes out with a gap where the
character should be.

You will see it rather than guess at it — the renderer reports any subresource
that failed to load:

```
Rendered with 1 asset(s) that failed to load:
  file:///…/output/poster-mocks/concept-ghost-pepper-PRO-v2.png
```

Generate the poster mock into that path first, or point the `<img>` at your own
character art.

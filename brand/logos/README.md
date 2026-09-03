# Logo Assets

Placeholders for the two marks shared for this brand. Drop the source files
in here using these names so the rest of the repo (app shell, style guide)
can reference stable paths:

| Expected file | Description | Primary use |
|---|---|---|
| `wordmark.png` (+ `.svg` if available) | "GOOD AZ GOLD" gold-on-black lockup, two lines | Marketing pages, loading/splash screens, wide headers |
| `monogram.png` (+ `.svg` if available) | "GAG" interlocking monogram | App header/nav bar, favicon source, app icon |

Prefer adding vector (`.svg`) originals if you have them — the app shell and
favicon generation both want a vector source rather than a raster export.

Until the source files are added here, the app shell ([apps/web](../../apps/web))
renders a CSS-only placeholder mark using the tokens in
[../tokens.css](../tokens.css) so the header isn't blank during development.

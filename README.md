# dsh-fa-rtl

Persian (fa) reading direction and the Vazirmatn typeface for the DSH web GUI —
without touching any layout box.

## What it does

- Embeds Vazirmatn (woff2 as data URLs) and points `--dsh-font-family-text` at it.
- Marks prose blocks with `dir="auto"`, so each paragraph resolves its own
  direction from its first strong character: Persian reads RTL, an English
  sentence inside the same answer reads LTR.
- Keeps `pre`, `code`, `kbd`, `samp` left-to-right and isolated.
- Uses logical edges (`padding-inline-start`, `border-inline-start`) for lists and
  quotes, so nothing depends on a hard-coded side.

What it deliberately does **not** do: set `direction: rtl` on `<html>`, `<body>`
or any container. The shell has no RTL layout — a container-level direction
mirrors every flex row, moves the session sidebar, and leaves `position: fixed`
panels at their physical left edge on top of the content.

## Install

Link the package into a DSH profile:

```json
{
  "dependencies": {
    "dsh-fa-rtl": "link:C:/path/to/dsh-fa-rtl"
  },
  "dsh": {
    "profile": {
      "bundles": ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "dsh-fa-rtl"]
    }
  }
}
```

Then restart `dsh web` and hard-reload (`Ctrl+F5`).

## Build

`client.js` is generated — edit `src/client.css` or `scripts/build.mjs`, never the
bundle.

```sh
node scripts/build.mjs   # rewrite client.js
node scripts/check.mjs   # invariants + stub-DOM smoke test
```

## License

Code: MIT (see `package.json`). Fonts: Vazirmatn, SIL OFL 1.1 — `fonts/OFL.txt`.

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

Two commands, then restart:

```sh
dsh plugin --profile web add github:ItsyaboiParsa/dsh-fa-rtl
node -e "const p=require('path').join(process.env.DSH_HOME||require('os').homedir()+'/.dsh','profiles/web/package.json'),j=require(p),b=j.dsh.profile.bundles;b.includes('dsh-fa-rtl')||b.push('dsh-fa-rtl');require('fs').writeFileSync(p,JSON.stringify(j,null,2)+'\n')"
```

The second line only registers the package in `dsh.profile.bundles` — DSH does
not do that for you. Restart `dsh web`, hard-reload (`Ctrl+F5`).

Uninstall:

```sh
dsh plugin --profile web remove dsh-fa-rtl
```

…then delete `"dsh-fa-rtl"` from `dsh.profile.bundles` in
`~/.dsh/profiles/web/package.json`.

## Build

`client.js` is generated — edit `src/client.css` or `scripts/build.mjs`, never the
bundle.

```sh
node scripts/build.mjs   # rewrite client.js
node scripts/check.mjs   # invariants + stub-DOM smoke test
```

## License

Code: MIT (see `package.json`). Fonts: Vazirmatn, SIL OFL 1.1 — `fonts/OFL.txt`.

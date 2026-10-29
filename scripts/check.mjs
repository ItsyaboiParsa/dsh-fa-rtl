import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const s = readFileSync('client.js', 'utf8')
const start = s.indexOf('const CSS = "')
const css = JSON.parse(s.slice(start + 12, s.indexOf('\n', start + 12)))
  .replace(/\/\*[\s\S]*?\*\//g, '')

console.log('container dir rtl    :', /direction:\s*rtl/.test(css))
console.log('code ltr             :', /pre[\s\S]*?\{[\s\S]*?direction:\s*ltr/.test(css))
console.log('font family          :', css.includes('Vazirmatn'))
console.log('dir=auto marking     :', s.includes("setAttribute('dir', 'auto')"))
console.log('dir=rtl attr written :', s.includes("setAttribute('dir', 'rtl')"))

// Smoke-test the browser half against a stub DOM: it must inject one style tag
// and mark prose blocks, without ever writing a direction on a container.
const node = (tag) => ({
  nodeType: 1, tag, attrs: {}, dataset: {},
  hasAttribute(n) { return n in this.attrs },
  getAttribute(n) { return this.attrs[n] ?? null },
  setAttribute(n, v) { this.attrs[n] = v },
  matches(sel) { return sel.split(',').includes(this.tag) },
  querySelectorAll(sel) { return this.tag === 'body' && sel.includes('p') ? [p] : [] },
  children: [],
  appendChild(child) { this.children.push(child) },
  textContent: '',
})
const p = node('p')
const body = node('body')
const head = node('head')
const document = {
  readyState: 'complete', documentElement: node('html'), body, head,
  createElement: node, querySelector: () => null,
}
let factory
runInNewContext(s, {
  window: { __ModuleLoader__: { load: (m) => { factory = m.factory } } },
  document,
  MutationObserver: class { observe() {} },
})
factory()

console.log('style tag injected   :', head.children[0]?.dataset.pluginCss === 'dsh-fa-rtl')
console.log('prose marked auto    :', p.attrs.dir === 'auto')
console.log('body dir untouched   :', (body.attrs.dir ?? 'unset') === 'unset')
console.log('bundle bytes         :', s.length)

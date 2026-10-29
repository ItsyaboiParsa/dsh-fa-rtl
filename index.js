/**
 * Host half of dsh-fa-rtl.
 *
 * The plugin owns no host service: its whole contribution is the browser
 * stylesheet it injects, declared through `dsh.client` in package.json.
 */

/** Mount the browser entry; nothing to do on the host side. */
export function apply() {}

var acorn = require("acorn");

console.log(acorn.parse(`
/**
 * Try LitElement https://lit-element.polymer-project.org/guide/try
 * Starting code for 4. Logic
 */

import { LitElement, html } from '@polymer/lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      message: { type: String }
    };
  }
  constructor() {
    super();
    this.message='Hello world! From my-element';
  }

  render() {
    return html\`
      <p>${this.message}</p>
    \`;
  }
}
customElements.define('my-element', MyElement);
`, {sourceType: "module"}));
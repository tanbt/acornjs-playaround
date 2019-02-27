var acorn = require("acorn");
var walk = require("acorn-walk");

var content = `
/**
 * Try LitElement https://lit-element.polymer-project.org/guide/try
 * Starting code for 4. Logic
 */

import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';

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
      <p>\${this.message}</p>
    \`;
  }
}
customElements.define('my-element', MyElement);
`;
const rootNode = acorn.parse(content, { sourceType: "module" });
console.log(rootNode);

function getImportDeclarationsNodes(node) {
    const importDeclarationsNodes = [];
    walk.simple(rootNode, {
        ImportDeclaration(node) {
            importDeclarationsNodes.push(node);
        }
    })
    return importDeclarationsNodes;
}

function getTemplateNode(root) {
    let renderFunction = null;
    walk.simple(root, {
        MethodDefinition(f) {
            if (f.key.name == 'render') {
                renderFunction = f;
            }
        }
    });
    const htmlTags = [];
    walk.simple(renderFunction, {
        TaggedTemplateExpression(node) {
            htmlTags.push(node);
        }
    });
    return htmlTags[0];
}

const templateNode = getTemplateNode(rootNode);
const importNodes = getImportDeclarationsNodes(rootNode);

console.log(importNodes);
console.log(templateNode);

// const literal = node.source.value;
//         console.log(literal);
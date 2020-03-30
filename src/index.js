import { h, render } from "preact";

const node = document.querySelector("main");

render(<div class="b">Hello, Preact!</div>, node, node.lastChild);

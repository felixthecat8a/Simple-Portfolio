# Front-End Testing

Front-end tests check JavaScript that interacts with HTML, the DOM, or browser-like behavior.

## Install

```bash
yarn add --dev jsdom
```

## Example

Suppose your HTML contains:

```html
<button id="counter">Click me</button>
<p id="count">0</p>
```

You can use jsdom to simulate a basic DOM interaction:

```javascript
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

describe('Counter', function () {
  it('updates the displayed count', function () {
    const dom = new JSDOM(`
      <button id="counter">Click me</button>
      <p id="count">0</p>
    `);

    const { document } = dom.window;
    const button = document.querySelector('#counter');
    const count = document.querySelector('#count');

    button.addEventListener('click', function () {
      count.textContent = String(Number(count.textContent) + 1);
    });

    button.click();

    expect(count.textContent).to.equal('1');

    dom.window.close();
  });
});
```

## When to Use jsdom

Use jsdom for testing DOM manipulation and basic browser-like interactions.

It does not reproduce every browser feature. For tests involving real rendering, layout, or browser-specific behavior, consider a browser automation tool later.

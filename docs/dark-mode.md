<!-- Dark Mode Toggle -->
# Dark Mode Toggle
A simple class-based dark mode toggle that uses a checkbox to switch between light and dark themes.

## HTML Setup
Add the following markup to your page where you want the toggle to appear:
```html
<label class="dark-mode-toggle">
  <input type="checkbox" id="darkModeCheckbox" class="dark-mode-checkbox">
  <span id="slider">light</span>
</label>
```
### Dark Mode Toggle JavaScript (Inline Example)
```html
<script>
  const darkModeCheckbox = document.getElementById('darkModeCheckbox')
  const darkModeText = document.getElementById('slider')
  if (localStorage.getItem('darkMode') === 'true') {
    darkModeCheckbox.checked = true
    document.body.classList.add('dark-mode');
    darkModeText.textContent = 'dark'
  }
  darkModeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeCheckbox.checked)
    if (darkModeCheckbox.checked) {
      darkModeText.textContent = 'dark'
    } else {
        darkModeText.textContent = 'light'
    }
  })
</script>
```

## Alternate Application (External Script)
Instead of writing the HTML manually, you can generate the toggle dynamically with JavaScript.
Create a file called ***toggleDarkMode.js***:
```js
function setupDarkModeToggle() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "darkModeCheckbox";
  checkbox.className = "dark-mode-checkbox";

  const span = document.createElement("span");
  span.id = "slider";
  span.textContent = "light";

  const label = document.createElement("label");
  label.className = "dark-mode-toggle";
  label.appendChild(checkbox);
  label.appendChild(span);

  document.body.appendChild(label);

  if (localStorage.getItem("darkMode") === "true") {
    checkbox.checked = true;
    document.body.classList.add("dark-mode");
    span.textContent = "dark";
  }

  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", checkbox.checked);
    span.textContent = checkbox.checked ? "dark" : "light";
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupDarkModeToggle()
})

```
Include it in your HTML:
```html
<script src="toggleDarkMode.js"></script>
```


## Another Alternate Application (Webcomponent)

```js
class DarkModeToggle extends HTMLElement {
  constructor() {
    super();

    // Create the component's internal elements.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "darkModeCheckbox";
    checkbox.className = "dark-mode-checkbox";

    const span = document.createElement("span");
    span.id = "slider";
    span.textContent = "light";

    const label = document.createElement("label");
    label.className = "dark-mode-toggle";

    label.appendChild(checkbox);
    label.appendChild(span);

    this.appendChild(label);

    // Keep references to the elements.
    this.checkbox = checkbox;
    this.slider = span;
  }

  connectedCallback() {
    // Restore the saved preference.
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    this.checkbox.checked = isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);

    this.updateLabel();

    // Listen for changes.
    this.checkbox.addEventListener("change", this.handleChange);
  }

  disconnectedCallback() {
    // Clean up the event listener when removed.
    this.checkbox.removeEventListener("change", this.handleChange);
  }

  handleChange = () => {
    const isDarkMode = this.checkbox.checked;

    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);

    this.updateLabel();
  };

  updateLabel() {
    this.slider.textContent = this.checkbox.checked ? "dark" : "light";
  }
}

// Register the custom element.
customElements.define("dark-mode-toggle", DarkModeToggle);
```

- Add the linked script tag to your HTML head tag

```html
<script src="component/dark-mode-toggle.js" defer></script>
```

- Add the component tag to the body tag

```html
<dark-mode-toggle></dark-mode-toggle>
```

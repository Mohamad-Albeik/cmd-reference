# Windows CMD Cheat Sheet

A modern, offline-ready reference for Windows Command Prompt commands. Designed for beginners and power users, featuring a responsive interface, dark mode, and instant search.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

* **Dynamic Search:** Instantly filter commands by name, description, or keywords (debounced for performance).
* **Dark/Light Mode:** Automatically respects system preferences but can be toggled manually. Persists via LocalStorage.
* **Zero Dependencies:** Built with pure HTML, CSS, and Vanilla JavaScript.
* **Data Driven:** All content is rendered dynamically from a JSON file, making updates easy.
* **Developer Friendly:** * Syntax highlighting for commands.
    * "Copy to Clipboard" functionality.
    * Visual terminal previews for output.

## 🚀 How to Run

Because this project uses `fetch()` to load the `data.json` file, it **cannot** be run by simply opening `index.html` in a browser due to CORS (Cross-Origin Resource Sharing) security policies.

### Option 1: Running via link
https://mohamad-albeik.github.io/Windows-CMD/

### Option 2: VS Code Live Server (Recommended)
1.  Open the project in VS Code.
2.  Install the "Live Server" extension.
3.  Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Python Local Server
If you have Python installed, run this in the project terminal:
```bash
# Python 3

python -m http.server 8000

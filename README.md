# Windows CMD Sheet

A modern, offline-ready reference for Windows Command Prompt commands. Designed for beginners and power users, featuring a responsive interface, dark mode, and instant search.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
#
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/6e1547c9-ad7f-4708-971c-1ac581abb369" />

## ✨ Features

* **Dynamic Search:** Instantly filter commands by name, description, or keywords (debounced for performance).
* **Dark/Light Mode:** Automatically respects system preferences but can be toggled manually. Persists via LocalStorage.
* **Zero Dependencies:** Built with pure HTML, CSS, and Vanilla JavaScript.
* **Data Driven:** All content is rendered dynamically from a JSON file, making updates easy.
* **Developer Friendly:**
    * Syntax highlighting for commands.
    * "Copy to Clipboard" functionality.
    * Visual terminal previews for output.

## 🚀 Live Demo

You can view the fully functional project live in your browser here: **[➡️ View Live Demo](https://mohamad-albeik.github.io/Windows-CMD/)**

*(Note: If you clone this repository, you cannot simply double-click `index.html` to run it due to browser security settings. Please use the live link above unless you are setting up a local server.)*

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** CSS Variables for theming, Flexbox/Grid for layout.
* **JavaScript (ES6+):** Async/Await for data fetching, DOM manipulation.
* **JSON:** Structured data storage for commands.

## 📂 Project Structure

```text
├── data.json       # Contains all command data, icons, and examples
├── index.html      # Main entry point
├── script.js       # Logic for rendering, search, theming, and interactions
├── style.css       # Styling and dark/light mode definitions
├── header-bg.jpg   # Background asset
└── README.md       # Project documentation










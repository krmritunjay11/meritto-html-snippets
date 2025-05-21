
# Meritto HTML Snippets

![Extension Icon](media/icon.png)

## Description

Meritto HTML Snippets is a Visual Studio Code extension that provides dynamic HTML UI snippets for `.html` files.  
It fetches the latest reusable snippet templates directly from the BrandFactory API and suggests them inline while you code.  

No manual snippet updates needed — your snippets are always fresh!

---

## Features

- Provides HTML snippet completions in `.html` files
- Dynamically fetches snippet templates and metadata from BrandFactory API
- Snippet keys formatted as `Meritto:<main-title>-<inner-title>` (spaces replaced by dashes, lowercase)
- Inserts ready-to-use HTML snippet code into your editor
- Caches snippets for 5 minutes to improve performance
- Trigger completions by typing `Meritto:` followed by snippet name or using `Ctrl+Space`

---

## How to Use

1. Open or create an `.html` file in VS Code.
2. Start typing snippet keys beginning with `Meritto:` (e.g., `Meritto:alert-success-alert`).
3. Use autocomplete suggestions or press `Ctrl+Space` to trigger snippet completions.
4. Select a snippet to insert the corresponding HTML code inline.

---

## Installation

1. Download or clone the extension repository.
2. Run `npm install` to install dependencies.
3. Press `F5` in VS Code to launch the Extension Development Host with the extension enabled.
4. Optionally, package the extension using `vsce package` and install the `.vsix` file.

---

## Requirements

- Visual Studio Code version 1.60 or higher
- Internet connection to fetch snippets from the BrandFactory API

---

## Extension Settings

None at the moment.

---

## Known Issues

- Snippets require an active internet connection to fetch updates.
- Snippet suggestions may have slight delay on first use due to fetching.
- Caching duration is 5 minutes; you can restart VS Code to refresh snippets immediately.

---

## Release Notes

### 0.0.4

- Initial release with dynamic snippet fetching from BrandFactory
- Supports HTML snippet completions in `.html` files

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/krmritunjay11/meritto-html-snippets/issues).

---

## License

MIT License © 2025 Mritunjay Kumar

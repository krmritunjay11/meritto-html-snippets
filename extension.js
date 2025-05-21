const vscode = require('vscode');
const https = require('https');

let cachedSnippets = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // Cache for 5 minutes

function formatKey(mainTitle, innerTitle) {
  let combined = mainTitle.trim();
  if (innerTitle.trim().toLowerCase() !== mainTitle.trim().toLowerCase()) {
    combined = `${mainTitle.trim()} ${innerTitle.trim()}`;
  }
  return 'Meritto:' + combined.toLowerCase().replace(/\s+/g, '-');
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function fetchSnippets() {
  const now = Date.now();
  if (cachedSnippets && now - lastFetchTime < CACHE_DURATION_MS) {
    console.log('Using cached snippets');
    return cachedSnippets;
  }

  const url = 'https://brandfactory.nopaperforms.in/wp-json/custom/v1/shortcodes';

  try {
    console.log('Fetching snippets from BrandFactory...');
    const data = await fetchJson(url);
    console.log('Fetched snippet data:', data.length, 'items');

    const snippets = {};

    for (const item of data) {
      const mainTitle = item.title || '';
      if (item.shortcodes && Array.isArray(item.shortcodes)) {
        for (const shortcode of item.shortcodes) {
          const attrs = shortcode.attributes;
          if (attrs && attrs.title && attrs.code) {
            const key = formatKey(mainTitle, attrs.title);
            snippets[key] = attrs.code;
            console.log('Added snippet key:', key);
          }
        }
      }
    }

    cachedSnippets = snippets;
    lastFetchTime = now;

    console.log('Total snippets cached:', Object.keys(snippets).length);
    return snippets;
  } catch (err) {
    console.error('Error fetching snippets:', err);
    return {};
  }
}

function activate(context) {
  console.log('Extension activated!');

  const provider = vscode.languages.registerCompletionItemProvider(
    { language: 'html' },
    {
      async provideCompletionItems() {
        const snippets = await fetchSnippets();

        return Object.entries(snippets).map(([key, value]) => {
          const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Snippet);
          item.detail = "BrandFactory HTML Snippet";
          item.insertText = new vscode.SnippetString(value);
          item.documentation = new vscode.MarkdownString(value);
          return item;
        });
      }
    },
    ':', '-' // trigger completions on colon or dash characters
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};


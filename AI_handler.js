const vscode = require('vscode');
const fetch = require('node-fetch'); // or use axios
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API key securely stored in .env
});
const openai = new OpenAIApi(configuration);

async function fetchSnippetsWithOpenAI(siteContent) {
  const prompt = `
    Extract HTML snippet keys and their corresponding code snippets from the following text.
    Return the result as a JSON object with key-value pairs.

    Text:
    ${siteContent}
  `;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 500,
    temperature: 0,
  });

  try {
    const text = response.data.choices[0].text.trim();
    return JSON.parse(text); // Expecting JSON response
  } catch {
    return {};
  }
}

async function getSiteContent() {
  const res = await fetch('https://brandfactory.nopaperforms.in/');
  return await res.text(); // raw HTML or text
}

function activate(context) {
  const provider = vscode.languages.registerCompletionItemProvider(
    { language: 'html' },
    {
      async provideCompletionItems(document, position) {
        try {
          const siteContent = await getSiteContent();
          const snippets = await fetchSnippetsWithOpenAI(siteContent);

          return Object.entries(snippets).map(([key, value]) => {
            const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Snippet);
            item.detail = "AI-generated snippet";
            item.insertText = new vscode.SnippetString(value);
            item.documentation = new vscode.MarkdownString(value);
            return item;
          });
        } catch (e) {
          console.error(e);
          return [];
        }
      }
    }
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };

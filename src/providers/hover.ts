import { google } from './google';
import * as vscode from 'vscode';

export const providerHover: vscode.HoverProvider = {
  provideHover(doc, pos, token): vscode.ProviderResult<vscode.Hover> {
    const editor = vscode.window.activeTextEditor;
    const selected = editor?.document.getText(editor?.selection);
    if (!selected) {
      return;
    }
    return new Promise(async (resolve) => {
      const result = await google(selected, { to: 'zh' });
      const text = '* **翻译结果如下：**\n*' + result?.candidate?.join(';');
      console.log(result);

      resolve(new vscode.Hover(text));
    });
  },
};

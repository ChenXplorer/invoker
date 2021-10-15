import * as vscode from 'vscode';
import { google } from './google';
import { getCamel, getUpper, wordSplit, TYPES } from './utils';

const formatWord = (word: string, type: string) => {
  switch (type) {
    case 'littleCamelCase':
      return getCamel(word).join('');

    case 'bigCamelCase':
      const bigCamelCase = wordSplit(word).map((v, index) => {
        return v.slice(0, 1).toUpperCase() + v.slice(1);
      });
      return bigCamelCase.join('');

    case 'crossCase':
      return wordSplit(word).join('-');

    case 'underlineCase':
      return wordSplit(word).join('_');

    case 'upperCase':
      return getUpper(word).join('');

    case 'upperCrossCase':
      return getUpper(word).join('-');

    case 'upperUnderlineCase':
      return getUpper(word).join('-');
    default:
      return word;
  }
};

const varToEn = async (type: string) => {
  const editor = vscode.window.activeTextEditor;
  const selected = editor?.document.getText(editor?.selection);
  const result = await google(selected, { to: 'en' });
  const en = result.text ? result.text : result.word;
  editor?.edit((builder) => {
    builder.replace(editor?.selection, formatWord(en, type));
  });
};

function getExports(value: any[]) {
  const result: vscode.Disposable[] = [];
  value.forEach((type) => {
    result.push(
      vscode.commands.registerCommand(`invoker.${type}`, () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        varToEn(type);
      }),
    );
  });
  return result;
}

const translateSets = getExports(TYPES);

export { translateSets };

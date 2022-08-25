import {monaco} from 'react-monaco-editor';

const KUSK_MONACO_THEME = 'kuskTheme';

const KUSK_THEME_DATA: monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    {token: 'string.yaml', foreground: '61b0eb'},
    {token: 'number.yaml', foreground: '61b0eb'},
  ],
  colors: {
    'editorWarning.foreground': '#e65a6d',
  },
};

const createKubeshopTheme = (editor: typeof monaco.editor) => {
  editor.defineTheme(KUSK_MONACO_THEME, KUSK_THEME_DATA);
};

createKubeshopTheme(monaco.editor);

export {KUSK_MONACO_THEME};

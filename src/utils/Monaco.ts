import {monaco} from 'react-monaco-editor';

import Colors from '@styles/colors';

const KUSK_MONACO_THEME = 'kuskTheme';

const KUSK_THEME_DATA: monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    {token: 'other', foreground: Colors.sky600},
    {token: 'string.yaml', foreground: Colors.lime600},
    {token: 'number', foreground: Colors.amber500},
    {token: 'comment', foreground: Colors.zinc4},
    {token: 'keyword', foreground: Colors.violet500},
    {token: 'variable', foreground: Colors.pink500},
    {token: 'type', foreground: Colors.sky600},
  ],
  colors: {
    'editor.foreground': Colors.zinc6,
    'editor.selectionBackground': Colors.sky100,
    'editor.lineHighlightBackground': Colors.zinc1,
    'editorIndentGuide.activeBackground': Colors.zinc4,
    'editorLineNumber.foreground': Colors.zinc250,
    'editorLineNumber.activeForeground': Colors.zinc9,
    'editorWarning.foreground': Colors.pink,
    'editorWhitespace.foreground': Colors.zinc2,
    'editorCursor.foreground': Colors.amber500,
  },
};

const createKubeshopTheme = (editor: typeof monaco.editor) => {
  editor.defineTheme(KUSK_MONACO_THEME, KUSK_THEME_DATA);
};

createKubeshopTheme(monaco.editor);

export {KUSK_MONACO_THEME};

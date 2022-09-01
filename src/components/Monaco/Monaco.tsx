import {useEffect, useMemo, useRef, useState} from 'react';
import MonacoEditor, {monaco} from 'react-monaco-editor';
import {useMeasure} from 'react-use';

import YAML from 'yaml';

import {KUSK_MONACO_THEME} from '@utils/Monaco';

import * as S from './Monaco.styled';

interface IProps {
  openapi: string;
  fullWidth?: boolean;
}

const Monaco = ({openapi, fullWidth}: IProps) => {
  const [containerRef, {width: containerWidth}] = useMeasure<HTMLDivElement>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [editor, setEditor] = useState(editorRef.current);

  const editorDidMount = (e: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = e as monaco.editor.IStandaloneCodeEditor;
    setEditor(e);

    e.updateOptions({tabSize: 2, scrollBeyondLastLine: false});
    e.revealLineNearTop(1);
    e.setSelection(new monaco.Selection(0, 0, 0, 0));
  };

  useEffect(() => {
    if (editor) {
      editor.revealLineNearTop(1);
      editor.setSelection(new monaco.Selection(0, 0, 0, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const options = useMemo(() => {
    const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
      selectOnLineNumbers: true,
      readOnly: true,
      renderValidationDecorations: 'on',
      glyphMargin: true,
      minimap: {
        enabled: false,
      },
    };
    return editorOptions;
  }, []);

  return (
    <S.MonacoContainer ref={containerRef} $fullWidth={fullWidth}>
      <MonacoEditor
        width={containerWidth}
        height="auto"
        language="yaml"
        value={YAML.stringify(openapi)}
        options={options}
        editorDidMount={editorDidMount}
        theme={KUSK_MONACO_THEME}
      />
    </S.MonacoContainer>
  );
};
export default Monaco;

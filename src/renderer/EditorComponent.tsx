import { useCodeMirror } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { useEffect, useRef, useState } from 'react';
import { Button, Paper } from '@mui/material';
import './App.css';

const code = 'import neurospike';
const extensions = [python()];

export default function EditorComponent() {
  const editor = useRef();
  const [editorContent, setEditorContent] = useState(code);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: vscodeDark,
    value: editorContent,
    onChange: (value) => {
      setEditorContent(value);
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  });

  const runCode = () => {
    window.electron.ipcRenderer.sendMessage('run-code', [editorContent]);
  };

  return (
    <div>
      <Paper elevation={0} className="ideWrapper">
        {/* <div ref={editorRef} /> */}
        <div ref={editor} />
      </Paper>
      <Button
        sx={{
          zIndex: 15,
          float: 'right',
        }}
        variant="contained"
        onClick={runCode}
      >
        Run
      </Button>
    </div>
  );
}

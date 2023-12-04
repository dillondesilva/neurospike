import { useCodeMirror } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { useEffect, useRef, useState } from 'react';
import { Button, Paper, Container, CircularProgress } from '@mui/material';
import './App.css';

const code = 'from neurospikelib.lif import LIFSimulation';
const extensions = [python()];

function CodeStatusElement(props: any) {
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const runCode = () => {
    setIsCodeRunning(true);
    console.log(props.editorContent)
    window.electron.ipcRenderer.sendMessage('run-code', [props.editorContent]);
    console.log("message sent")
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
    console.log(arg)
    setIsCodeRunning(false);
  });

  if (!isCodeRunning) {
    return (
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
    );
  }

  return <CircularProgress sx={{ zIndex: 15, float: 'right' }} />;
}
export default function EditorComponent() {
  const editor = useRef();
  const [editorContent, setEditorContent] = useState(code);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: vscodeDark,
    value: editorContent,
    height: '45vh',
    onChange: (value) => {
      setEditorContent(value);
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  });

  return (
    <div>
      <Paper elevation={0} className="ideWrapper">
        <div height="200px" ref={editor} />
      </Paper>
      <Container
        sx={{
          paddingRight: 0.5,
          paddingTop: 0.5,
        }}
      >
        <CodeStatusElement editorContent={editorContent} />
      </Container>
    </div>
  );
}

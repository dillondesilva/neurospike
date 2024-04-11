import { useCodeMirror } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { python } from '@codemirror/lang-python';
import { useEffect, useRef, useState } from 'react';
import { Button, Paper, Container, CircularProgress } from '@mui/material';
import './App.css';
import { loadPyodide } from 'pyodide';

const code = 'from neurospikelib.lif import LIFSimulation';
const extensions = [python()];

async function hello_python(content) {
  const pyodide = await loadPyodide({
    indexURL: './pyodide/',
  });

  pyodide.setStdout({
    batched: (string) => {
      window.electron.ipcRenderer.sendMessage('run-code', [string]);
    },
  });

  await pyodide.loadPackage('numpy');
  await pyodide.loadPackage('./pyodide/neurospikelib-0.1.0-py3-none-any.whl');
  console.log('now running python');
  let val = await pyodide.runPythonAsync(content);
  return val;
}

function CodeStatusElement(props: any) {
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const runCode = () => {
    setIsCodeRunning(true);

    hello_python(props.editorContent).then((result) => {
      setIsCodeRunning(false);
    });
    // console.log(props.editorContent);
    // window.electron.ipcRenderer.sendMessage('run-code', [props.editorContent]);
    // console.log('message sent');
  };

  window.electron.ipcRenderer.on('run-code', async (arg: string) => {
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

export default function EditorComponent({ codeString }) {
  const editor = useRef();
  const [editorContent, setEditorContent] = useState(codeString);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    theme: vscodeDark,
    value: editorContent,
    height: '45vh',
    basicSetup: {
      foldGutter: true,
    },
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

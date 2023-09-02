import CodeFlask from 'codeflask';
import { useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
import './App.css';

export default function EditorComponent() {
  const editorRef = useRef('editorRef');

  useEffect(() => {
    const flask = new CodeFlask(editorRef.current, {
      language: 'python',
      lineNumbers: true,
    });

    // How to listen for changes on your editor
    flask.onUpdate((code) => {
      // ...
    });

    // How to update your editor with custom content:
    const defaultText = 'import neurospike\n\n#TODO: Write your simulation code in here!';

    flask.updateCode(defaultText);
  });

  return (
    <div>
      <Paper elevation={0} className="ideWrapper">
        <div ref={editorRef} />
      </Paper>
    </div>
  );
}

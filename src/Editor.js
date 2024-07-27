import React, { useRef, useState } from 'react';
import './Editor.css';

const Editor = () => {
  const editorRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
    console.log("Hello");
  const formatText = (command, value = null) => {
    console.log("dataInBox "+command,"value",value);
    document.execCommand(command, false, value);
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    setSelectedText(selectedText);
  };

  const saveContent = () => {
    const content = editorRef.current.innerHTML;
    localStorage.setItem('editorContent', content);
    console.log("Text",content);
  };

  const loadContent = () => {
    const content = localStorage.getItem('editorContent');
    if (content) {
      editorRef.current.innerHTML = content;
    }
  };

  return (
    <div style={{width:"720px"}}>
      <div className="toolbar">
        <button onClick={() => formatText('bold')}>Bold</button>
        <button onClick={() => formatText('italic')}>Italic</button>
        <button onClick={() => formatText('underline')}>Underline</button>
        <button onClick={() => formatText('fontSize', '7')}>Large Text</button>
        <button onClick={() => formatText('foreColor', 'red')}>Red Text</button>
        <button onClick={() => formatText('insertUnorderedList')}>Bullet List</button>
        <button onClick={saveContent}>Save</button>
        <button onClick={loadContent}>Load</button>
      </div>
      <div
        className="editor"
        contentEditable
        ref={editorRef}
        onInput={() => console.log(editorRef.current.innerHTML)}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
      ></div>
      {selectedText && <div>Selected Text: {selectedText}</div>}
    </div>
  );
};

export default Editor;

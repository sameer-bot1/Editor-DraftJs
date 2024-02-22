import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, getDefaultKeyBinding, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';





const TextEditor = () => {

  const Edit = styled.div`
  /* margin: 5%  */
  margin-top : 14px;
  margin-left:10%;
  width: 80%;
  height:500px;
  /* margin: 20% */
  border: 2px solid navy;
`

const Container = styled.div`

`
const Button = styled.div``

const Btn = styled.button`
margin-left:50%;
`



  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [asteriskPressed, setAsteriskPressed] = useState(false);

  useEffect(() => {
    // Load content from localStorage on component mount
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

    // Custom overrides for "code" style.
    const styleMap = {
    
      'color-red': {
          color: '#D2042D',
        },
    };

  const handleEditorChange = (newEditorState) => {
    // Save content to localStorage on every change
    const contentState = newEditorState.getCurrentContent();
    const contentJson = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(contentJson));

    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command, currentEditorState) => {

    if (command === 'toggle-bold') {
      // Toggle bold when '*' is pressed followed by space
      if (asteriskPressed) {
        setAsteriskPressed(false);
        const newState = RichUtils.toggleInlineStyle(currentEditorState, 'BOLD');
        if (newState) {
          handleEditorChange(newState);
          return 'handled';
        }
      }
    } else if (command === 'toggle-red-line') {
      // Toggle red line when '**' is pressed followed by space
      if (asteriskPressed) {
        setAsteriskPressed(false);
        const newState = RichUtils.toggleInlineStyle(currentEditorState, 'color-red');
        if (newState) {
          handleEditorChange(newState);
          return 'handled';
        }
      }
    } else if (command === 'toggle-underline') {
      // Toggle underline when '***' is pressed followed by space
      if (asteriskPressed) {
        setAsteriskPressed(false);
        const newState = RichUtils.toggleInlineStyle(currentEditorState, 'UNDERLINE');
        if (newState) {
          handleEditorChange(newState);
          return 'handled';
        }
      }
    }

    return 'not-handled';
  };

  const keyBindingFn = (e) => {

    console.log(e.key)
    if (e.key === '*' && !e.getModifierState('Shift')) {
      setAsteriskPressed(true);
      return null;
    }

    if (e.key === ' ' && asteriskPressed) {
      setAsteriskPressed(false);
      return 'toggle-bold';
    }

    if (e.key === '*' && e.getModifierState('Shift') && !e.getModifierState('Alt')) {
      setAsteriskPressed(true);
      return null;
    }

    if (e.key === ' ' && asteriskPressed) {
      setAsteriskPressed(false);
      return 'toggle-underline';
    }

    if (e.key === '*' && e.getModifierState('Shift') && e.getModifierState('Alt')) {
      setAsteriskPressed(true);
      return null;
    }

    if (e.key === ' ' && asteriskPressed) {
      setAsteriskPressed(false);
      return 'toggle-red-line';
    }

    return getDefaultKeyBinding(e);
  };

  const onSaveClick = () => {
    // Save content to localStorage when the Save button is clicked
    const contentState = editorState.getCurrentContent();
    const contentJson = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(contentJson));
  };

  

  return (
    <Container>
      <Button>
        <Btn onClick={onSaveClick}>Save</Btn>
      </Button>
      <Edit>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          customStyleMap={styleMap}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          placeholder="Start typing..."
        />
      </Edit>
    </Container>
  );
};

export default TextEditor;

import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';


const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
        // Update editor state
        setEditorState(newEditorState);
      };

    const handleKeyCommand = (command, currentEditorState) => {
        if (command === 'toggle-heading') {
            const newState = RichUtils.toggleBlockType(currentEditorState, 'header-one');
            handleEditorChange(newState);
            return 'handled';
        }

        if (command === 'toggle-bold') {
            const newState = RichUtils.toggleInlineStyle(currentEditorState, 'BOLD');
            handleEditorChange(newState);
            return 'handled';
        }

        if (command === 'toggle-red-line') {
            const newState = RichUtils.toggleInlineStyle(currentEditorState, 'color-red');
            handleEditorChange(newState);
            return 'handled';
        }


        if (command === 'toggle-underline') {
            const newState = RichUtils.toggleInlineStyle(currentEditorState, 'UNDERLINE');
            handleEditorChange(newState);
            return 'handled';
        }

        const newState = RichUtils.handleKeyCommand(currentEditorState, command);

        if (newState) {
            handleEditorChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const keyBindingFn = (e) => {
        if (e.key === '#') {
            return 'toggle-heading';
        }

        if (e.key === '*') {
            return 'toggle-bold';
        }

        if (e.key === '+') {
            return 'toggle-red-line';
        }

        if (e.key === '-') {
            return 'toggle-underline';
        }

        return getDefaultKeyBinding(e);
    };

    const onSaveClick = () => {
        // Save content to localStorage when the Save button is clicked
        const contentState = editorState.getCurrentContent();
        const contentJson = convertToRaw(contentState);
        localStorage.setItem('editorContent', JSON.stringify(contentJson));
    };
    const Edit = styled.div`
    /* margin: 5%  */
    margin-top : 14px;
    margin-left:10%;
    width: 80%;
    height:400px;
    /* margin: 20% */
    border: 2px solid navy;
  `
  
  const Container = styled.div`
  
  `
  const Button = styled.div``
  
  const Btn = styled.button`
  margin-left:48%;
  `  
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

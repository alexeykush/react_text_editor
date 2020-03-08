import React, { Component, createRef } from 'react';
import {EditorState, AtomicBlockUtils} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {isImage, isLastInArr, processFiles} from "../utlis";

class TextEditor extends Component {
    editor = createRef();

    uploadImageCallback = file => Promise.resolve({data: {link: window.URL.createObjectURL(file)}});

    state = {
        editorState: EditorState.createEmpty(),
        toolbarProps: {
            image: {
                uploadEnabled: true,
                previewImage: true,
                uploadCallback: this.uploadImageCallback
            },
            options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "emoji",
                "image",
                "remove",
                "history"
            ]
        },
        localizationProps: {
            locale: "en"
        }
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        })
    };

    handleDroppedFiles = (_, files) => this.uploadImages(files);

    uploadImages = files => {
        processFiles(files.filter(isImage))
            .reduce((acc, curr, index, arr) => this._uploadImage(curr, acc, isLastInArr(index, arr)), this.state.editorState);
        return true;
    };

    _uploadImage = (src, editorState, execute) => {
        const entityKey = editorState
            .getCurrentContent()
            .createEntity('IMAGE', 'MUTABLE', { src, width: "auto", height: "auto" })
            .getLastCreatedEntityKey();

        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        );

        if(!execute) return newEditorState;
        // with custom 'handleChange' changes aren't applying by some reason
        this.editor.current.onChange(newEditorState);
    };

    render() {
        const {editorState, toolbarProps, localizationProps} = this.state;
        return (
            <Editor
                ref={this.editor}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={toolbarProps}
                localization = {localizationProps}
                handlePastedFiles={this.uploadImages}
                handleDroppedFiles={this.handleDroppedFiles}
            />
        )
    }
}

export default TextEditor;
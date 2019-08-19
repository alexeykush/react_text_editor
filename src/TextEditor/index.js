import React, {Component, createRef} from 'react';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class TextEditor extends Component {

    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        })
    };

    uploadImage = file => {
        return new Promise(((resolve, reject) => {
            resolve({data: {link: window.URL.createObjectURL(file)}})
        }))
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                initialEditorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: {
                        uploadEnabled: true,
                        previewImage: true,
                        uploadCallback: this.uploadImage
                    },
                }}
                localization = {{
                    locale: 'ru',
                }}
            />
        )
    }
}

export default TextEditor;
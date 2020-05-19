import React from 'react';
import {Editor} from 'draft-js';
import 'draft-js/dist/Draft.css';


const TextEditor = (props)=>{

    const {editorState,setEditorState} = props;

    return(
    <div className="textEditorWrapper">
    <div className ="textEditor">
<Editor placeholder=" " editorState={editorState} onChange={setEditorState} /> 
</div>
</div>
)
}
export default TextEditor;

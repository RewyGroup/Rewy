import React from 'react';
import "./TextEditor.css"
import { RichUtils } from 'draft-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBold, faUnderline, faItalic} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useEffect } from 'react';


const TextEditorToolbar = (props) => {
    const {editorState,setEditorState} = props;
    const[selectedStyle,setSelectedStyle] = useState("");
    const applyStyle= (style) =>{
        setEditorState(RichUtils.toggleInlineStyle(editorState,style));        
        setSelectedStyle(style);
    }

    const inlineStyles =[
        {
            label: "bold",
            style: "BOLD",
            icon: <FontAwesomeIcon icon={faBold} />
          },
          {
            label: "italic",
            style: "ITALIC",
            icon: <FontAwesomeIcon icon={faItalic} />
          },
          {
            label: "Underline",
            style: "UNDERLINE",
            icon: <FontAwesomeIcon icon={faUnderline} />
        }
    ]
        const isActive =(style)=>{
            const currentStyle = editorState.getCurrentInlineStyle();
            return currentStyle.has(style);

        }


    return(
    <div className="textEditorToolbar">

        <div className="inlineStyles" >
            {inlineStyles.map((item,index) =>{
                return(
                <div className={`${isActive(item.style) ?  "styleButtonsActive" : "styleButtons"}`}  key={item+index}  onClick={() => applyStyle(item.style)}>
                    {item.icon}
                     </div>

                )
            })}

        </div>


    </div>)

}
export default TextEditorToolbar;
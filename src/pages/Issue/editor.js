import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./editorToolbar";
//import "react-quill/dist/quill.snow.css";

export const Editor = () => {
    const [state, setState] = React.useState({ value: null });
    const handleChange = value => {
    setState({ value });
    };

    return (
        <div className="text-editor">
            <EditorToolbar />
            <ReactQuill
            theme="snow"
            value={state.value}
            onChange={handleChange}
            placeholder={"글의 내용을 작성해주세요."}
            modules={modules}
            formats={formats}
        />
        </div>
    );
};

export default Editor;

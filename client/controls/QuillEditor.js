import React from "react";
import LightTip from "../controls/LightTip";
import { fetchData } from "../utilities/fetch";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
import katex from "katex";
import Quill from "quill";

import "quill/dist/quill.snow.css";

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "video", "image"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["formula"],
    ["clean"]
];

export default class QuillEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.quillEditor = null;
        this.state = {
            status: 0,
            message: ""
        };
        this.uploadSuccess = this._uploadSuccess.bind(this);
        this.uploadFailed = this._uploadFailed.bind(this);
        this.saveToServer = this._saveToServer.bind(this);
    }

    componentDidMount() {
        hljs.registerLanguage("javascript", javascript);
        let current = this.editorRef.current;
        if (current) {
            this.quillEditor = new Quill(current, {
                modules: {
                    toolbar: toolbarOptions,
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                },
                placeholder: "Compose an epic...",
                theme: "snow"
            });

            this.quillEditor
                .getModule("toolbar")
                .addHandler("image", this.imageHandler(this.saveToServer));
        }
    }

    imageHandler(cb) {
        return function() {
          let fileInput = this.container.querySelector("input.ql-image[type=file]");
          if (!fileInput) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.classList.add("ql-image");
            fileInput.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon");
            fileInput.onchange = () => {
              let file = fileInput.files[0];
              if (/^image/.test(file.type)) {
                fileInput.value='';
                cb(file);
              } else {
                this.setState({
                  status: 3,
                  message: "Only support upload image"
                });
              }
            };
            this.container.append(fileInput);
          }

          fileInput.click();
        };
    }

    _saveToServer(file) {
        let fd = new FormData();
        fd.append("image", file);
        fetchData(
          "/api/upload/editor",
          {
            method: "POST",
            body: fd
          },
          [this.uploadSuccess, this.uploadFailed]
        );
    }

    _uploadSuccess(data) {
        let editor = this.quillEditor;
        let range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", data.data.url);
        this.setState({
            status: 2,
            message: data.message
        });
    }

    _uploadFailed(err) {
        this.setState({
            satus: 3,
            message: err.message
        });
    }

    render() {
        let status = this.state.status;
        let tip;
        if (status === 2) {
            tip = <LightTip type="success" message={this.state.message} />;
        } else {
            tip = <LightTip type="failed" message={this.state.message} />;
        }

        return (
            <div className="editor-wrapper">
                <div className="editor-container" ref={this.editorRef} />
                {tip}
            </div>
        );
    }
}

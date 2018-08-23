import React from "react";
import _ from 'lodash';
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
            value: props.value,
            message: "",
        };
        this.uploadSuccess = this._uploadSuccess.bind(this);
        this.uploadFailed = this._uploadFailed.bind(this);
        this.saveToServer = this._saveToServer.bind(this);
        this.onTextHandler = this.onTextHandler.bind(this);
    }

    componentDidMount() {
        hljs.registerLanguage("javascript", javascript);
        let current = this.editorRef.current;
        if (current) {
            window.katex = katex;
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
            if (this.state.value) {
                this.quillEditor.setContents(this.state.value);
            }
            this.quillEditor.on('text-change', this.onTextHandler);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(nextState, this.state)) {
            return true;
        }
        if (!this.isEqualValue(nextProps.value, this.state.value)) {
            return true;
        }

        return false;
    }

    isEqualValue(v1, v2) {
        if (v1.ops && v2.ops && _.isEqual(v1.ops, v2.ops)) {
            return true;
        }

        return false;
    }

    componentDidUpdate(preProps, preState) {
        if (!this.isEqualValue(this.props.value, preState.value)) {
            this.setContents(this.props.value);
        }
    }

    setContents(value) {
        let editor = this.quillEditor;
        let range = editor.getSelection();
        editor.setContents(value);
        if (range && editor.hasFocus()) this.setSelection(editor, range);
    }

    setSelection(editor, range) {
        if (range) {
            let length = editor.getLength();
            range.index = Math.max(0, Math.min(range.index, length - 1));
            range.length = Math.max(0, Math.min(range.length - 1, length - 1 - range.index));
        }
        editor.setSelection(range);
    }

    onTextHandler(delta) {
        let value = this.quillEditor.getContents();
        this.setState({
            value: value,
        }, () => {
            this.props.onTextChange && this.props.onTextChange(value);
        });
    }

    imageHandler(cb) {
        return function () {
            let fileInput = this.container.querySelector("input.ql-image[type=file]");
            if (!fileInput) {
                fileInput = document.createElement("input");
                fileInput.setAttribute("type", "file");
                fileInput.classList.add("ql-image");
                fileInput.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon");
                fileInput.onchange = () => {
                    let file = fileInput.files[0];
                    if (/^image/.test(file.type)) {
                        fileInput.value = '';
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

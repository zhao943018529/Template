import React from 'react';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai-sublime.css';
import katex from 'katex';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'video', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['formula'],
    ['clean']
];

export default class QuillEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.quillEditor = null;
    }

    componentDidMount() {
        hljs.registerLanguage('javascript', javascript);
        let current = this.editorRef.current;
        if (current) {
            this.quillEditor = new Quill(current, {
                modules: {
                    toolbar: toolbarOptions,
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value,
                    },
                },
                placeholder: 'Compose an epic...',
                theme: 'snow',
            });
        }
    }

    render() {

        return (
            <div className="editor-wrapper">
                <div className='editor-container' ref={this.editorRef}></div>
            </div>
        );
    }
}
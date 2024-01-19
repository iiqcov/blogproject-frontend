// MarkdownRender.js
import React from 'react';
import { marked } from 'marked';

const MarkdownRender = ({ content }) => {
    return (
        <div 
            dangerouslySetInnerHTML={{__html: marked(content)}}
            className="markdown-preview custom-markdown-preview"
        />
    );
};

export default MarkdownRender;

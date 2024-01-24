import React, { useEffect , useState} from 'react';
import {marked} from 'marked';
import Prism from 'prismjs';

import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-gradle';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';

import 'prismjs/plugins/toolbar/prism-toolbar';
import '../styles/prism/prism-toolbar-custom.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/show-language/prism-show-language';

import '../styles/prism/prism-theme-custom.css';

import '../styles/MarkdownRenderer.css';

const MarkdownRender = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    marked.setOptions({
      highlight: (code, lang) => {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        } else {
          return code;
        }
      },
      breaks: false,
    });

    setHtmlContent(marked(content));
  }, [content]);

  useEffect(() => {
    Prism.highlightAll();
  }, [htmlContent]);

  return (
    <div className="markdown-preview-custom-markdown-preview"
         dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default MarkdownRender;

export default `
  html {
    display: block;
    font-family: 'Inter var', ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    padding: 0 30px;
    color: #171717;
    background-color: #fafafa;
    transition: var(--mdjs-theme-bg), var(--mdjs-theme-color);
  }

  html[theme='dark'] {
    color: #fafafa;
    background-color: #171717;
  }

  body {
    max-width: 1200px;
    margin: 50px auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #171717;
    transition: var(--mdjs-theme-color);
  }

  a {
    transition: var(--mdjs-theme-color);
  }

  html[theme='dark'] h1,
  html[theme='dark'] h2,
  html[theme='dark'] h3,
  html[theme='dark'] h4,
  html[theme='dark'] h5,
  html[theme='dark'] h6 {
    color: #fafafa;
  }

  blockquote {
    border-left: 4px solid var(--bkl-color-primary-500, #737373);
    background-color: #f5f5f5;
    padding: 3px 15px;
    margin-inline-start: 15px;
    margin-inline-end: 30px;
    font-style: italic;
    transition: var(--mdjs-theme-bg), border-color 0.3s ease-in-out;
  }

  html[theme='dark'] blockquote {
    background-color: #262626;
  }

  /**
  *
  *     DEMOS
  *
  */
  .preview-story {
    margin: 20px 0;
    border: 1px solid;
    border-color: #9ca3af;
    border-radius: 4px;
  }

  .story_padded {
    padding: 20px;
  }

  .preview-story summary {
    padding: 15px;
    cursor: pointer;
    border-top: 1px solid #9ca3af;
    background-color: #f3f4f6;
    transition: var(--mdjs-theme-bg);
  }

  .preview-story summary:focus {
    outline: none;
    border: 2px solid #404040;
    padding: 14px 13px 13px;
  }

  .preview-story summary:hover {
    background-color: #d4d4d4;
  }

  html[theme='dark'] .preview-story summary {
    background-color: #262626;
  }

  html[theme='dark'] .preview-story summary:hover {
    background-color: #171717;
  }

  .preview-story pre[class*='language-'] {
    margin: 0;
  }

  .preview-story details {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-color: #9ca3af;
    overflow: hidden;
  }

  .preview-story details > pre[class*='language-'] > code[class*='language-'] {
    z-index: 0;
  }
`;
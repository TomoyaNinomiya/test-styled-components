import React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
      const styledComponentsSheet = new StyledComponentsSheet();
      const originalRenderPage = ctx.renderPage;

      try {
        ctx.renderPage = () =>
          originalRenderPage({
            enhanceApp: (App) => (props) =>
              styledComponentsSheet.collectStyles(<App {...props} />),
          });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [
                <React.Fragment key='styles'>
                  {initialProps.styles}
                  {styledComponentsSheet.getStyleElement()}
                </React.Fragment>,
            ],
        };
      } finally {
        styledComponentsSheet.seal();
      }
  }


  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
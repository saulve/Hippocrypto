import React from 'react';
import PropTypes from 'prop-types';

export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string
  };

  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          dangerouslySetInnerHTML={{
            __html: require('!raw!../public/styles.css')
          }}
        />
      );
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/png" href="favicon.png" />
          {this.props.headComponents}
          {css}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script src="https://authedmine.com/lib/authedmine.min.js" async />
          <script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                '(window.adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-3251605972716375", enable_page_level_ads: true});'
            }}
          />
        </body>
      </html>
    );
  }
}

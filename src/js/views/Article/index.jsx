import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Article extends Component {
  render() {
    const {
      imgSrc, imgSrcSet, name, description,
    } = this.props;

    return (
      <div className='article'>
        <img
          src={ imgSrc }
          srcSet={ imgSrcSet }
          alt={ 'Thumbnail of article: ' + '\'' + name + '\'' }
        />
        <div className='article__body'>
          <h2>{ name }</h2>
          <p>{ description }</p>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string,
  imgSrcSet: PropTypes.string,
  description: PropTypes.string,
};

export default Article;

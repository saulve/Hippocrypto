import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Article extends Component {
  render() {
    const { img, name, description } = this.props;

    return (
      <div className='article'>
        <img src={ img } alt={ name } />
        <div className='article__body'>
          <h2>{ name }</h2>
          <p>{ description }</p>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

export default Article;

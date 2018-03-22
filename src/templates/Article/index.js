import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import Img from 'gatsby-image';
import Tags from '../../components/Tags';

export default function Article(props) {
  return (
    <GatsbyLink className="article" to={props.link}>
      <div className="article__thumb">
        <Img sizes={props.thumbnail} />
      </div>
      <div className="article__body">
        <h2 className="article__title">
          {props.title}
          <br />
          <span className="article__date">{props.date}</span>
        </h2>
        <p>{props.excerpt}</p>
      </div>
      <div className="article__footer">
        <Tags list={props.tags} />
      </div>
    </GatsbyLink>
  );
}

Article.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  thumbnail: PropTypes.object.isRequired,
  tags: PropTypes.array,
};

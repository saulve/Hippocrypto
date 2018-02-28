import React from 'react';
import GatsbyLink from 'gatsby-link';
import Img from 'gatsby-image'
import Helmet from 'react-helmet';

import Link from '../components/Link';
import Tags from '../components/Tags';

import '../css/index.css';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="article__container">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <GatsbyLink className="article" key={post.id} to={post.frontmatter.path}>
              <div className='article__thumb'>
              <Img sizes={post.frontmatter.feature.childImageSharp.sizes}/>
              </div>
                <div className='article__body'>
                  <h2 className='article__title'>{ post.frontmatter.title }<br/>
                  <span className='article__date'>{ post.frontmatter.date }</span>
                  </h2>
                  <p>{post.excerpt}</p>
                  <div className='article__footer'>
                  <Tags list={post.frontmatter.tags || []} />
                </div>
                </div>
            </GatsbyLink>
          );
        })}
    </div>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            feature {
              childImageSharp{
                sizes(
                maxWidth: 430
                quality: 80
                traceSVG: { background: "#f2f8f3", color: "#d6ebd9" }
                ) {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

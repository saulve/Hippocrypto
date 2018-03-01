import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import BackIcon from 'react-icons/lib/fa/chevron-left';
import ForwardIcon from 'react-icons/lib/fa/chevron-right';

import Link from '../components/Link';
import Tags from '../components/Tags';

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;
  return (
    <div className="article expanded">
      <Helmet title={`Hippocrypto - ${post.frontmatter.title}`} />
      <Img sizes={post.frontmatter.feature.childImageSharp.sizes} />
      <div className="article__body">
        <h1 className="article__title">
          {post.frontmatter.title}
          <br />
          <span className="article__date">{post.frontmatter.date}</span>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Tags list={post.frontmatter.tags || []} />
        <div className="article__navigation">
          {prev && (
            <Link className='article__navigation--prev' to={prev.frontmatter.path}>
              <BackIcon className='arrow__left' /> {prev.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link className='article__navigation--next' to={next.frontmatter.path}>
              {next.frontmatter.title} <ForwardIcon className='arrow__right' />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        feature {
          childImageSharp {
            sizes(
              maxWidth: 630
              traceSVG: { background: "#f2f8f3", color: "#325C80" }
            ) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
    }
  }
`;

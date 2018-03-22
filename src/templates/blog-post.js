import React from 'react';
import Img from 'gatsby-image';
import Head from './Head';
import BackIcon from 'react-icons/lib/fa/chevron-left';
import ForwardIcon from 'react-icons/lib/fa/chevron-right';
import Hourglass from 'react-icons/lib/fa/hourglass-2';
import Link from '../components/Link';
import Tags from '../components/Tags';

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const siteMetadata = data.site.siteMetadata;
  const { next, prev } = pathContext;
  return (
    <div className="article expanded">
      <Head
        title={siteMetadata.title + ' | ' + post.frontmatter.title}
        siteDescription={post.excerpt}
        siteImage={siteMetadata.url + post.frontmatter.feature.childImageSharp.sizes.src}
        siteTitle={siteMetadata.title}
        url={siteMetadata.url + post.frontmatter.path}
      />
      <div className="article__thumb expanded">
        <Img sizes={post.frontmatter.feature.childImageSharp.sizes} />
        <span className="credit"> {post.frontmatter.credit} </span>
      </div>
      <div className="article__body expanded">
        <h1 className="article__title">
          {post.frontmatter.title}
          <br />
          <span className="article__date">{post.frontmatter.date}</span>
          <span className="article__time-to-read">
            <Hourglass />
            {post.timeToRead} minutes
          </span>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Tags list={post.frontmatter.tags || []} />
        <div className="article__navigation">
          {prev && (
            <Link
              className="article__navigation--prev"
              to={prev.frontmatter.path}
            >
              <BackIcon className="arrow__left" /> {prev.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              className="article__navigation--next"
              to={next.frontmatter.path}
            >
              {next.frontmatter.title} <ForwardIcon className="arrow__right" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        url
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 120)
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        credit
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

import React from 'react';
import GatsbyLink from 'gatsby-link';
import Article from './Article';
import Head from './Head';
import Link from '../components/Link';
import logo from '../../assets/hippo.face_black.png';

export default function Tags({ pathContext, data }) {
  const { tag } = pathContext;
  const { edges: posts } = data.allMarkdownRemark;
  const siteMetadata = data.site.siteMetadata;
  return (
    <div>
      <Head
        title={`${siteMetadata.title} | Tags`}
        siteDescription={siteMetadata.description}
        siteImage={logo}
        siteTitle={siteMetadata.title}
        url={`${siteMetadata.url}/tags/${tag}`}
      />
      <h1>
        {posts.length} post{posts.length === 1 ? '' : 's'} tagged with "{tag}"
      </h1>
      <div className="article__container">
        {posts.map(({ node: post }) => {
          if (post.frontmatter.draft !== 'true') {
            return (
              <Article
                key={post.id}
                link={post.frontmatter.path}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                excerpt={post.excerpt}
                thumbnail={post.frontmatter.feature.childImageSharp.sizes}
                tags={post.frontmatter.tags || []}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query TagQuery($tag: String) {
    site {
      siteMetadata {
        title
        description
        url
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            draft
            feature {
              childImageSharp {
                sizes(
                  maxWidth: 430
                  quality: 80
                  traceSVG: { background: "#f2f8f3", color: "#325C80" }
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

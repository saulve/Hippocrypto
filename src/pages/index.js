import React from 'react';
import Article from '../templates/Article';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  return (
    <div className="article__container">
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
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
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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

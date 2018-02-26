const {
  name
} = require('./package.json');

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: {
    author: 'You!',
    title: `Gatsby Default (Blog) Starter`
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp', {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    }, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-114325312-1',
        head: true
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
};
const { name } = require('./package.json');

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: {
    author: 'Hippocrypto',
    title: `Hippocrypto`
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-114325312-1',
        head: true
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/utils/typography/'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass'
  ]
};

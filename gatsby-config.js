const { BLOCKS, MARKS, INLINES } = require("@contentful/rich-text-types")
module.exports = {
  siteMetadata: {
    title: `Tech Share`,
    description: `プログラミング、Apple最新情報を中心に扱うサイト`,
    author: `@daigo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-playground`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `kl21dsa6wds1`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: "90KCqpL-LLh1wU7SzotgvlWUQVKfZ-TSz01NHFt6wnY",
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: "ca-pub-6338495423508409",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

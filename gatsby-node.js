const { graphql } = require("gatsby")
const path = require(`path`)

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  console.log("node結果")
  console.log(node)
}

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/template/BlogDetail.js")
  const categoryTemplate = path.resolve("./src/template/CategoryTemplate.js")
  const res = await graphql(`
    query {
      allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulCategory {
        edges {
          node {
            category
            categorySlug
            id
          }
        }
      }
    }
  `)
  if (res.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/${edge.node.slug}/`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
  res.data.allContentfulCategory.edges.forEach(edge => {
    createPage({
      component: categoryTemplate,
      path: `/${edge.node.categorySlug}/`,
      context: {
        slug: edge.node.categorySlug,
        id: edge.node.id,
        category: edge.node.category,
      },
    })
  })
}

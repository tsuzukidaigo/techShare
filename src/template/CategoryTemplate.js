import { makeStyles } from "@material-ui/core"
import { graphql } from "gatsby"
import React from "react"
import BlogCard from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    allContentfulBlogPost(
      sort: { fields: createdAt, order: DESC }
      filter: { category: { id: { eq: $id } } }
    ) {
      edges {
        node {
          title
          slug
          createdAt(formatString: "YYYY-MM-DD")
          eyecatch {
            file {
              url
            }
            fluid(maxWidth: 10) {
              src
            }
          }
        }
      }
    }
  }
`
const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "5%",
      display: "flex",
      flexFlow: "row wrap",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      width: "300%",
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "10%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
    },
  },
}))

const CategoryTemplate = props => {
  const classes = useStyles()
  console.log("props", props)
  console.log("props.pageContext.category", props.pageContext.category)

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className={classes.title}>{props.pageContext.category}の記事</h1>
      <div className={classes.card}>
        {props.data.allContentfulBlogPost.edges.map(({ node }, index) => (
          <BlogCard
            title={node.title}
            slug={node.slug}
            createdAt={node.createdAt}
            eyecatch={node.eyecatch}
            key={index}
            link={`/${node.slug}/`}
          />
        ))}
      </div>
    </Layout>
  )
}

export default CategoryTemplate

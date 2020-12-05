import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogCard from "../components/card"
import Search from "../components/search"

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "10%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
    },
  },
}))

const IndexPage = props => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            title
            slug
            createdAt(formatString: "YYYY-MM-DD")
            eyecatch {
              file {
                url
              }
            }
          }
        }
      }
    }
  `)
  const classes = useStyles()
  const [queryType, query] = props.location.search.split("=")
  const decodeQuery = decodeURIComponent(query)
  console.log("props.location.search", props.location.search)

  if (queryType === "?s" && decodeQuery.length > 0) {
    return (
      <Layout>
        <Search
          allContentfulBlogPost={data.allContentfulBlogPost}
          query={decodeQuery}
        />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <SEO title="Home" />
        <div className="container">
          <h1 className={classes.title}>全ての記事</h1>
          <div className="card">
            {data.allContentfulBlogPost.edges.map(({ node }, index) => (
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
        </div>
      </Layout>
    )
  }
}

export default IndexPage

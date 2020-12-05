import { makeStyles } from "@material-ui/core"
import React from "react"
import BlogCard from "./card"

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

const Search = props => {
  const classes = useStyles()
  const { allContentfulBlogPost, query } = props
  const blogPost = allContentfulBlogPost.edges

  const filteredPosts = blogPost.filter(({ node }) => {
    const { title } = node
    console.log("title", title)
    const EnTitleMatch = ~title.indexOf(query.toLowerCase())
    const JaTitleMatch = ~title.indexOf(query)
    console.log("query", query)
    console.log("EnTitleMatch", EnTitleMatch)
    console.log("JaTitleMatch", JaTitleMatch)

    return EnTitleMatch || JaTitleMatch
  })
  console.log("filteredPosts", filteredPosts)
  return (
    <div>
      <h2 className="page-header">
        {filteredPosts.length > 0 ? "検索結果 " : "No Result "}
      </h2>
      <div className={classes.card}>
        {filteredPosts.map(({ node }, index) => {
          return (
            <BlogCard
              title={node.title}
              slug={node.slug}
              createdAt={node.createdAt}
              eyecatch={node.eyecatch}
              key={index}
              link={`/${node.slug}/`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Search

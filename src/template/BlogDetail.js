import React from "react"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { graphql, Link } from "gatsby"
import { Container, makeStyles } from "@material-ui/core"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      createdAt(formatString: "YYYY/MM/DD")
      updatedAt(formatString: "YYYY/MM/DD")
      title
      content {
        json
      }
      category {
        category
      }
    }
  }
`
const useStyles = makeStyles(theme => ({
  design: {
    [theme.breakpoints.up("sm")]: {
      width: "90%",
      border: "1px solid",
      borderRadius: "8px",
      borderColor: "#CCCCCC",
      boxShadow: "0 0 8px gray",
      margin: "auto auto auto 0px",
    },
  },
  image: {
    width: "40%",
    display: "block",
    margin: "0 auto",
  },
  pageHeader: {
    marginBottom: "3%",
    marginTop: "2%",
    fontSize: "300%",
  },
  codeDesign: {
    display: "block",
    backgroundColor: "#364549",
    borderRadius: "3px",
    color: "#e3e3e3",
    padding: "1em 32px",
    fontSize: "120%",
    border: "solid 1px #d6dde4",
    wordBreak: "break-all",
  },
  bold: {
    fontColor: "red",
    fontWeight: "bold",
  },
}))
const BlogDetail = props => {
  const classes = useStyles()
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        return (
          <img
            className={classes.image}
            src={node.data.target.fields.file["en-US"].url}
            alt={node.data.target.fields.title["en-US"]}
          ></img>
        )
      },
    },
    renderText: text => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, [])
    },
    renderMark: {
      [MARKS.BOLD]: text => {
        return (
          <h3 key={`${text}-key`} className={classes.bold}>
            {text}
          </h3>
        )
      },
    },
    renderMark: {
      [MARKS.CODE]: text => {
        return (
          <pre>
            <code key={`${text}-key`} className={classes.codeDesign}>
              {text}
            </code>
          </pre>
        )
      },
    },
  }

  return (
    <div id="article">
      <Layout>
        <Container className={classes.design}>
          <p>{props.data.contentfulBlogPost.updatedAt}に更新</p>
          <p className={classes.pageHeader}>
            {props.data.contentfulBlogPost.title}
          </p>
          {documentToReactComponents(
            props.data.contentfulBlogPost.content.json,
            options
          )}
        </Container>
      </Layout>
    </div>
  )
}

export default BlogDetail

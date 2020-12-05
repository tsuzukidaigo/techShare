import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./styles.css"
import Footer from "./footer"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  visual: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "400px",
    },
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="container">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

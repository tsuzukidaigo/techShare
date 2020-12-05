import { makeStyles } from "@material-ui/core"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { IoIosSearch } from "react-icons/io"

const useStyles = makeStyles(theme => ({
  header: {
    [theme.breakpoints.up("sm")]: {
      width: "10%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20%",
    },
  },
}))
const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulCategory {
        edges {
          node {
            categorySlug
            category
          }
        }
      }
    }
  `)
  const classes = useStyles()
  return (
    <header id="header" className={classes.header}>
      <div className="container">
        <button id="site-logo-wrapper">
          <Link
            to="/"
            id="site-logo"
            style={{
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </button>
        <nav id="nav">
          <ul>
            {data.allContentfulCategory.edges.map(({ node }) => (
              <li key={node.categorySlug}>
                <Link to={`/${node.categorySlug}`}>{node.category}</Link>
              </li>
            ))}
          </ul>
          <div id="search-box">
            <form
              onSubmit={e => {
                e.preventDefault()
                navigate(`/?s=${e.target.query.value}`)
              }}
            >
              <input type="text" id="query" aria-label="Search" />
              <IoIosSearch />
            </form>
          </div>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

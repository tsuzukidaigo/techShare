import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"

const useStyles = makeStyles({
  root: {
    maxWidth: "30%",
    marginTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
  },
})

const BlogCard = props => {
  const classes = useStyles()
  const { title, slug, createdAt, eyecatch, link, key } = props

  return (
    <Card className={classes.root} key={key}>
      <Link to={link}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={title}
            height="250"
            image={eyecatch.file.url}
            title={title}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {createdAt}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}

export default BlogCard

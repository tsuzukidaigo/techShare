import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
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
  const { title, createdAt, eyecatch, link, key } = props

  return (
    <Card className="cardRoot" key={key}>
      <Link to={link}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={title}
            height="250px"
            width="290px"
            image={eyecatch.fluid.src}
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

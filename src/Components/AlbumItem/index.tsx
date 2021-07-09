import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import useStyles from './styles'

type AlbumItemProps = {
  title: string;
  description: string;
  url: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({
  title,
  description,
  url
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
    <CardMedia
      className={classes.cardMedia}
      image="https://source.unsplash.com/random"
      title="Image title"
    />
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography>
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        <Link href={url} target="_blank">
          View
        </Link>
      </Button>
    </CardActions>
  </Card>
  )
}

export default AlbumItem
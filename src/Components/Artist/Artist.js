import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid } from '@material-ui/core'
import { Star } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'

function Artist({ artist }) {
    const classes = useStyles();
    const history = useHistory();

    const isFilled = (index) => {
        let popularity = artist.popularity
        return popularity >= index * 20
    }

    const goToAlbums = () => {
        history.push(`/albums/${artist.id}/${artist.name}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={goToAlbums}>
                <CardMedia
                component="img"
                height="140"
                image={artist.images[0]?.url}
                alt="Artist Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{artist.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{artist.followers.total} followers</Typography>
                    <Grid container className={classes.starContainer}>
                        <Grid>
                            <Star style={isFilled(1) ? { color: 'orange' } : { color: 'grey' }} fontSize="small"/>
                            <Star style={isFilled(2) ? { color: 'orange' } : { color: 'grey' }} fontSize="small"/>
                            <Star style={isFilled(3) ? { color: 'orange' } : { color: 'grey' }} fontSize="small"/>
                            <Star style={isFilled(4) ? { color: 'orange' } : { color: 'grey' }} fontSize="small"/>
                            <Star style={isFilled(5) ? { color: 'orange' } : { color: 'grey' }} fontSize="small"/>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>

    );

    
}

export default Artist;

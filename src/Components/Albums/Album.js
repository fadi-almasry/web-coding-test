import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid } from '@material-ui/core'

import useStyles from './styles'

const Album = ({ artistName, album }) => {
    const classes = useStyles();

    const previewOnSpotify = () => {
        window.open(album.external_urls.spotify)
    }

    return(
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={previewOnSpotify}>
                <CardMedia
                component="img"
                height="140"
                image={album.images[0]?.url}
                alt="Artist Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{album.name}</Typography>
                    <Typography variant="caption" style={{ color: 'gray' }}>{artistName}</Typography>
                    <Grid container direction="column"  style={{ marginTop: '20px' }}>
                        <Typography variant="caption" style={{ color: 'gray' }}>{album.release_date}</Typography>
                        <Typography variant="caption" style={{ color: 'gray' }}>{album.total_tracks} tracks</Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}

export default Album
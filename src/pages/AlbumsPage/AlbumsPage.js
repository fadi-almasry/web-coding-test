import React, { useEffect, useState } from 'react'
import { Typography, Container, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import useStyles from './styles'
import Album from '../../Components/Albums/Album'
import { getAlbums } from '../../api'

const AlbumsPage = () => {
    const classes = useStyles();
    const { id, name } = useParams();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (id) {
            getAlbums(id).then(res => {
                let items = res.data.items
                setAlbums(items)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id])
    
    return (
        <Container className={classes.mainContainer}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body2">Albums</Typography>
            <Grid container spacing={4} style={{ marginTop: '20px' }}>
                {albums && albums.map(album => (
                    <Grid item key={album.id} md={3}> 
                        <Album artistName={name} album={album}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

    
}

export default AlbumsPage;

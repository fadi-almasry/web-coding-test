import React, { useEffect, useState } from "react";
import { TextField, Container, Grid } from '@material-ui/core'
import { parse } from 'query-string'

import useStyles from './styles'
import { requestAccessToken, searchArtists } from '../../api'
import Artist from "../../Components/Artist/Artist";


const HomePage = () => {
    const classes = useStyles();
    const { code, state } = parse(window.location.search);
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]); 

    useEffect(() => {
        if (code && state) {
            var data = {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': 'http://localhost:3000/'
            };
            
            var formBody = [];
            for (var property in data) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(data[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            requestAccessToken(formBody).then(res => {
                const { access_token, refresh_token, token_type, scope, expires_in } = res.data

                localStorage.clear()
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)
                localStorage.setItem("token_type", token_type)
                localStorage.setItem("scope", scope)
                localStorage.setItem("expires_in", expires_in)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [code, state])


    const handleChange = (event) => {
        setQuery(event.target.value)

        searchArtists(event.target.value).then(res => {
            let items = res.data.artists.items
            setArtists(items)
        }).catch(error => {
            console.log(error)
        })
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchArtist()
            event.preventDefault();
        }
    }

    const searchArtist = () => {
        searchArtists(query).then(res => {
            let items = res.data.artists.items
            setArtists(items)
        }).catch(error => {
            console.log(error)
        })
    }
    
    
    return (
        <Container className={classes.container}>
            <h1>Home Page</h1>
            <Grid container className={classes.searchBox}>
                <TextField id="outlined-basic" label="Search artist" variant="outlined" onChange={handleChange} onKeyPress={handleKeyPress} />
            </Grid>
            <Grid container spacing={4}>
                {artists && artists.map(artist => (
                    <Grid item key={artist.id} md={3}> 
                        <Artist artist={artist}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}


export default HomePage
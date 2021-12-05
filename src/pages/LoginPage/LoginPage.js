import React from "react";
import { Button, Container, Grid } from "@material-ui/core"

import useStyles from './styles'
import SpotifyIcon from '../../images/spotify-icon.png'
import { clientID } from '../../api'
import { stringify } from 'query-string'


const LoginPage = () => {
    const classes = useStyles()

    const login = () => {
        let queryStrings = stringify({
            response_type: 'code',
            client_id: clientID,
            scope: 'user-read-private user-read-email',
            redirect_uri: 'http://localhost:3000/',
            state: makeid(16)
        })

        window.location = `https://accounts.spotify.com/authorize?${queryStrings}`
    
    }

    return (
        <Container className={classes.container}>
            <Grid container justifyContent="center" alignItems="center">
                <Button variant="outlined" endIcon={<img src={SpotifyIcon} alt="sptoify-icon" height="20" width="20"/>} className={classes.loginButton} onClick={login}>Login</Button>
            </Grid>
        </Container>
    );

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       return result;
    }
}
export default LoginPage
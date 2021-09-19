import React, { useState } from 'react';
import Form from '../../Components/Forms/form'
import { postData } from '../../Services/services'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },

    h1: {
        marginBottom: '24px',
    },
}));

type FormData = {
    name: string;
    type:string;
    label:string;
}

type State = {
    resolved: boolean,
    loading: boolean,
    error: boolean | null,
}

const formData: FormData[] = [{
    name: "username",
    type: "text",
    label: "Username",
},{
    name: "password",
    type: "password",
    label: "Password",
}]

const Login: React.FC<State> = () => {

    const history = useHistory();
    const classes = useStyles();

    const [status, setStatus] = useState({
        resolved: false,
        loading: false,
        error: null,
    });

    const handleLogin = async (data) => {
        const {username, password} = data;
        setStatus({loading: true, resolved: false, error: null});

        postData('users/login', {username, password}).then(
          data => {
              if (!data.error) {
                  setStatus({loading: false, resolved: true, error: null});
                  localStorage.setItem('token', data.token)
                  history.push('./' + data.id)
              } else {
                  setStatus({loading: false, resolved: false, error: data.error})
              }
          }
        )
    }

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography
                  className={classes.h1}
                  component="h1"
                  variant="h4"
                  align="center">
                    Login
                </Typography>
                <Form
                  formData={formData}
                  handleSubmit={handleLogin}
                  status={status}
                />
                <Grid container>
                    <Grid item>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                
                {status.error != null ?
                  <Alert data-testid="alert-error" severity="error">
                      Username or Password is incorrect
                  </Alert> : null }
                {status.resolved ? (
                    <Alert data-testid="alert-success" severity="success">
                        Congrats! You're signed in!
                    </Alert>
                ) : null}
            </Paper>
        </main>
    )
}

export default Login
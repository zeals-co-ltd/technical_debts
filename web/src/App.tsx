import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import AlbumItem from './Components/AlbumItem'

import { Issue } from './Types/Github'

import Api from './Services/Api'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://zeals.co.jp/">
        Zeals
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [positions, setPositions] = useState<Issue[]>([]);

  useEffect(
    () => {
      Api.listIssues()
      .then((res) => {
        if (res.data) {
          setIssues(res.data.filter(issue => issue.labels.some(label => label.name === 'technical-dept')))
          setPositions(res.data.filter(issue => issue.labels.some(label => label.name === 'position')))
        }
      })
    },
    []
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <img className={classes.icon} src="https://zeals.co.jp/wp-content/themes/zeals2021/img/common/logo.svg" alt="logo" />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Technical Debts
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is a public repo that describing what kind of technical depts that currently Zeals have and want to solve in future.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link color="inherit" href="https://github.com/zeals-co-ltd/technical_debts">
                      Github
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {issues.map((issue) => (
              <Grid item key={issue.id} xs={12} sm={6} md={4}>
                <AlbumItem
                  title={issue.title}
                  description={issue.body.split('\r\n').slice(3).join('\r\n').slice(0, 100)}
                  url={issue.html_url}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Positions
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {positions.map((issue) => (
              <Grid item key={issue.id} xs={12} sm={6} md={4}>
                <AlbumItem
                  title={issue.title}
                  description={issue.body.split('\r\n').slice(3).join('\r\n').slice(0, 100)}
                  url={issue.html_url}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
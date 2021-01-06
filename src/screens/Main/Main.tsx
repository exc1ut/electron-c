import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  IconButton,
  Typography,
} from '@material-ui/core';

import styles from './style.scss';
import AnimatedRoute from '../../components/AnimatedRoute';

export default function Main() {
  const history = useHistory();
  return (
    <AnimatedRoute>
      <div className={styles.background}>
        <div className={styles.container}>
          <Typography className={styles.title} variant="h3">
            Contemprorary Hiring Portal
          </Typography>
          <Typography className={styles.text}>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </Typography>
          <Button
            onClick={() => {
              history.push('/signup');
            }}
            className={styles.buttons}
            color="primary"
            variant="contained"
          >
            CREATE AN Account
          </Button>
          <Button
            onClick={() => {
              history.push('/signin');
            }}
            className={styles.buttons}
            color="primary"
            variant="contained"
          >
            Sign In
          </Button>
          <Box className={styles.cards}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Search Jobs
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Card layouts can vary to support the types of content they
                  contain. The following elements are commonly found among that
                  variety.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => history.push('/jobs')}
                  variant="outlined"
                  color="primary"
                >
                  Search
                </Button>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Search Applicants
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Card layouts can vary to support the types of content they
                  contain. The following elements are commonly found among that
                  variety.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => history.push('/vacants')}
                  variant="outlined"
                  color="primary"
                >
                  Search
                </Button>
              </CardActions>
            </Card>
          </Box>
        </div>
      </div>
    </AnimatedRoute>
  );
}

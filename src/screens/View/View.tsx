import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './style.scss';
import { Job } from '../Jobs/Jobs';
import AppBreadCrumps from '../../components/AppBreadCrumps';
import AnimatedRoute from '../../components/AnimatedRoute';

const View = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const req = { type: 'get_item_by_id', item: +id };
    ipcRenderer.sendSync('send_to_server', req);
    ipcRenderer.on('get_item_by_id', (_, arg) => {
      const parsed: Job[] = JSON.parse(arg);
      setJob(parsed[0]);
    });
  }, []);

  if (job === null) return null;

  return (
    <AnimatedRoute>
      <div className={styles.container}>
        <BackButton />

        <Container maxWidth="md">
          <AppBreadCrumps name={job.title} />
          <Box className={styles.body}>
            <Box className={styles.head}>
              <Typography variant="h3">{job.title}</Typography>
              <Button variant="contained" color="primary">
                ${job.price}
              </Button>
            </Box>
            <Typography
              style={{ marginBottom: 30 }}
              color="primary"
              variant="h6"
            >
              {job.job_type}
            </Typography>
            <Box>
              <Typography className={styles.content} variant="body1">
                {job.body}
              </Typography>
            </Box>
            <Box className={styles.contacts}>
              <Typography variant="h6">Contact Us</Typography>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <MailOutlineOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={job.email} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LocationOnOutlinedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={job.location} />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Container>
      </div>
    </AnimatedRoute>
  );
};

export default View;

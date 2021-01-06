import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Button,
  Avatar,
  Typography,
  Box,
} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UseUserContext } from '../../context/UserContext';
import styles from './style.scss';

const ListDrawer = () => {
  const history = useHistory();
  const [user, setUser] = UseUserContext();
  const location = useLocation();
  console.log(location.pathname);

  const logout = () => {
    setUser({
      id: 0,
      name: '',
      surname: '',
      address: '',
      number: '',
      email: '',
    });
    history.push('/');
  };
  return (
    <div className={styles.drawer} role="presentation">
      <List>
        <ListItem>
          <Box
            justifyContent="space-between"
            height={120}
            display="flex"
            flexDirection="column"
          >
            <Avatar
              style={{
                height: 50,
                width: 50,
                fontSize: 22,
                backgroundColor: '#ff5722',
              }}
            >
              {user.name[0]}
            </Avatar>
            <Typography variant="h6">
              {user.name !== '' ? `${user.name} ${user.surname}` : 'Anonymous'}
            </Typography>
            <Typography gutterBottom variant="body2">
              {user?.email}
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          selected={location.pathname === '/jobs'}
          onClick={() => history.push('/jobs')}
          button
        >
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem
          selected={location.pathname === '/vacants'}
          onClick={() => history.push('/vacants')}
          button
        >
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Box width="100%" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/addjob')}
            >
              Add Job
            </Button>
            <Button variant="text" color="secondary" onClick={() => logout()}>
              Log out
            </Button>
          </Box>
        </ListItem>
      </List>
    </div>
  );
};

export default ListDrawer;

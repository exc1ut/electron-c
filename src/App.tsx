import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserHistory,
  useLocation,
} from 'react-router-dom';
import { ipcRenderer } from 'electron';
import {
  AppBar,
  Box,
  Button,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
  Card,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { createBrowserHistory } from 'history';
import Main from './screens/Main/Main';
// import SignUp from './screens/Sign/Signup';
import Jobs from './screens/Jobs/Jobs';
import View from './screens/View/View';
import AddJob from './screens/AddJob/AddJob';
import SignUp from './screens/Sign/Signup';
import SignIn from './screens/Sign/Signin';
import {
  MessageContext,
  MessageProvider,
  UseMessageContext,
} from './context/MessageContext';
import { UseUserContext } from './context/UserContext';
import Vacants from './screens/Jobs/Vacants';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoute from './components/AnimatedRoute';

const Hello = () => {
  const [state, setState] = useState('');
  const [text, setText] = useState<any>('');
  const [open, setOpen] = useState(false);
  console.log(state);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const sendMessage = () => {
    console.log('here');
    console.log(ipcRenderer.sendSync('sign_up', text));
  };

  useEffect(() => {
    ipcRenderer.on('asynchronous-reply', (_, arg) => {
      setState(arg.trim());
      setOpen(true);
    });
  }, []);

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <TextField
        label="Enter anything..."
        onChange={(e) => setText(e.target.value)}
        style={{ margin: 25 }}
      />
      <Button color="primary" variant="contained" onClick={() => sendMessage()}>
        Send message to server
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {state}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default function App() {
  const [message, setMessage] = UseMessageContext();
  const [user, setUser] = UseUserContext();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    ipcRenderer.on('snack', (_, arg) => {
      setMessage({ message: arg, open: true });
    });
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage({ message: '', open: false });
  };

  return (
    <>
      <Snackbar
        open={message.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.message === 'Success' ? 'success' : 'error'}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location}>
          <Route path="/addjob">
            <AddJob />
          </Route>
          <Route path="/view/:id/:type">
            <View />
          </Route>
          <Route path="/jobs">
            <Jobs />
          </Route>
          <Route path="/vacants">
            <Vacants />
          </Route>
          <Route path="/signup" component={SignUp}>
            <SignUp />
          </Route>
          <Route path="/signin" component={SignIn}>
            <SignIn />
          </Route>
          <Route path="/" component={Main}>
            <Main />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

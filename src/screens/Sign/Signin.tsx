import { Button, Container, TextField, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import AnimatedRoute from '../../components/AnimatedRoute';
import BackButton from '../../components/BackButton';
import { UseMessageContext } from '../../context/MessageContext';
import { UseUserContext } from '../../context/UserContext';
import styles from './style.scss';

const variants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1 },
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};

export default function SignIn() {
  const history = useHistory();
  const [message, setMessage] = UseMessageContext();
  const [user, setUser] = UseUserContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const req = { ...values, type: 'sign_in' };

      ipcRenderer.sendSync('send_to_server', req);
    },
  });

  useEffect(() => {
    ipcRenderer.on('sign_in', (_, arg) => {
      setMessage({ message: 'Success', open: true });

      const toObject = JSON.parse(arg);
      setUser((e: any) => {
        return { ...e, ...toObject[0] };
      });
      history.push('/jobs');
    });
  }, []);

  return (
    <AnimatedRoute>
      <BackButton />
      <Container maxWidth="md">
        <div className={styles.toCenter}>
          <Typography style={{ marginTop: 50 }} variant="h4">
            Sign in
          </Typography>

          <form onSubmit={formik.handleSubmit} className={styles.signInForm}>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
              name="name"
              label="Name"
              onBlur={formik.handleBlur}
              error={formik.errors?.name && formik.touched?.name}
              helperText={formik.errors.name}
            />
            <TextField
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              onBlur={formik.handleBlur}
              error={formik.errors?.password && formik.touched?.password}
              helperText={formik.errors.password}
            />
            <div>
              <Button
                className={styles.button}
                color="primary"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
          <div className={styles.bottom}>
            <Typography
              style={{ fontWeight: 500, marginRight: 30 }}
              variant="body2"
              component="span"
            >
              Don’t have account?
            </Typography>
            <Button
              onClick={() => history.push('/signup')}
              color="primary"
              variant="outlined"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Container>
    </AnimatedRoute>
  );
}

import { Button, Container, TextField, Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import AnimatedRoute from '../../components/AnimatedRoute';
import BackButton from '../../components/BackButton';
import { UseMessageContext } from '../../context/MessageContext';
import styles from './style.scss';

export default function SignUp() {
  const history = useHistory();
  const [message, setMessage] = UseMessageContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      surname: '',
      number: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      surname: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
      address: Yup.string()
        .max(30, 'Must be 20 characters or less')
        .required('Required'),
      number: Yup.string()
        .max(20, 'Must be 7 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const req = { ...values, type: 'sign_up' };

      ipcRenderer.sendSync('send_to_server', req);
      history.push('signin')
    },
  });

  const checkError = (a: any, b: any) => {
    let error = false;
    if (a !== undefined && b === undefined) {
      error = true;
    }
    return error;
  };
  console.log(formik.touched);

  return (
    <AnimatedRoute>
      <BackButton />
      <Container maxWidth="md">
        <Typography style={{ marginTop: 50 }} variant="h4">
          Sign up
        </Typography>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
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
            value={formik.values.email}
            variant="outlined"
            name="email"
            label="Email"
            onBlur={formik.handleBlur}
            error={formik.errors?.email && formik.touched?.email}
            helperText={formik.errors.email}
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
          <TextField
            onChange={formik.handleChange}
            value={formik.values.surname}
            variant="outlined"
            name="surname"
            label="Surname"
            onBlur={formik.handleBlur}
            error={formik.errors?.surname && formik.touched?.surname}
            helperText={formik.errors.surname}
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.number}
            variant="outlined"
            name="number"
            label="Phone number"
            onBlur={formik.handleBlur}
            error={formik.errors?.number && formik.touched?.number}
            helperText={formik.errors.number}
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.address}
            variant="outlined"
            name="address"
            label="Address"
            onBlur={formik.handleBlur}
            error={formik.errors?.address && formik.touched?.address}
            helperText={formik.errors.address}
          />
          <div>
            <Button color="primary" variant="contained" type="submit">
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
            Already have an account?
          </Typography>
          <Button
            onClick={() => {
              history.push('/signin');
            }}
            color="primary"
            variant="outlined"
          >
            Sign in
          </Button>
        </div>
      </Container>
    </AnimatedRoute>
  );
}

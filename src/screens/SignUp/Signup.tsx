import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import BackButton from '../../components/BackButton';
import styles from './style.scss';

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      surname: '',
      number: '',
      address: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
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
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.email}
            variant="outlined"
            name="email"
            label="Email"
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.password}
            variant="outlined"
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.surname}
            variant="outlined"
            name="surname"
            label="Surname"
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.number}
            variant="outlined"
            name="number"
            label="Phone number"
          />
          <TextField
            onChange={formik.handleChange}
            value={formik.values.address}
            variant="outlined"
            name="address"
            label="Address"
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
          <Button color="primary" variant="outlined">
            Sign in
          </Button>
        </div>
      </Container>
    </div>
  );
}

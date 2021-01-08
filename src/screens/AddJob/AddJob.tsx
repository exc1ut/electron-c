import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import AnimatedRoute from '../../components/AnimatedRoute';
import AppBreadCrumps from '../../components/AppBreadCrumps';
import BackButton from '../../components/BackButton';
import styles from './style.scss';

const AddJob = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      price: 0,
      job_type: 'Part-time',
      email: '',
      location: '',
      post_type: 'Hire',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      location: Yup.string()
        .max(30, 'Must be 15 characters or less')
        .required('Required'),
      body: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const req = { ...values, type: 'add_job' };
      console.log('here');

      console.log(ipcRenderer.sendSync('send_to_server', req));
    },
  });

  const marks = [
    {
      value: 0,
      label: '0$',
    },
    {
      value: 2000,
      label: '2000$',
    },
  ];

  return (
    <AnimatedRoute>
      <BackButton />
      <Container maxWidth="md">
        <AppBreadCrumps name="AddJob" />
        <Typography style={{ marginTop: 30 }} gutterBottom variant="h4">
          Post Job
        </Typography>
        <Typography variant="subtitle1">
          In this page you can add a job. please, fill in all the required text
          fields.
        </Typography>
        <div className={styles.form}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl variant="outlined">
              <InputLabel id="post_type">Post type</InputLabel>
              <Select
                labelId="post_type"
                id="pt"
                name="post_type"
                value={formik.values.post_type}
                onChange={formik.handleChange}
                label="Post type"
              >
                <MenuItem value="Hire">Hire an Employee</MenuItem>
                <MenuItem value="Find">Find a job</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              label="Job Title"
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.errors?.title && formik.touched?.title}
              helperText={formik.errors.title}
            />

            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Job type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="job_type"
                value={formik.values.job_type}
                onChange={formik.handleChange}
                label="Job type"
              >
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.errors?.email && formik.touched?.email}
              helperText={formik.errors.email}
            />
            <TextField
              id="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              label="Location"
              variant="outlined"
              onBlur={formik.handleBlur}
              error={formik.errors?.location && formik.touched?.location}
              helperText={formik.errors.location}
            />

            <TextField
              id="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              label="Description"
              variant="outlined"
              multiline
              rows={7}
              onBlur={formik.handleBlur}
              error={formik.errors?.body && formik.touched?.body}
              helperText={formik.errors.body}
            />

            <Slider
              defaultValue={0}
              name="price"
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              onChange={(_, value) => formik.setFieldValue('price', value)}
              step={1}
              marks={marks}
              min={0}
              max={2000}
            />
            <div>
              <Button type="submit" variant="contained" color="primary">
                Post
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </AnimatedRoute>
  );
};
export default AddJob;

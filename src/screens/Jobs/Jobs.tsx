import {
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete, Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import Item from './Item';
import styles from './style.scss';
import ListDrawer from './Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AnimatedRoute from '../../components/AnimatedRoute';
import { AnimatePresence } from 'framer-motion';

export interface Job {
  id: number;
  title: string;
  body: string;
  price: number;
  email: string;
  location: string;
  job_type: string;
  post_type: string;
}

export default function Jobs() {
  const [isOpen, setOpen] = React.useState(false);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [page, setPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState('');

  const handleClick = () => {
    const req = { type: 'search_text', text: searchText };
    ipcRenderer.sendSync('send_to_server', req);
  };

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const req = { type: 'get_jobs' };

    ipcRenderer.sendSync('send_to_server', req);
    ipcRenderer.on('get_jobs', (_, arg) => {
      const parsed = JSON.parse(arg);
      console.log(parsed)
      setJobs(parsed);
    });
    ipcRenderer.on('search_text', (_, arg) => {
      const parsed = JSON.parse(arg);
      setJobs(parsed);
    });
  }, []);

  return (
    <AnimatedRoute>
      <IconButton
        onClick={() => toggleDrawer(true)}
        edge="start"
        style={{ marginLeft: 30 }}
        aria-label="menu"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
        <ListDrawer />
      </Drawer>
      <Container maxWidth="md">
        <div className={styles.head}>
          <Typography gutterBottom variant="h3">
            Jobs Section
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Search for a job suitable to you among huge library of offers
          </Typography>
          <div className={styles.searchBar}>
            <Autocomplete
              id="combo-box-demo"
              options={jobs}
              getOptionLabel={(option) => option.title}
              style={{ width: 500, marginRight: 30 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search..."
                  onChange={(e) => setSearchText(e.target.value)}
                  variant="outlined"
                />
              )}
            />

            <Button
              onClick={() => handleClick()}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </div>
        </div>
        <AnimatePresence>
          <div className={styles.items}>
            {jobs.length !== 0 ? (
              jobs
                .slice(page * 5 - 5, page * 5)
                .map((i, index) => (
                  <Item
                    key={i.id}
                    title={i.title}
                    subtitle={i.body}
                    price={i.price}
                    id={i.id}
                    companyName={i.job_type}
                    city={i.location}
                    type="jobs"
                    index={index}
                  />
                ))
            ) : (
              <Box
                height="400px"
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <CircularProgress />
              </Box>
            )}
          </div>
        </AnimatePresence>
        <div className={styles.pagination}>
          <Pagination
            count={Math.floor(jobs.length / 5) + 1}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </div>
      </Container>
    </AnimatedRoute>
  );
}

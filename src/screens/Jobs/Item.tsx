import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './style.scss';

interface Props {
  title: string;
  subtitle: string;
  price: number;
  id: number;
  companyName: string;
  city: string;
  type: string;
  index: number;
}

const variants = {
  initial: { y: -10, opacity: 0 },
  enter: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};

const Item: React.FC<Props> = ({
  title,
  subtitle,
  price,
  id,
  companyName,
  city,
  type,
  index,
}: Props) => {
  const history = useHistory();

  return (
    <motion.div
      animate="enter"
      initial="initial"
      exit="exit"
      variants={variants}
      transition={{ delay: index / 20 }}
      className={styles.item}
    >
      <Grid container spacing={3}>
        <Grid item md={9}>
          <Card className={styles.cardContainer} variant="outlined">
            <div>
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
              <Typography style={{ maxWidth: 450 }} variant="subtitle2">
                {subtitle.slice(0, 120)}
              </Typography>
            </div>
            <div>
              <Typography gutterBottom className={styles.price} variant="h5">
                ${price}
              </Typography>
              <Button
                className={styles.readMore}
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log('pressed');

                  history.push(`/view/${id}/${type}`);
                }}
              >
                Read more
              </Button>
            </div>
          </Card>
        </Grid>

        <Grid item md={3}>
          <Card className={styles.cardContainer} variant="outlined">
            <div>
              <Typography
                className={styles.companyName}
                gutterBottom
                variant="h5"
              >
                {companyName}
              </Typography>
              <Typography gutterBottom className={styles.subtitle}>
                {city}
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Item;

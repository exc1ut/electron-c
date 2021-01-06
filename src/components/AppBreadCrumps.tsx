import { Card, Breadcrumbs, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
}

const AppBreadCrumps: React.FC<Props> = ({ name }: Props) => {
  return (
    <Card variant="outlined" style={{ padding: 10 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link style={{ textDecoration: 'none', color: '#e0e0e0' }} to="/">
          Jobs
        </Link>
        <Typography color="textPrimary">{name}</Typography>
      </Breadcrumbs>
    </Card>
  );
};

export default AppBreadCrumps;

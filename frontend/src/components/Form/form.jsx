import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Styles for the Form component
const useStyles = makeStyles({
  container: {
    marginTop: '5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  link: {
    marginTop: '1rem',
  },
});

const Form = ({ title, fields, submitLabel, link, linkLabel, onSubmit }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            type={field.type}
            variant="outlined"
            fullWidth
            required={field.required}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {submitLabel}
        </Button>
      </form>
      {link && (
        <Box className={classes.link}>
          <Typography variant="body2">
            {linkLabel}{' '}
            <a href={link} style={{ color: '#1976d2' }}>
              {linkLabel}
            </a>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Form;

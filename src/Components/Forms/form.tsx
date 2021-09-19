import React from 'react';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Field from './fields'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  form: {
    marginTop: '1.5rem',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

interface IFormInput {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Form = (props) => {
  const classes = useStyles();

  const optionalValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.lazy(value => {
      return (value !== undefined) ?
       Yup.string()
            .required('Email is required')
            .email('Email is invalid')
        : Yup.mixed().notRequired();
    }),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.lazy(value => {
      return (value !== undefined) ?
       Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
         : Yup.mixed().notRequired();
    }),
  });

  const { control, handleSubmit
  } = useForm<IFormInput>({
    resolver: yupResolver(optionalValidationSchema),
  })

  const onSubmit = handleSubmit((data) => {
    props.handleSubmit(data);
  })

  return (
    <form onSubmit={onSubmit} data-testid='form'>
      <Grid container spacing={3}>
        {props.formData.map((field, index) => (
          <Grid item xs={12} sm={12} key={index}>
            <Field
              name={field.name}
              label={field.label}
              type={field.type}
              control={control}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.buttons}>
        <Button className={classes.button} type="submit">Submit{props.status.loading ? '...' : null}</Button>
      </div>
    </form>)
}

export default Form
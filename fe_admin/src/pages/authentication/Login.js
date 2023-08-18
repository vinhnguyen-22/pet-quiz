import React from 'react';

// project import
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useMediaQuery } from '../../../node_modules/@mui/material/index';
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Facebook from 'assets/images/icons/facebook.svg';
import AuthWrapper from 'components/auth/AuthWrapper';

import { Login as OnLogin } from 'services/auth.service';
// ================================|| LOGIN ||================================ //

const Login = () => {
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const googleHandler = async () => {
    // login || singup
  };

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              setStatus({ success: false });
              setSubmitting(false);
              OnLogin(values)
                .then((res) => {
                  if (res) {
                    GetCurrentUser().then((user) => {
                      setCurrentUser(user);
                      history.push('/dashboard');
                    });
                  }
                })
                .catch((err) => {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                });
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">Email Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(touched.password && errors.password)}
                        id="-password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography variant="h6">Keep me sign in</Typography>}
                      />
                      <Link variant="h6" component={RouterLink} to="" color="text.primary">
                        Forgot Password?
                      </Link>
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider>
                      <Typography variant="caption"> Login with</Typography>
                    </Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={matchDownSM ? 1 : 2}
                      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
                      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth={!matchDownSM}
                        startIcon={<img src={Google} alt="Google" />}
                        onClick={googleHandler}
                      >
                        {!matchDownSM && 'Google'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth={!matchDownSM}
                        startIcon={<img src={Twitter} alt="Twitter" />}
                        onClick={twitterHandler}
                      >
                        {!matchDownSM && 'Twitter'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth={!matchDownSM}
                        startIcon={<img src={Facebook} alt="Facebook" />}
                        onClick={facebookHandler}
                      >
                        {!matchDownSM && 'Facebook'}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
export default Login;

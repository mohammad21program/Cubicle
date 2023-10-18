import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl, FormHelperText,
  Grid, IconButton, InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import Logo from 'ui-component/Logo';
import {Formik} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useEffect, useState} from "react";
import {AuthCardWrapper, AuthWrapper1} from "../ui-component/AuthWrapper";
import AnimateButton from "../ui-component/extended/AnimateButton";
import useScriptRef from "../hooks/useScriptRef";
import {useDispatch, useSelector} from "react-redux";
import LoadingProgressBar from "../utils/LoadingProgressBar";
import {Login} from "../store/auth/actions";
import {useNavigate} from "react-router";
import {clearError} from "../store/errors/actions";

const LoginPage = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {Error: {Type, message}} = useSelector(state => state);




  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(clearError())
  }, [])
  return (
      <AuthWrapper1>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <LoadingProgressBar IsLoading={IsLoading}/>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                      <Link to="#">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction="column" justifyContent="center" spacing={2}>\
                        <Grid item xs={12} container alignItems="center" justifyContent="center">
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Sign in with Email address</Typography>
                          </Box>
                        </Grid>
                        {Type === "LOGIN_ERROR" ? (
                            <Box>
                              <Alert severity={"error"}>{message}</Alert>
                            </Box>
                        ): null}
                      </Grid>

                      <Formik
                          initialValues={{
                            Email: '',
                            Password: '',
                            submit: null
                          }}
                          validationSchema={Yup.object().shape({
                            Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            Password: Yup.string().max(255).required('Password is required')
                          })}
                          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                              if (scriptedRef.current) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                dispatch(Login(values, setIsLoading, navigate))
                              }
                            } catch (err) {
                              console.error(err);
                              if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                              }
                            }
                          }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                              <FormControl fullWidth error={Boolean(touched.Email && errors.Email)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="Email">Email Address</InputLabel>
                                <OutlinedInput
                                    id="Email"
                                    type="email"
                                    value={values.Email}
                                    name="Email"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                      handleChange(event);
                                      dispatch(clearError())
                                    }}
                                    inputProps={{}}
                                />
                                {touched.Email && errors.Email && (
                                    <FormHelperText error>
                                      {errors.Email}
                                    </FormHelperText>
                                )}
                              </FormControl>

                              <FormControl fullWidth error={Boolean(touched.Password && errors.Password)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="Password">Password</InputLabel>
                                <OutlinedInput
                                    id="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.Password}
                                    name="Password"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                      dispatch(clearError());
                                      handleChange(event)
                                    }}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.Password && errors.Password && (
                                    <FormHelperText error>
                                      {errors.Password}
                                    </FormHelperText>
                                )}
                              </FormControl>
                              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                  Forgot Password?
                                </Typography>
                              </Stack>
                              {errors.submit && (
                                  <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                  </Box>
                              )}

                              <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                                    Sign in
                                  </Button>
                                </AnimateButton>
                              </Box>
                            </form>
                        )}
                      </Formik>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography component={Link} to="/signup" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                          Don&apos;t have an account?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
  );
};

export default LoginPage;

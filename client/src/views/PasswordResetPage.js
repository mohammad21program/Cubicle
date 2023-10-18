import {useTheme} from '@mui/material/styles';
import {
    Alert,
    Box,
    Button, Card, CardContent,
    FormControl, FormHelperText,
    Grid, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import {Formik} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useEffect, useState} from "react";
import {AuthWrapper1} from "../ui-component/AuthWrapper";
import useScriptRef from "../hooks/useScriptRef";
import {useDispatch, useSelector} from "react-redux";
import LoadingProgressBar from "../utils/LoadingProgressBar";
import {PasswordReset} from "../store/auth/actions";
import {useNavigate} from "react-router";
import {clearError} from "../store/errors/actions";

const PasswordResetPage = () => {
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
            <Grid container justifyContent="center">
                <LoadingProgressBar IsLoading={IsLoading}/>

                <Grid item sx={{m: {xs: 1, sm: 3}, mb: 0}}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Card>
                          <CardContent>
                              <Grid item xs={12}>
                                  <Grid container direction="column" justifyContent="center" spacing={2}>
                                      {Type === "PASSWORD_RESET_ERROR" ? (
                                          <Box>
                                              <Alert severity={"error"}>{message}</Alert>
                                          </Box>
                                      ) : null}
                                  </Grid>

                                  <Formik
                                      initialValues={{
                                          CurrentPassword: '',
                                          NewPassword: '',
                                          ReTypeNewPassword: ''
                                      }}
                                      validationSchema={Yup.object().shape({
                                          CurrentPassword: Yup.string().max(255).required('Current Password is required'),
                                          NewPassword: Yup.string().max(255).required('New Password is required'),
                                          ReTypeNewPassword: Yup.string().max(255).required('Confirmation Password is required')
                                      })}
                                      onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                                          try {
                                              if (scriptedRef.current) {
                                                  setStatus({success: true});
                                                  setSubmitting(false);
                                                  dispatch(PasswordReset(values, setIsLoading, navigate))
                                              }
                                          } catch (err) {
                                              console.error(err);
                                              if (scriptedRef.current) {
                                                  setStatus({success: false});
                                                  setErrors({submit: err.message});
                                                  setSubmitting(false);
                                              }
                                          }
                                      }}
                                  >
                                      {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                                          <form noValidate onSubmit={handleSubmit}>
                                              <FormControl fullWidth error={Boolean(touched.CurrentPassword && errors.CurrentPassword)}
                                                           sx={{...theme.typography.customInput}}>
                                                  <InputLabel htmlFor="CurrentPassword">Current Password</InputLabel>
                                                  <OutlinedInput
                                                      id="CurrentPassword"
                                                      type={showPassword ? 'text' : 'password'}
                                                      value={values.Password}
                                                      name="CurrentPassword"
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
                                                                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                              </IconButton>
                                                          </InputAdornment>
                                                      }
                                                      inputProps={{}}
                                                  />
                                                  {touched.CurrentPassword && errors.CurrentPassword && (
                                                      <FormHelperText error>
                                                          {errors.CurrentPassword}
                                                      </FormHelperText>
                                                  )}
                                              </FormControl>
                                              <FormControl fullWidth error={Boolean(touched.NewPassword && errors.NewPassword)}
                                                           sx={{...theme.typography.customInput}}>
                                                  <InputLabel htmlFor="NewPassword">New Password</InputLabel>
                                                  <OutlinedInput
                                                      id="NewPassword"
                                                      type={showPassword ? 'text' : 'password'}
                                                      value={values.Password}
                                                      name="NewPassword"
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
                                                                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                              </IconButton>
                                                          </InputAdornment>
                                                      }
                                                      inputProps={{}}
                                                  />
                                                  {touched.NewPassword && errors.NewPassword && (
                                                      <FormHelperText error>
                                                          {errors.NewPassword}
                                                      </FormHelperText>
                                                  )}
                                              </FormControl>
                                              <FormControl fullWidth error={Boolean(touched.ReTypeNewPassword && errors.ReTypeNewPassword)}
                                                           sx={{...theme.typography.customInput}}>
                                                  <InputLabel htmlFor="ReTypeNewPassword">Retype New Password</InputLabel>
                                                  <OutlinedInput
                                                      id="ReTypeNewPassword"
                                                      type={showPassword ? 'text' : 'password'}
                                                      value={values.Password}
                                                      name="ReTypeNewPassword"
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
                                                                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                              </IconButton>
                                                          </InputAdornment>
                                                      }
                                                      inputProps={{}}
                                                  />
                                                  {touched.ReTypeNewPassword && errors.ReTypeNewPassword && (
                                                      <FormHelperText error>
                                                          {errors.ReTypeNewPassword}
                                                      </FormHelperText>
                                                  )}
                                              </FormControl>
                                              {errors.submit && (
                                                  <Box sx={{mt: 3}}>
                                                      <FormHelperText error>{errors.submit}</FormHelperText>
                                                  </Box>
                                              )}

                                                      <Button disableElevation disabled={isSubmitting} fullWidth size="large"
                                                              type="submit" variant="contained" color="primary">
                                                         Reset
                                                      </Button>


                                          </form>
                                      )}
                                  </Formik>
                              </Grid>
                          </CardContent>
                      </Card>
                    </Grid>
                </Grid>

            </Grid>
        </AuthWrapper1>
    );
};

export default PasswordResetPage;

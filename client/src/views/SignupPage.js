import {Link} from 'react-router-dom';
import {styled, useTheme} from '@mui/material/styles';
import {
    Alert, Avatar,
    Box,
    Button,
    Divider,
    FormControl, FormHelperText,
    Grid, IconButton, InputAdornment,
    InputLabel, OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';
import {AuthWrapper1, AuthCardWrapper} from "../ui-component/AuthWrapper"
import Logo from 'ui-component/Logo';
import AnimateButton from "../ui-component/extended/AnimateButton";
import {Formik} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useScriptRef from "../hooks/useScriptRef";
import {useEffect, useState} from "react";
import {strengthColor, strengthIndicator} from "../utils/password-strength";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import LoadingProgressBar from "../utils/LoadingProgressBar";
import {Signup} from "../store/auth/actions";
import {CloudUpload} from "@mui/icons-material";
import {uploadProfilePicture} from "../api/auth";
import {clearError} from "../store/errors/actions";
import {SIGNUP} from "../store/auth/actionTypes";

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SignupPage = () => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [IsLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [PictureFile, setPictureFile] = useState("");
    const {Error: {Type, message}} = useSelector(state => state)

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        dispatch(clearError())
    }, [])


    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{minHeight: '100vh'}}>
                <Grid item xs={12}>
                    <LoadingProgressBar IsLoading={IsLoading}/>
                    <Grid container justifyContent="center" alignItems="center" sx={{minHeight: 'calc(100vh - 68px)'}}>
                        <Grid item sx={{m: {xs: 1, sm: 3}, mb: 0}}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid>
                                        <Link to="#">
                                            <Logo/>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" justifyContent="center">
                                            <Grid item xs={12} container alignItems="center" justifyContent="center">
                                                <Box sx={{mb: 2}}>
                                                    <Typography variant="subtitle1">Sign up with Email
                                                        address</Typography>
                                                </Box>
                                            </Grid>
                                            {Type === `${SIGNUP}_ERROR` ? <Alert severity={"error"}>{message}</Alert> : null}
                                        </Grid>

                                        <Formik
                                            initialValues={{
                                                FirstName: "",
                                                LastName: "",
                                                Email: '',
                                                Mobile: "",
                                                Password: '',
                                                Photo: "",
                                                submit: null
                                            }}
                                            validationSchema={Yup.object().shape({
                                                FirstName: Yup.string().min(2, "First name must be at least 2 characters").max(20, "First name must be at most 20 characters").required("First name is required"),
                                                LastName: Yup.string().min(2, "Last name must be at least 2 characters").max(20, "Last name must be at most 20 characters").required("Last name is required"),
                                                Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                                Mobile: Yup.string().required("Mobile is required").matches(/^[0-9]+$/, "Must be only digits").min(11, "Mobile must be at least 11 digits").max(14, "Mobile must be at most 14 digits"),
                                                Password: Yup.string().max(255).required('Password is required'),
                                                Photo: Yup.string().required("Picture is required")

                                            })}
                                            onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                                                try {
                                                    if (scriptedRef.current) {
                                                        setStatus({success: true});
                                                        setSubmitting(false);
                                                        const formData = new FormData();
                                                        formData.append("filename", PictureFile.name);
                                                        formData.append("file", PictureFile);
                                                        await uploadProfilePicture(formData)
                                                        dispatch(Signup(values, setIsLoading, navigate))
                                                    }
                                                } catch (err) {
                                                    if (scriptedRef.current) {
                                                        setStatus({success: false});
                                                        setErrors({submit: err.message});
                                                        setSubmitting(false);
                                                    }
                                                }
                                            }}
                                        >
                                            {({
                                                  errors,
                                                  handleBlur,
                                                  handleChange,
                                                  handleSubmit,
                                                  isSubmitting,
                                                  touched,
                                                  values
                                              }) => (
                                                <form noValidate onSubmit={handleSubmit}>
                                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormControl fullWidth
                                                                         error={Boolean(touched.FirstName && errors.FirstName)}
                                                                         sx={{...theme.typography.customInput}}>
                                                                <InputLabel htmlFor={"FirstName"}>First
                                                                    Name</InputLabel>
                                                                <OutlinedInput
                                                                    id="FirstName"
                                                                    name="FirstName"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.FirstName}
                                                                    inputProps={{}}
                                                                />
                                                                {touched.FirstName && errors.FirstName && (
                                                                    <FormHelperText error>
                                                                        {errors.FirstName}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormControl fullWidth
                                                                         error={Boolean(touched?.LastName && errors?.LastName)}
                                                                         sx={{...theme.typography.customInput}}>
                                                                <InputLabel htmlFor={"LastName"}>Last Name</InputLabel>
                                                                <OutlinedInput
                                                                    id={"LastName"}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.LastName}
                                                                    name="LastName"
                                                                    type="text"
                                                                    inputProps={{}}

                                                                />
                                                            </FormControl>

                                                            {touched.LastName && errors.LastName && (
                                                                <FormHelperText error>
                                                                    {errors.LastName}
                                                                </FormHelperText>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                    <FormControl fullWidth
                                                                 error={Boolean(touched.Email && errors.Email)}
                                                                 sx={{...theme.typography.customInput}}>
                                                        <InputLabel htmlFor="Email">Email Address</InputLabel>
                                                        <OutlinedInput
                                                            id="Email"
                                                            type="email"
                                                            value={values.Email}
                                                            name="Email"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        />
                                                        {touched.Email && errors.Email && (
                                                            <FormHelperText error>
                                                                {errors.Email}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl fullWidth
                                                                 error={Boolean(touched.Mobile && errors.Mobile)}
                                                                 sx={{...theme.typography.customInput}}>
                                                        <InputLabel htmlFor="Mobile">Mobile</InputLabel>
                                                        <OutlinedInput
                                                            id="Mobile"
                                                            type="text"
                                                            value={values.Mobile}
                                                            name="Mobile"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        />
                                                        {touched.Mobile && errors.Mobile && (
                                                            <FormHelperText error>
                                                                {errors.Mobile}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>

                                                    <FormControl fullWidth
                                                                 error={Boolean(touched.Password && errors.Password)}
                                                                 sx={{...theme.typography.customInput}}>
                                                        <InputLabel htmlFor="Password">New Password</InputLabel>
                                                        <OutlinedInput
                                                            id="Password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={values.password}
                                                            name="Password"
                                                            label="Password"
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                changePassword(e.target.value);
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
                                                                        {showPassword ? <Visibility/> :
                                                                            <VisibilityOff/>}
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


                                                    {(strength !== 0 && touched?.Password) && (
                                                        <FormControl fullWidth>
                                                            <Box sx={{mb: 2}}>
                                                                <Grid container spacing={2} alignItems="center">
                                                                    <Grid item>
                                                                        <Box style={{backgroundColor: level?.color}}
                                                                             sx={{
                                                                                 width: 85,
                                                                                 height: 8,
                                                                                 borderRadius: '7px'
                                                                             }}/>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1"
                                                                                    fontSize="0.75rem">
                                                                            {level?.label}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </FormControl>
                                                    )}
                                                    {errors.submit && (
                                                        <Box sx={{mt: 3}}>
                                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                                        </Box>
                                                    )}
                                                    {PictureFile ? (
                                                        <Box
                                                            sx={{
                                                                alignItems: 'center',
                                                                display: 'flex',
                                                                flexDirection: 'column'
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={URL.createObjectURL(PictureFile)}
                                                                alt={"Photo"}
                                                                sx={{
                                                                    height: 190,
                                                                    mb: 2,
                                                                    width: 220
                                                                }}
                                                            />


                                                        </Box>
                                                    ): null}
                                                    {(touched?.Photo && errors.Photo) && (
                                                        <Alert sx={{mb: 2}} severity={"error"}>{errors?.Photo}</Alert>
                                                    )}
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        startIcon={<CloudUpload/>}
                                                        component={"label"}
                                                    >
                                                        Upload picture
                                                        <VisuallyHiddenInput accept={"image/*"} type="file"
                                                                             onChange={(event) => {
                                                                                 const file = event.target.files[0];
                                                                                 const filename = file.name;
                                                                                 const fileEvent = {
                                                                                     target: {
                                                                                         name: "Photo",
                                                                                         value: filename
                                                                                     }
                                                                                 }
                                                                                 console.log(file)
                                                                                 setPictureFile(file)
                                                                                 handleChange(fileEvent)
                                                                             }}/>
                                                    </Button>

                                                    <Box sx={{mt: 2}}>
                                                        <AnimateButton>
                                                            <Button disableElevation disabled={isSubmitting} fullWidth
                                                                    size="large" type="submit" variant="contained"
                                                                    color="secondary">
                                                                Sign up
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/login" variant="subtitle1"
                                                        sx={{textDecoration: 'none'}}>
                                                Already have an account?
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

export default SignupPage;

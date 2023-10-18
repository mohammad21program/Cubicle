import {Backdrop, CircularProgress} from "@mui/material";

const LoadingProgressBar = ({IsLoading}) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={IsLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default LoadingProgressBar
import {useDispatch, useSelector} from 'react-redux';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Box } from '@mui/material';
import { drawerWidth } from 'store/layout/constant';
import Layout from "./Layout";
import {useEffect, useState} from "react";
import {FetchPosts} from "../../store/posts/actions";
import LoadingProgressBar from "../../utils/LoadingProgressBar";
import {GetNotifications} from "../../store/auth/actions";
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));


const MainLayout = () => {
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(false)
  useEffect(() => {
      dispatch(FetchPosts(setIsLoading));
      dispatch(GetNotifications(setIsLoading))
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
        <LoadingProgressBar
            IsLoading={IsLoading}
        />
      <AppBar
        position="fixed"
        elevation={0}
      >
         <Layout/>
      </AppBar>

      <Main open={leftDrawerOpened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;

import {useState, useRef, useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import {
    Avatar, Badge,
    ButtonBase,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    useMediaQuery
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';
import {IconBell} from '@tabler/icons';
import {useDispatch, useSelector} from "react-redux";
import {UpdateNotification} from "../../../store/auth/actions";


const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const {Auth: {notifications}} = useSelector(state => state)

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const dispatch = useDispatch();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <>
            <ButtonBase sx={{mr: 3}}>
                <Avatar
                    variant="rounded"
                    sx={{
                        transition: 'all .2s ease-in-out',
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={() => {
                        handleToggle();
                        dispatch(UpdateNotification("4454444", {ShowAll: true, Read: false, UnRead: false}))

                    }}
                >
                    <Badge
                        badgeContent={notifications.filter(notification => !notification.isShow).length !== 0 ? notifications.filter(notification => !notification.isRead).length : 0}
                        color="primary">
                        <IconBell stroke={1.5} size="1.3rem"/>
                    </Badge>

                </Avatar>
            </ButtonBase>
            <Popper
                placement={'right-end'}
                open={open}
                anchorEl={anchorRef.current}

                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MainCard border={false} elevation={16} content={false} boxShadow
                                  shadow={theme.shadows[16]}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <PerfectScrollbar style={{
                                        height: '100%',
                                        maxHeight: 'calc(100vh - 205px)',
                                        overflowX: 'hidden'
                                    }}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12} p={0}>
                                                <Divider sx={{my: 0}}/>
                                            </Grid>
                                        </Grid>
                                        <NotificationList handleClose={handleClose}/>
                                    </PerfectScrollbar>
                                </Grid>
                            </Grid>
                            <Divider/>
                        </MainCard>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
};

export default NotificationSection;

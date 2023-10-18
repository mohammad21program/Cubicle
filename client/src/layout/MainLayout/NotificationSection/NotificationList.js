import React from "react";
import {useTheme, styled} from '@mui/material/styles';
import {
    Avatar,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {useNavigate} from "react-router";
import {UpdateNotification} from "../../../store/auth/actions";

// styles
const ListItemWrapper = styled('div')(({theme}) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const NotificationList = ({handleClose}) => {
    const theme = useTheme();
    const {Auth: {notifications}} = useSelector(state => state);
    const dispatch = useDispatch()

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };
    const navigate = useNavigate();
    console.log(notifications)

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                    <ListItemWrapper onClick={(event) => {
                        navigate(notification.Url);
                        handleClose(event);
                        dispatch(UpdateNotification(notification?._id, {Read: true, UnRead: false, ShowAll: false}))
                    }}>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar alt="John Doe" src={`/auth/get/profile_picture/${notification.Image}`}/>
                            </ListItemAvatar>
                            <ListItemText primary={notification?.Title}/>
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {moment(notification.createdAt).fromNow()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{pb: 2}}>
                                <Typography variant="subtitle2">{notification?.Description}<span style={{visibility: "hidden"}}>{notification?.Description}</span></Typography>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                    <Grid container direction="column" className="list-container">
                        <Grid item xs={12}>
                            <Grid container>
                                {notification?.isRead && (
                                    <Grid item sx={{mb: 3}}>
                                        <Chip onClick={() => {
                                            dispatch(UpdateNotification(notification?._id, {ShowAll: false, Read: false, UnRead: true}))
                                        }} style={{cursor: "pointer"}} label="Unread" sx={chipErrorSX}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider/>
                </React.Fragment>
            ))}
        </List>
    );
};

export default NotificationList;

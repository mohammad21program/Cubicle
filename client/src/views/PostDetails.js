import {useParams} from "react-router";
import {
    Avatar, AvatarGroup, Badge, Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, CardMedia, Collapse, Divider, FormControl,
    Grid,
    IconButton,
    ImageList,
    ImageListItem, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, Popover,
    Typography
} from "@mui/material";
import {Close, CloudUpload, Comment, MoreVert, Send, ThumbUp} from "@mui/icons-material";
import moment from "moment/moment";
import React, {useRef, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {CommentPost, DeletePost, EditPost, ReactPost} from "../store/posts/actions";
import {useDispatch, useSelector} from "react-redux";
import LoadingProgressBar from "../utils/LoadingProgressBar";
import {pink} from "@mui/material/colors";
import {VisuallyHiddenInput} from "./SignupPage";
import {uploadPostPicture} from "../api/posts";
import {styled, useTheme} from "@mui/material/styles";
import {Navigate} from "react-router-dom";

const PostDetails = () => {
    const {id} = useParams();
    const [OnPopover, setOnPopover] = useState(null);
    const {Post: {Posts}} = useSelector(state => state);
    const {Auth: {currentUser}} = useSelector(state => state)
    const currentPost = Posts.filter(post => post._id ===  id)[0];
    const  [IsLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = useState({})
    const [PostEdit, setPostEdit] = useState(false);
    const theme = useTheme();
    const [Files, setFiles] = useState([]);
    const [FileNumbers, setFileNumbers] = useState([]);
    const [ShowComments, setShowComments] = useState(false);
    const commentFormRef = useRef();
    const formRef = useRef();
    const SmallAvatar = styled(Avatar)(({theme}) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));
    console.log(currentPost)

    return (
       <>
           {currentPost ? (
               <Grid container direction={"row"} alignItems={"flex-start"} justifyContent={"center"}>
                   <Grid item xs={11} sm={8} md={8}  justifyContent={"center"} >
                       <LoadingProgressBar IsLoading={IsLoading}/>
                       <Card sx={{mt: 1}}>
                           <CardHeader avatar={
                               <Avatar src={`/auth/get/profile_picture/${currentPost?.OwnerPhoto}`}/>
                           }
                                       action={
                                           currentUser?.Key === currentPost?.OwnerKey ? <IconButton aria-label="settings">
                                               <MoreVert onClick={(event) => {
                                                   setOnPopover(event.currentTarget);
                                               }}/>
                                           </IconButton> : null
                                       }
                                       title={currentPost?.OwnerName}
                                       subheader={`${moment(currentPost?.createdAt).fromNow()}`}
                           />
                           {(PostEdit && currentPost?._id === currentPost?._id) ? (
                               <Box sx={{display: "flex"}}>
                                   <Box compoment={"span"} sx={{flexGrow: 1}}/>
                                   <Box compoment={"span"} sx={{flexGrow: 2}}>
                                       <form ref={formRef}>
                                           <FormControl fullWidth sx={{...theme.typography.customInput}}>
                                               <OutlinedInput
                                                   multiline={true}
                                                   type="text"
                                                   name="Content"
                                                   autoComplete={"off"}
                                                   placeholder={"What's on your mind?"}
                                                   minRows={5}
                                                   defaultValue={currentPost?.Content}
                                                   maxRows={8}
                                                   onChange={(event) => {
                                                       setData({Content: event.target.value})
                                                   }}
                                               />
                                           </FormControl>
                                           <Box align={"end"}>
                                               {currentPost.Images?.length !== 0 && (
                                                   <AvatarGroup max={4}>
                                                       {FileNumbers.map((number, index) => (
                                                           <Avatar key={index} alt={Files[index]?.name}
                                                                   src={URL.createObjectURL(Files[number])}/>
                                                       ))}
                                                   </AvatarGroup>
                                               )}
                                               {currentPost?.Images.map((image, index) => (
                                                   <Badge
                                                       overlap="circular"
                                                       anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                       badgeContent={
                                                           <SmallAvatar alt="Remy Sharp">
                                                               <Close sx={{color: pink[500], cursor: "pointer"}}
                                                                      onClick={() => {
                                                                          const currentData = {...currentPost};
                                                                          currentData.Images = currentData.Images.filter(preImg => preImg !== image);
                                                                          setData(preValue => {
                                                                              return {...preValue, Images: currentData?.Images}
                                                                          })
                                                                      }}/>
                                                           </SmallAvatar>
                                                       }
                                                   >
                                                       <Avatar key={index} alt={image}
                                                               src={`/posts/get/post/picture/${image}`}/>
                                                   </Badge>
                                               ))}
                                               <Button
                                                   fullWidth
                                                   variant="contained"
                                                   startIcon={<CloudUpload/>}
                                                   component={"label"}
                                                   sx={{mt: 2}}
                                               >
                                                   Upload picture
                                                   <VisuallyHiddenInput multiple accept={"image/*"} type="file"
                                                                        onChange={(event) => {
                                                                            const numbers = [];
                                                                            for (let i = 0; i < event.target.files.length; i++) {
                                                                                numbers.push(i)
                                                                            }
                                                                            setFileNumbers(numbers)
                                                                            setFiles(event.target.files)
                                                                        }}/>
                                               </Button>
                                               <Button onClick={async () => {
                                                   if (FileNumbers.length !== 0) {
                                                       const uploaded = [];
                                                       const Images = [...currentPost.Images];
                                                       FileNumbers.map(async (number) => {
                                                           setIsLoading(true)
                                                           const formData = new FormData();
                                                           formData.append("filename", Files[number].name)
                                                           formData.append("file", Files[number]);
                                                           await uploadPostPicture(formData);
                                                           uploaded.push("uploaded");
                                                           Images.push(Files[number].name);
                                                           if (uploaded.length === FileNumbers.length) {
                                                               data.Images = Images
                                                               dispatch(EditPost(currentPost?._id, data, setIsLoading, setData, setFileNumbers, formRef.current, setPostEdit))
                                                           }
                                                       })
                                                   } else {
                                                       dispatch(EditPost(currentPost?._id, data, setIsLoading, setData, setFileNumbers, formRef.current, setPostEdit))
                                                   }

                                               }} disabled={FileNumbers.length === 0 && Object.keys(data).length === 0}
                                                       sx={{mt: 1}} variant={"contained"}>Submit</Button>
                                           </Box>
                                       </form>
                                   </Box>
                                   <Box sx={{flexGrow: 1}}/>

                               </Box>
                           ) : <>
                               {currentPost?.Content ? (
                                   <CardContent>
                                       <Typography variant="body1" color="text.primary" fontSize={22}>
                                           {currentPost?.Content}
                                       </Typography>
                                   </CardContent>
                               ) : null}
                               {currentPost?.Images.length !== 0 ? (
                                   <Grid container alignContent='flex-start' alignItems='flex-start' justifyContent={"center"}

                                   >
                                       {currentPost.Images.map((image, index) => (
                                           <Grid item>
                                               <CardMedia
                                                   key={index}
                                                   component="img"
                                                   height="250"
                                                   image={`/posts/get/post/picture/${image}`}
                                                   alt={image}
                                               />
                                           </Grid>
                                       ))}
                                   </Grid>
                               ) : null}
                               <CardActions>
                                   <IconButton aria-label="Like">
                                       <ThumbUp onClick={() => {
                                           if (currentPost.Likes.includes(currentUser.Key)) {
                                               dispatch(ReactPost(currentPost._id, {UnLike: true}))
                                           } else {
                                               dispatch(ReactPost(currentPost._id, {Like: true}))
                                           }

                                       }} color={currentPost.Likes.includes(currentUser.Key) ? "primary" : ""}
                                                sx={{fontSize: 20}}/> {currentPost.Likes.length !== 0 ?
                                       <Typography sx={{ml: 1}} component={"h5"}>{currentPost.Likes.length}</Typography> : null}
                                   </IconButton>
                                   <IconButton aria-label="Comment" onClick={() => {
                                       if (currentPost?.Comments.length !== 0) {
                                           setShowComments(prevState => !prevState);
                                       }
                                   }}>
                                       <Comment sx={{fontSize: 20}}/> {currentPost.Comments.length !== 0 ?
                                       <Typography sx={{ml: 1}} component={"h5"}>{currentPost.Comments.length}</Typography> : null}
                                   </IconButton>

                               </CardActions>
                               <Grid
                                   container
                                   direction="row"
                                   justifyContent="flex-start"
                                   alignItems="flex-start">
                                   <Grid xl={3} lg={3} md={3} sm={3}/>
                                   <Grid xl={1} lg={1} md={1} sm={1} align={"end"} item>
                                       <Avatar src={`/auth/get/profile_picture/${currentUser?.Photo}`}/>
                                   </Grid>
                                   <Grid xl={7} lg={7} md={7} sm={7} item>
                                       <form ref={commentFormRef}>
                                           <FormControl fullWidth sx={{...theme.typography.customInput}}>
                                               <OutlinedInput
                                                   multiline={true}
                                                   type="text"
                                                   name="Comments"
                                                   autoComplete={"off"}
                                                   placeholder={"Write a comment..."}
                                                   onChange={(event) => {
                                                       setData({Comments: event.target.value})
                                                   }}
                                               />
                                           </FormControl>
                                       </form>
                                   </Grid>
                                   <Grid xl={1} lg={1} md={1} sm={1} item>
                                       <IconButton onClick={() => {
                                           data.Comment = true;
                                           data.Delete = false;
                                           dispatch(CommentPost(currentPost?._id, data, setData, commentFormRef.current))
                                       }} disabled={Object.keys(data).length === 0} sx={{mt: 1}} variant={"contained"}
                                                   color={"primary"}>
                                           <Send/>
                                       </IconButton>
                                   </Grid>
                               </Grid>

                           </>}

                           <Collapse in={ShowComments} timeout="auto" unmountOnExit>
                               {(ShowComments) && (
                                   <CardContent>
                                       {currentPost?.Comments?.sort((a, b) => {
                                           if (a.Date > b?.Date) {
                                               return -1
                                           }
                                           return 0
                                       }).map((coment, index) => (
                                           <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                               <ListItem alignItems="flex-start">
                                                   <ListItemAvatar>
                                                       <Avatar alt={coment?.OwnerPhoto} src={`/auth/get/profile_picture/${coment?.OwnerPhoto}`}/>
                                                   </ListItemAvatar>
                                                   <ListItemText
                                                       primary={coment?.OwnerName}
                                                       secondary={
                                                           <React.Fragment>
                                                               <Typography
                                                                   sx={{ display: 'block' }}
                                                                   component="span"
                                                                   variant="body2"
                                                                   color="text.primary"
                                                               >
                                                                   {coment?.Comment}
                                                               </Typography>
                                                               {moment(coment?.Date).fromNow()}
                                                           </React.Fragment>
                                                       }
                                                   />
                                               </ListItem>
                                               <Divider variant="inset" component="li" />
                                           </List>
                                       ))}
                                   </CardContent>
                               )}
                           </Collapse>

                       </Card>
                   </Grid>
                   <Popover
                       open={Boolean(OnPopover)}
                       anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                       }}
                       anchorEl={OnPopover}
                       transformOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                       }}
                       onClose={() => {
                           setOnPopover(null)
                       }}
                   >
                       <MenuItem onClick={() => {
                           dispatch(DeletePost(currentPost?._id, setIsLoading));
                           setOnPopover(null)
                       }}>
                           Delete
                       </MenuItem>
                       <MenuItem onClick={() => {
                           setPostEdit(true)
                           setOnPopover(null)
                       }}>
                           Edit
                       </MenuItem>
                   </Popover>
               </Grid>
           ) : <Navigate to={"/"}/>}

       </>
    )
}

export default PostDetails;
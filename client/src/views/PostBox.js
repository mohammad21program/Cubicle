import {
    Avatar, AvatarGroup,
    Box, Button,
    Card,
    CardContent,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {CloudUpload} from "@mui/icons-material";
import {VisuallyHiddenInput} from "./SignupPage";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CreatePost} from "../store/posts/actions";
import LoadingProgressBar from "../utils/LoadingProgressBar";
import {uploadPostPicture} from "../api/posts";

const PostBox = () => {
    const theme = useTheme();
    const [Files, setFiles] = useState([]);
    const [FileNumbers, setFileNumbers] = useState([]);
    const [data, setData] = useState({});
    const {Auth: {currentUser}} = useSelector(state => state);
    const formRef = useRef();
    const dispatch = useDispatch()
    const [IsLoading, setIsLoading] = useState(false)
    return (
        <Card>
            <CardContent>
                <Box sx={{display: "flex"}}>
                    <Box compoment={"span"} sx={{flexGrow: 0.1}}>
                        <Avatar  src={`/auth/get/profile_picture/${currentUser?.Photo}`}/>
                    </Box>
                    <LoadingProgressBar IsLoading={IsLoading}/>
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
                                    maxRows={8}
                                    onChange={(event) => {
                                        setData({Content: event.target.value})
                                    }}
                                />
                            </FormControl>
                            <Box align={"end"}>
                                {FileNumbers?.length !== 0 && (
                                    <AvatarGroup max={4}>
                                        {FileNumbers.map((number, index) => (
                                            <Avatar key={index} alt={Files[index]?.name} src={URL.createObjectURL(Files[number])}/>
                                        ))}
                                    </AvatarGroup>
                                )}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<CloudUpload/>}
                                    component={"label"}
                                >
                                    Upload picture
                                    <VisuallyHiddenInput multiple accept={"image/*"} type="file"
                                                         onChange={(event) => {
                                                             const numbers = [];
                                                             for (let i = 0; i <event.target.files.length; i++) {
                                                                numbers.push(i)
                                                             }
                                                             setFileNumbers(numbers)
                                                             setFiles(event.target.files)
                                                         }}/>
                                </Button>
                                <Button onClick={async () => {
                                    if (FileNumbers.length !== 0) {
                                        const uploaded = [];
                                        const Images = [];
                                        FileNumbers.map(async (number) => {
                                            setIsLoading(true)
                                            const formData = new FormData();
                                            formData.append("filename", Files[number].name)
                                            formData.append("file", Files[number]);
                                            await uploadPostPicture(formData);
                                            uploaded.push("uploaded");
                                            Images.push(Files[number].name);
                                            if (uploaded.length === FileNumbers.length) {
                                                data.Images= Images
                                                dispatch(CreatePost(data, setIsLoading, setData, setFileNumbers, formRef.current))
                                            }
                                        })
                                    } else {
                                        dispatch(CreatePost(data, setIsLoading, setData, setFileNumbers, formRef.current))
                                    }

                                }} disabled={FileNumbers.length === 0 && Object.keys(data).length === 0} sx={{mt: 1}} variant={"contained"}>Submit</Button>
                            </Box>
                        </form>
                    </Box>
                    <Box compoment={"span"} sx={{flexGrow: 0.2}}>

                    </Box>
                </Box>
            </CardContent>

        </Card>
    )
}

export default PostBox
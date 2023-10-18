import {
    Grid
} from "@mui/material";
import PostView from "./PostView";
import PostBox from "./PostBox";
import {useSelector} from "react-redux";


const HomePage = () => {
    const {Post: {Posts}} = useSelector(state => state)
    return (
        <Grid container direction={"row"} alignItems={"flex-start"} justifyContent={"center"}>
            <Grid item xs={11} sm={8} md={8}  justifyContent={"center"} >
                <PostBox/>
                {Posts.length !== 0 && (
                    <PostView/>
                )}
            </Grid>
        </Grid>
    )
}

export default HomePage
import { Link } from "react-router-dom";
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"

const Signup = () => {
    return (
    <Auth submitLabel="Sign up" onSubmit={async () => {}}>
        <Link to={'/login'} style={{alignSelf: 'center'}}> 
            <MUILink> Log in </MUILink> 
        </Link>
    </Auth>)
}


export default Signup;
import { Link } from "react-router-dom";
import Auth from "./Auth"
import { Link as MUILink } from "@mui/material"

const Login = () => {
    return (
        <Auth submitLabel="Log in" onSubmit={async () => {}}>
            <Link to={'/signup'} style={{alignSelf: 'center'}}> 
                <MUILink> Sign up </MUILink> 
            </Link>
        </Auth>)
}


export default Login;
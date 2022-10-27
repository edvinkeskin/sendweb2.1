import './Header.css'
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    function logout() {
        navigate("/", {state:{name:null}});
    }

    return (
        <div className="Header">
            <div className='Title'>
                <img src={require("../../images/AcuteSender.png")} alt='AcuterSender.png'/>

                <img src={require("../../images/AcuteLogo1.png")} alt='AcuterLogo.png'/>
            </div>

            <div className="ButtonSet">
                <label className='centerVertically'>{props.name}&nbsp;&nbsp;&nbsp;&nbsp;</label>

                {props.name ? <button className="HeaderButton" onClick={logout}>Logout</button> : ''}

                <Link to="/signup">
                    {props.name ? '' : <button className="HeaderButton">Sign Up</button>}
                </Link>

                <Link to="/login">
                    {props.name ? '' : <button className="HeaderButton">Login</button>}

                </Link>

            </div>





        </div>
    );
}
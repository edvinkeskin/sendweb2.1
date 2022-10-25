import './Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import Axios from "axios";

export default function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // These methods will update the state properties.
    function updateEmail(value) {
        setEmail(value)
    }

    function updatePassword(value) {
        setPassword(value)
    }

    function inputValidity() {

    }

    // login
    // When a post request is sent to the login url, we'll check database.
    function login() {
        inputValidity()
        const url = `http://localhost:5000/users/${email}`;
        Axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data) {
                if (response.data.password !== password) {
                    setError(true)
                    return
                }
                setError(false)

            } else {
                setError(true)
            }

        }).catch(err => console.log(err));
    }

    function passwordVisibility() {
        const passwordInput = document.getElementById("passwordInput");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="Header">
                    <div className='Title'>
                        <Link to="/">

                            <img className='acuteSender' src={require("../../images/AcuteSender.png")}
                                 alt='AcuterSender.png'/>

                            <img className='acuteLogo' src={require("../../images/AcuteLogo1.png")}
                                 alt='AcuterLogo.png'/>

                        </Link>
                    </div>
                </div>
            </header>
            <div className="login-body">
                <div className='login-body-header'>
                    <label style={{paddingBottom: '1vh'}}>Sign in</label>
                    <label>Send data without access key.</label>
                </div>
                <br/>
                <div className='login-body-body'>
                    <label>Email</label>
                    <input type="text" className={`login-textInput${error}`}
                           onChange={(e) => updateEmail(e.target.value)}/>
                    <br/>
                    <label>Password</label>
                    <input id='passwordInput' type="password" className={`login-textInput${error}`}
                           onChange={(e) => updatePassword(e.target.value)}/>
                    <div className='passwordExtras'>
                        <input type="checkbox" className='login-checkboxInput' id="password"
                               onClick={passwordVisibility}/>
                        <div className='centerVertically'>
                            <label>Show Password</label>
                        </div>
                        <Link className='fPasswordButton' to="/forgotpassword">
                            <label className='cursorPointer'>Forgot password?</label>
                        </Link>
                    </div>
                    {error ? <text className='loginText'>Wrong email or password, please try again.</text> : ''}

                    <br/>
                    <button className="loginButton" onClick={login}>Login</button>
                    <br/>
                    <Link to="/signup">
                        <button className="signUpButton">Sign Up</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
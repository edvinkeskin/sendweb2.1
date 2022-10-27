import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Axios from "axios";

export default function Login() {
    const [error, setError] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailBorder, setErrorEmailBorder] = useState(false);
    const [errorPasswordBorder, setErrorPasswordBorder] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateEmail(value) {
        setEmail(value)
    }

    function updatePassword(value) {
        setPassword(value)
    }

    function setErrors(b) {
        setError(b)
        setErrorEmailBorder(b)
        setErrorPasswordBorder(b)
    }

    function inputValidity() {
        setError(false)
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        const emailValidity = regex.test(email.toLowerCase());
        setErrorEmail(!emailValidity);
        setErrorEmailBorder(!emailValidity);
        setErrorPassword(!password);
        setErrorPasswordBorder(!password);

        return !email || !password;
    }

    // login

    // When a post request is sent to the login url, we'll check database.
    function useLogin() {
        if (inputValidity()) {
            return;
        }
        const url = `http://localhost:5000/users/${email}`;
        Axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data) {
                if (response.data.password !== password) {
                    setErrors(true)
                    return;
                }
                setErrors(false);
                navigate("/", {state:{name:response.data.name, email:response.data.email}});
            } else {
                setErrors(true);
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
                    <input type="text" className={`login-textInput${errorEmailBorder}`}
                           onChange={(e) => updateEmail(e.target.value)}/>
                    {errorEmail ? <text className='loginText'>You have to enter a valid email address.</text> : ''}

                    <br/>
                    <label>Password</label>
                    <input id='passwordInput' type="password" className={`login-textInput${errorPasswordBorder}`}
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
                    {errorPassword ? <text className='loginText'>You have to enter a valid password.</text> : ''}

                    <br/>
                    <button className="loginButton" onClick={useLogin}>Login</button>
                    <br/>
                    <Link to="/signup">
                        <button className="signUpButton">Sign Up</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
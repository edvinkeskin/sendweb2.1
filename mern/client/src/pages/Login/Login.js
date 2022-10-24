import './Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";

export default function Login() {
    const [errorText, setErrorText] = useState(false);

    function login() {

    }

    function passwordVisibility() {
        const passwordInput = document.getElementById("passwordInput");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    function fPasswordNav() {
        this.props.history.push('/forgotpassword');
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
                    <label>Create Account — send data without access key.</label>
                </div>
                <br/>
                <div className='login-body-body'>
                    <label>Email</label>
                    <input type="text" className={`login-textInput${errorText}`}
                           onChange={(e) => updateText(e.target.value)}/>
                    <br/>
                    <label>Password</label>
                    <input id='passwordInput' type="password" className={`login-textInput${errorText}`}
                           onChange={(e) => updateText(e.target.value)}/>
                    <div className='passwordExtras'>
                        <input type="checkbox" className='login-checkboxInput' id="password"
                               onClick={passwordVisibility}/>
                        <div className='centerVertically'>
                            <label>Show Password</label>
                        </div>

                        <label className='fPasswordButton' onClick={fPasswordNav}>Forgot password?</label>

                    </div>

                    <br/>
                    <button className="loginButton" onClick={login}>Enter</button>
                    <br/>
                    <Link to="/signup">
                        <button className="signUpButton">Sign Up</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
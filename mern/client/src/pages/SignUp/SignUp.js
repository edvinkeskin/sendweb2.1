import './SignUp.css';
import {Link} from "react-router-dom";
import {useState} from "react";

export default function SignUp() {
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // These methods will update the state properties.
    function updateName(value) {
        setName(value)
    }

    function updateEmail(value) {
        setEmail(value)
    }

    function updatePassword(value) {
        setPassword(value)
    }

    function inputValidity() {
        let error
        setErrorName(!name)
        setErrorPassword(!password)

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        const emailValidity = regex.test(email.toLowerCase())
        setErrorEmail(!emailValidity)

        error = !name || !password || !emailValidity
        return error
    }

    // signup
    // When a post request is sent to the signup url, we'll add a new user to the database.
    async function signup() {
        if (inputValidity()) {
            return
        }
        const newUser = {name: name, email: email, password: password};
        console.log(newUser)
        await fetch(`http://localhost:5000/users/add/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .catch(error => {
                window.alert(error);
            });
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
                    <label style={{paddingBottom: '1vh'}}>Sign up</label>
                    <label>Create Account — send data without access key.</label>
                </div>
                <br/>
                <div className='login-body-body'>
                    <label>Name</label>
                    <input type="text" className={`login-textInput${errorName}`}
                           onChange={(e) => updateName(e.target.value)}/>
                    {errorName ? <text className='loginText'>You have to enter a name</text> : ''}
                    <br/>
                    <label>Email</label>
                    <input type="text" className={`login-textInput${errorEmail}`}
                           onChange={(e) => updateEmail(e.target.value)}/>
                    {errorEmail ? <text className='loginText'>You have to enter a valid email address</text> : ''}
                    <br/>
                    <label>Password</label>
                    <input id='passwordInput' type="password" className={`login-textInput${errorPassword}`}
                           onChange={(e) => updatePassword(e.target.value)}/>
                    {errorPassword ? <text className='loginText'>You have to enter a valid password</text> : ''}
                    <div className='passwordExtras'>
                        <input type="checkbox" className='login-checkboxInput' id="password"
                               onClick={passwordVisibility}/>
                        <div className='centerVertically'>
                            <label>Show Password</label>
                        </div>
                    </div>

                    <br/>
                    <button className="loginButton" onClick={signup}>Create Account</button>
                    <br/>
                    <Link to="/login">
                        <button className="signUpButton">Back to Login</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
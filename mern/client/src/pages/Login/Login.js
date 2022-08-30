import './Login.css';
import GoogleLogin from "react-google-login";

export default function Login() {

    const onSuccess = (res) => {
        alert(res);
    };

    const onFailure = (err) => {
        alert('failed: ')
        alert(err)
    };

    return (
        <div className="App">
            <header className="App-header">
            </header>
            <div className="App-body">
                <GoogleLogin
                    clientId={process.env.CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>

        </div>
    );
}
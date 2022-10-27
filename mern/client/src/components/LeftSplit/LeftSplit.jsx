import './LeftSplit.css'
import {useState} from "react";
import FileBase64 from 'react-file-base64';

export default function LeftSplit(props) {
    const [key, setKey] = useState("");
    const [text, setText] = useState();
    const [file, setFile] = useState();
    const [timer, setTimer] = useState(5)
    const [errorText, setErrorText] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorFile, setErrorFile] = useState(false);
    const [passwordCheckbox, setPasswordCheckbox] = useState(false)
    const [privateCheckbox, setPrivateCheckbox] = useState(false)
    const [password, setPassword] = useState()

    function getFiles(files) {
        console.log(files)
        setFile(files)
    }

    // These methods will update the state properties.
    function updateText(value) {
        setText(value)
    }

    function updatePassword(value) {
        setPassword(value)
    }

    // create
    // When a post request is sent to the create url, we'll add a new record to the database.
    async function create() {
        setErrorFile(false)
        setErrorPassword(false)
        setErrorText(!text)
        setKey("")
        if (!text) {
            return
        } else if (passwordCheckbox && !password) {
            setErrorPassword(true)
            return
        }

        let newNote
        if(privateCheckbox) {
            newNote = {key: null, input: text, inputType: "string", password: password, email: props.email};
        } else {
            const key = (112 + Math.floor(Math.random() * 999887)).toString()
            setKey(key)
            newNote = {key: key, input: text, inputType: "string", password: password, email: null};
        }

        await fetch(`http://localhost:5000/drops/add/${timer}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
            .catch(error => {
                window.alert(error);
            });
    }

    // create
    // When a post request is sent to the create url, we'll add a new record to the database.
    async function createFile() {
        setErrorText(false)
        setErrorPassword(false)
        setErrorFile(!file)
        setKey("")
        if (!file) {
            return
        } else if (passwordCheckbox && !password) {
            setErrorPassword(true)
            return
        }

        let newNote
        if(privateCheckbox) {
            newNote = {key: null, input: file.base64, inputType: file.type, password: password, email: props.email};
        } else {
            const key = (112 + Math.floor(Math.random() * 999887)).toString()
            setKey(key)
            newNote = {key: key, input: file.base64, inputType: file.type, password: password, email: null};
        }

        await fetch(`http://localhost:5000/drops/add/${timer}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
            .catch(error => {
                window.alert(error);
            });
    }

    return (
        <div className="split">
            <div className='leftSplitDiv'>
                <label>Send Text: &nbsp; </label>
                <input type="text" className={`textInput${errorText}`} onChange={(e) => updateText(e.target.value)}/>
                <button className="leftSplitButton" onClick={create}>Enter</button>
            </div>
            {errorText ? <text>No text input to send</text> : ""}
            <br/>
            <div className='leftSplitDiv'>
                <label>Send File: &nbsp;&nbsp; </label>
                <FileBase64 onDone={getFiles.bind(this)}/>
                <button className="leftSplitButton" onClick={createFile}>Enter File</button>
            </div>
            {errorFile ? <text>File not inserted</text> : ""}
            <br/>

            <div className='leftSplitDiv'>
                <label>Add Password: &nbsp;</label>
                <input type="checkbox" className='checkboxInput' id="password" disabled={privateCheckbox} onChange={() => {
                    setPasswordCheckbox(document.getElementById("password").checked)
                    setPassword(null)
                    setErrorPassword(false)
                }}/>
            </div>
            <br/>
            {props.name ?
                <div className='leftSplitDiv'>
                    <label>Send private to account: &nbsp;</label>
                    <input type="checkbox" className='checkboxInput' id="private" onChange={() => {
                        setPrivateCheckbox(document.getElementById("private").checked)
                    }}/>
                </div> : ''}
            <div>
                {passwordCheckbox ? <br/> : ""}
                {passwordCheckbox ? <label>Password: </label> : ""}
                {passwordCheckbox ? <input type="text" className='textInputfalse'
                                           onChange={(e) => updatePassword(e.target.value)}/> : ""}
                {errorPassword ? <br/> : ""}
                {errorPassword ? <text>Password not set</text> : ""}
            </div>
            <br/>
            <div className='timerButtons'>
                <button className={`timer${timer === 5}`} onClick={() => setTimer(5)}>5 minutes</button>
                <button className={`timer${timer === 60}`} onClick={() => setTimer(60)}>1 hour</button>
                <button className={`timer${timer === 1440}`} onClick={() => setTimer(1440)}>24 hours</button>
                <button className={`timer${timer === 0}`} onClick={() => setTimer(0)}>No Expiration</button>
            </div>

            <h2>{key ? `Access Key: ${key}` : ''}</h2>
        </div>
    );

}
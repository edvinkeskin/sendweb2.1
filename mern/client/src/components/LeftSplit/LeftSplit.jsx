import './LeftSplit.css'
import {useState} from "react";
import FileBase64 from 'react-file-base64';

export default function LeftSplit() {
    const [key, setKey] = useState();
    const [text, setText] = useState();
    const [file, setFile] = useState();
    const [timer, setTimer] = useState(5)
    const [error, setError] = useState(false);
    const [errorFile, setErrorFile] = useState(false);
    const [passwordCheckbox, setPasswordCheckbox] = useState(false)
    const [password, setPassword] = useState()

    function getFiles(files){
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
        if(!text) {
            setError(true)
            return
        }
        const key = (112 + Math.floor(Math.random() * 999887)).toString()
        setKey(key)
        let newNote
        if(password) {
            newNote = {key: key , input: text, inputType: "string", password: password};
        } else {
            newNote = {key: key , input: text, inputType: "string"};
        }
        await fetch(`http://localhost:5000/record/add/${timer}`, {
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
        if(!file) {
            setErrorFile(true)
            return
        }
        const key = (112 + Math.floor(Math.random() * 999887)).toString()
        setKey(key)
        let newNote
        if(password) {
            newNote = {key: key , input: file.base64, inputType: file.type, password: password};
        } else {
            newNote = {key: key , input: file.base64, inputType: file.type};
        }

        console.log(JSON.stringify(newNote))

        await fetch(`http://localhost:5000/record/add/${timer}`, {
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
        <div className="Split">
            <label>String Drop:</label>
            <input type="text" className={`textInput${error}`}  onChange={(e) => updateText(e.target.value)}/>
            <label>File Drop:</label>
            <FileBase64 onDone={  getFiles.bind(this) } />
            <button className="Button" onClick={create}>Enter</button>
            <button className="Button" onClick={createFile}>Enter File</button>
            <input type="checkbox" id="password" onChange={() => setPasswordCheckbox(document.getElementById("password").checked)}/>
            <label>Add Password</label>

            <div>
                <button className={`timer${timer===5}`} onClick={() => setTimer(5)}>5 minutes</button>
                <button className={`timer${timer===60}`} onClick={() => setTimer(60)}>1 hour</button>
                <button className={`timer${timer===1440}`} onClick={() => setTimer(1440)}>24 hours</button>
                <button className={`timer${timer===0}`} onClick={() => setTimer(0)}>No Scheduled Delete</button>
            </div>

            {passwordCheckbox ? <label>Password:</label> : ""}
            {passwordCheckbox ? <input type="text"  onChange={(e) => updatePassword(e.target.value)}/> : ""}
            <h1>{key}</h1>
        </div>
    );

}
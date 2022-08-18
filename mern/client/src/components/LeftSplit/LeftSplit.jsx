import './LeftSplit.css'
import {useState} from "react";
import FileBase64 from 'react-file-base64';

export default function LeftSplit() {
    const [key, setKey] = useState();
    const [text, setText] = useState();
    const [file, setFile] = useState();

    function getFiles(files){
        console.log(files)
        setFile(files)
    }

    // These methods will update the state properties.
    function updateText(value) {
        setText(value)
    }

    // create
    // When a post request is sent to the create url, we'll add a new record to the database.
    async function create() {
        const key = (112 + Math.floor(Math.random() * 999887)).toString()
        setKey(key)
        const newNote = {key: key , input: text, inputType: "string"};
        await fetch("http://localhost:5000/record/add", {
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
        const key = (112 + Math.floor(Math.random() * 999887)).toString()
        setKey(key)
        const newNote = {key: key , input: file.base64, inputType: file.type};
        console.log(JSON.stringify(newNote))

        await fetch("http://localhost:5000/record/add", {
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
            <text>source</text>
            <input type="text"  onChange={(e) => updateText(e.target.value)}/>
            <FileBase64 onDone={  getFiles.bind(this) } />
            <button className="Button" onClick={create}>Enter</button>
            <button className="Button" onClick={createFile}>Enter File</button>
            <h1>{key}</h1>
        </div>
    );

}
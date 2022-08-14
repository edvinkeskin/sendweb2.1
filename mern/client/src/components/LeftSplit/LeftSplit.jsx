import './LeftSplit.css'
import {useState} from "react";
import FileBase64 from 'react-file-base64';

export default function LeftSplit(props) {
    const [key, setKey] = useState("");
    const [text, setText] = useState({
        textInput: "",
    });
    const [file, setFile] = useState();

    function getFiles(files){
        setFile(files)
    }


    // These methods will update the state properties.
    function updateText(value) {
        return setText((prev) => {
            return { ...prev, ...value };
        });
    }

    // create
    async function create() {
        // When a post request is sent to the create url, we'll add a new record to the database.
        const key = 112 + Math.floor(Math.random() * 999887)
        setKey(key.toString())
        const newNote = {key: key , ... text};
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
    // 728.42 KB, 745905 chars
    // create
    async function createFile() {
        // When a post request is sent to the create url, we'll add a new record to the database.
        const key = 112 + Math.floor(Math.random() * 999887)
        setKey(key.toString())
        const newNote = {key: key , textInput: file.base64};
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
            <input type="text"  onChange={(e) => updateText({ textInput: e.target.value })}/>
            <FileBase64 onDone={  getFiles.bind(this) } />
            <button className="Button" onClick={create}>Enter</button>
            <button className="Button" onClick={createFile}>Enter File</button>
            <h1>{key}</h1>
        </div>
    );

}
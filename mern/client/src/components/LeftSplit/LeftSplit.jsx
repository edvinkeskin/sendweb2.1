import './LeftSplit.css'
import {useState} from "react";


export default function LeftSplit(props) {
    const [key, setKey] = useState("");
    const [text, setText] = useState({
        textInput: "",
    });
    const [file, setFile] = useState({
        textInput: "",
    });

    // These methods will update the state properties.
    function updateText(value) {
        return setText((prev) => {
            return { ...prev, ...value };
        });
    }

    // These methods will update the state properties.
    function updateFile(value) {
        return setFile((prev) => {
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

    // create
    async function createFile() {
        // When a post request is sent to the create url, we'll add a new record to the database.
        const key = 112 + Math.floor(Math.random() * 999887)
        setKey(key.toString())
        const newNote = {key: key , ... file};
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

    function getSource() {
        const fileInput = document.getElementById('fileInput');
        create().then(r => {

        })
    }

    return (
        <div className="Split">
            <text>source</text>
            <input type="text"  onChange={(e) => updateText({ textInput: e.target.value })}/>
            <input type="file" onChange={(e) => updateFile({ textInput: e.target.files[0] })}/>
            <button className="Button" onClick={getSource}>Enter</button>
            <button className="Button" onClick={createFile}>Enter File</button>
            <h1>{key}</h1>
        </div>
    );

}
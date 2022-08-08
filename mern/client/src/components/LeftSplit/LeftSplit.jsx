import './LeftSplit.css'
import {useState} from "react";


export default function LeftSplit(props) {
    const [key, setKey] = useState('')
    const [form, setForm] = useState({
        key: "",
        textInput: ""
    });

    // create
    async function create() {

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newNote = {...form};

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

        setForm({key: "", textInput: ""});
    }



// This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }


// edit
    async function edit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    function getSource() {
        const textInput = document.getElementById('textInput');
        const fileInput = document.getElementById('fileInput');
        const key = 112 + Math.floor(Math.random() * 999887)
        setKey(key.toString())
        setForm({key: key.toString(), textInput: textInput.toString()})
        create().then(r => {

        })
    }

    return (
        <div className="Split">
            <text>source</text>
            <input type="text" id="textInput"/>
            <input type="file" id="fileInput"/>
            <button className="Button" onClick={getSource}>Enter</button>
            <text>{key}</text>
        </div>
    );

}
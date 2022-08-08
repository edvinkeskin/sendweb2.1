import './LeftSplit.css'
import {useState} from "react";
import {createDocument} from 'backend'

// create
async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
        .catch(error => {
            window.alert(error);
            return;
        });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
}


// edit
async function onSubmit(e) {
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

    navigate("/");
}


const LeftSplit = (props) => {
    const [key, setKey] = useState('')

    function getSource() {
        const textInput = document.getElementById('textInput');
        const fileInput = document.getElementById('fileInput');
        const key = 112 + Math.floor(Math.random() * 999887)
        setKey(key.toString())
        createDocument(key, textInput).then(r => {

        })
    }

    return (
        <div className="Split">
            <text>source</text>
            <input type="text" id="textInput"/>
            <input type="file" id="fileInput" />
            <button className="Button" onClick={getSource}>Enter</button>
            <text>{key}</text>
        </div>
    );

}
export default LeftSplit;
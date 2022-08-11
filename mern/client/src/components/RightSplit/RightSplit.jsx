import './RightSplit.css'
import {useState} from "react";

function getCode() {
    const codeInput = document.getElementById('codeInput');
    alert(codeInput.value)
}

export default function RightSplit(props) {
    const [key, setKey] = useState(0);
    const [message, setMessage] = useState("");

    // These methods will update the state properties.
    function updateForm(value) {
        return setKey((prev) => {
            return { ...prev, ...value };
        });
    }

    // This method fetches the records from the database.
    async function read() {
        const response = await fetch(`http://localhost:5000/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        const records = await response.json();
        for (let record of records) {
            if (record.key === key) {
                setMessage(record.textInput)
            }

        }
    }

    return (
        <div className="Split">
            <text>code</text>
            <input type="text" onChange={(e) => setKey(parseInt(e.target.value))} />
            <button className="Button" onClick={read} >Enter </button>
            <h1>{message}</h1>
        </div>
    );

}
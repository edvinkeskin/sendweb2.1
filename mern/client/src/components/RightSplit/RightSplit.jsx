import './RightSplit.css'
import {useState} from "react";

function getCode() {
    const codeInput = document.getElementById('codeInput');
    alert(codeInput.value)
}

export default function RightSplit(props) {
    // This method fetches the records from the database.
    async function read() {
        const codeInput = document.getElementById('codeInput');
        const response = await fetch(`http://localhost:5000/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        alert(records)
    }

    return (
        <div className="Split">
            <text>code</text>
            <input type="text" id="codeInput"/>
            <button className="Button" onClick={read}>Enter</button>
        </div>
    );

}
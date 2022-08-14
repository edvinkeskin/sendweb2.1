import './RightSplit.css'
import {useState} from "react";
import Axios from "axios";

function getCode() {
    const codeInput = document.getElementById('codeInput');
    alert(codeInput.value)
}

export default function RightSplit(props) {
    const [key, setKey] = useState(0);
    const [image, setImage] = useState();
    const [message, setMessage] = useState("");

    // This method fetches the records from the database.
    async function read() {
        /*
        const response = await fetch(`http://localhost:5000/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

         */
        const url = `http://localhost:5000/record/`;
        Axios.get(url).then((response)=>{
            for (let record of response.data) {
                if (record.key === key) {
                    const blob = new Blob([Int8Array.from(record.textInput)], {type: record.textInput.contentType });

                    const image = window.URL.createObjectURL(blob);
                    alert(image)
                }

            }
        }).catch(err=>console.log(err));
    }

    return (
        <div className="Split">
            <text>code</text>
            <input type="text" onChange={(e) => setKey(parseInt(e.target.value))} />
            <button className="Button" onClick={read} >Enter </button>

            <h1>{message}</h1>
            <img id="foo" src={image}/>
        </div>
    );

}
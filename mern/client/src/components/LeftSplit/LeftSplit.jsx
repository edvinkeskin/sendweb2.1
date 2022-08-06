import './LeftSplit.css'
import {useState} from "react";
import {createDocument} from 'backend'



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
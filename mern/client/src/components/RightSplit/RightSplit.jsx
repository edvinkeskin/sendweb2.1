import './RightSplit.css'
import {useState} from "react";

function getCode() {
    const codeInput = document.getElementById('codeInput');
    alert(codeInput.value)
}

const RightSplit = (props) => {
    return (
        <div className="Split">
            <text>code</text>
            <input type="text" id="codeInput"/>
            <button className="Button" onClick={getCode}>Enter</button>
        </div>
    );

}
export default RightSplit;
import './RightSplit.css'
import {useState} from "react";
import Axios from "axios";

export default function RightSplit(props) {
    const [key, setKey] = useState(0);
    const [image, setImage] = useState();
    const [message, setMessage] = useState("");

    // This method fetches the records from the database.
    async function read() {
        const url = `http://localhost:5000/record/`;
        Axios.get(url).then((response)=>{
            for (let record of response.data) {
                if (record.key === key) {
                    // const blob = new Blob([Int8Array.from(record.textInput)], {type: record.textInput.contentType });
                    // const image = window.URL.createObjectURL(blob);
                    console.log(record.textInput.indexOf(',')+1)

                    const data = record.textInput.substring(record.textInput.indexOf(',')+1)
                    setImage(data)
                    // const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

                    // ReactDOM.render(<Example data={data} />, document.getElementById('container'))
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
            <img id="foo" src={`data:image/jpeg;base64,${image}`}/>
        </div>
    );

}
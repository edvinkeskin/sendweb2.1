import './RightSplit.css'
import {useState} from "react";
import Axios from "axios";
// import cat from '../../cat.jpg'

export default function RightSplit() {
    const [key, setKey] = useState();
    const [image, setImage] = useState();
    const [file, setFile] = useState();
    const [download, setDownload] = useState();
    const [message, setMessage] = useState("");

    // This method fetches the records from the database.
    async function read() {
        const url = `http://localhost:5000/record/`;
        Axios.get(url).then((response)=>{
            for (let record of response.data) {
                if (record.key === key) {
                    setDownload(null)
                    setImage(null)
                    setFile(null)
                    setMessage(null)
                    if (record.inputType === "string") {
                        setMessage(record.input)
                    } else if (record.inputType === "application/pdf") {
                        setFile(record.input)
                    } else if (record.inputType.startsWith("application")) {
                        setDownload(record.input)
                    } else if (record.inputType.startsWith("image")) {
                        setImage(record.input)
                    } else if (record.inputType === "text/html") {
                        setFile(record.input)
                    } else {
                        setDownload(record.input)
                    }
                }

            }
        }).catch(err=>console.log(err));
    }

    return (
        <div className="Split">
            <text>code</text>
            <input type="text" onChange={(e) => setKey(e.target.value)} />
            <button className="Button" onClick={read} >Enter </button>

            <h1>{message}</h1>
            {image ? <img src={image} style={{maxHeight: "80vh", maxWidth: "40vw"}} alt="receivedImage"/> : ""}
            {file ? <embed style={{height: "80vh", width: "50vw"}} src={file} /> : ""}
            {download ? <a download="pdfTitle" href={download} title='Download pdf document'>
                <h2>Download File</h2>
                </a>: ""}



        </div>
    );

}
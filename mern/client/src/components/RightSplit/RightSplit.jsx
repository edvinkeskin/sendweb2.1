import './RightSplit.css'
import {useState} from "react";
import Axios from "axios";
import cat from '../../cat.jpg'

// <a download=pdfTitle href=pdfData title='Download pdf document' />
// <embed src={`data:application/pdf;base64,${base64STR}`} />

// type: "image/jpeg"    type: "image/png"
// type: "application/pdf"   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"    type: "application/x-zip-compressed"
// type: "text/html"
export default function RightSplit(props) {
    const [key, setKey] = useState(0);
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
                    if (record.inputType === "string") {
                        setMessage(record.input)
                    } else if (record.inputType === "application/pdf") {
                        setFile(record.input)
                    } else if (record.inputType.startsWith("application")) {
                        setDownload(record.input)
                    } else if (record.inputType.startsWith("image")) {
                        const data = record.input.substring(record.input.indexOf(',')+1)
                        setImage(data)
                    }
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
            {image ? <img src={`data:image/jpeg;base64,${image}`} alt=""/> : ""}
            {file ? <embed style={{height: "85vh", width: "50vw"}} src={file} /> : ""}
            {download ? <a download="pdfTitle" href={download} title='Download pdf document'>
                <img src={cat} alt="W3Schools" width="104" height="142"/>
                </a>: ""}



        </div>
    );

}
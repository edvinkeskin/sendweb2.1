import './RightSplit.css'
import {useState} from "react";
import Axios from "axios";

export default function RightSplit(props) {
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState();
    const [error, setError] = useState(false);
    const [file, setFile] = useState();
    const [download, setDownload] = useState();
    const [message, setMessage] = useState("");
    const [privateMessages, setPrivateMessages] = useState([]);

    // This method fetches the records from the database.
    async function read() {
        setMessage("")
        setDownload(null)
        setFile(null)
        const url = `http://localhost:5000/drops/`;
        Axios.get(url).then((response) => {
            for (let record of response.data) {
                if (record.key === key) {
                    if (record.password && record.password !== password) {
                        setError(true)
                        return
                    }
                    setError(false)
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
                } else {
                    setError(true)
                }

            }
        }).catch(err => console.log(err));
    }

    // This method fetches the records from the database.
    async function readPrivate() {
        console.log(props.email)
        if (!props.email) {
            return
        }
        const url = `http://localhost:5000/drops/`;
        Axios.get(url).then((response) => {
            let privateMessages = []
            for (let record of response.data) {
                if (record.email === props.email) {
                    privateMessages.push(record)
                }
            }
            setPrivateMessages(privateMessages)
            console.log(privateMessages)
        }).catch(err => console.log(err));
    }

    function displayPrivateMessage(inputType, input) {
        setError(false)
        setDownload(null)
        setImage(null)
        setFile(null)
        setMessage(null)
        setMessage("")
        setDownload(null)
        setFile(null)

        if (inputType === "string") {
            setMessage(input)
        } else if (inputType === "application/pdf") {
            setFile(input)
        } else if (inputType.startsWith("application")) {
            setDownload(input)
        } else if (inputType.startsWith("image")) {
            setImage(input)
        } else if (inputType === "text/html") {
            setFile(input)
        } else {
            setDownload(input)
        }
    }

    function PrivateMessageList() {

        const listItems = privateMessages.map((number) =>
            <button className='listButton' onClick={() => displayPrivateMessage(number.inputType, number.input)}>{number.inputType}</button>
        );
        return (
            <ul className='splitTopList'>{listItems}</ul>
        );

    }

    return (
        <div className="split">
            <div className="splitTop">
                <div className='splitTopOne'>
                    <div>
                        <label>Code: &nbsp;</label>
                        <input type="text" className='textInputfalse' onChange={(e) => setKey(e.target.value)}/>
                        <button className="button" style={{marginLeft: '4vw'}} onClick={read}>Enter</button>

                    </div>
                    <br/>
                    <div>
                        <label>Password: &nbsp;</label>
                        <input type="password" className='textInputfalse' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                {props.email ?
                <div className='splitTopTwo'>
                    <button className="button" onClick={readPrivate}>Check</button>
                    <PrivateMessageList/>
                </div> : ''}
            </div>
            <div className='splitBottom'>
                <h1>{message}</h1>
                {image ? <img src={image} className='image' alt="receivedImage"/> : ""}
                {file ? <embed className='file' src={file}/> : ""}
                {download ? <a download="pdfTitle" href={download} title='Download pdf document'>
                    <h2>Download File</h2>
                </a> : ""}
                {error ? <h2>Invalid key or password</h2> : ""}
            </div>

        </div>
    );

}
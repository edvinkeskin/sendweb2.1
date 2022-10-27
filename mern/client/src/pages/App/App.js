import './App.css';
import {useLocation} from 'react-router-dom';
import Header from "../../components/Header/Header";
import LeftSplit from "../../components/LeftSplit/LeftSplit";
import RightSplit from "../../components/RightSplit/RightSplit";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <header className="App-header">
                <Header name={location.state?.name}/>
            </header>
            <div className="App-body">
                <LeftSplit name={location.state?.name} email={location.state?.email}/>
                <RightSplit email={location.state?.email}/>
            </div>

        </div>
    );
}

export default App;



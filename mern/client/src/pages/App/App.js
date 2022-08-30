import './App.css';
import Header from "../../components/Header/Header";
import LeftSplit from "../../components/LeftSplit/LeftSplit";
import RightSplit from "../../components/RightSplit/RightSplit";

function App() {
  return (
      <div className="App">
        <header className="App-header">
            <Header/>
        </header>
        <div className="App-body">
          <LeftSplit/>
          <RightSplit/>
        </div>

      </div>
  );
}

export default App;



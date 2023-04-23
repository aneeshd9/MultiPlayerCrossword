import Board from "./Board";
import Header from "./Header";

function App() {
  return (
    <div className="container-fluid vh-100 p-0 m-0 d-flex flex-column">
      <div className="row m-0 p-0">
        <Header />
      </div>
      <div className="row flex-grow-1 m-0 p-0">
        <Board />
      </div>
    </div>
  );
}

export default App;

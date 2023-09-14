import "./App.css";
import DataTable from "./muiComponent/DataTable";

function App() {

  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];
  
  return (
    <div className="App">
      Hi This is new TRAck
      <div>
        <h1>Material-UI Table Example</h1>
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;

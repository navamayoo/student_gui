import "./App.css";
import React, { useEffect, useState } from "react";
import DataTable from "./muiComponent/DataTable";
import axios from "axios";

function App() {
  // const data = [
  //   { id: 1, name: "John Doe", email: "john@example.com" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com" },
  //   { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  // ];
  const [data, setData] = useState([])

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/student");
    setData(res.data)
    console.log(res);
  };

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

import React, { useEffect, useState } from "react";
import DataTable from "../muiComponent/DataTable";
import axios from "axios";
import { Box, Button, Container } from "@mui/material";
import StudentForm from "./Student_Form";

export default function GUI_Student() {
  const [data, setData] = useState([]);
  const [editID, setEditID] = useState();
  const [deleteCode, setDeleteCode] = useState();
  const [FormSubmitted, setFormSubmitted] = useState(0);

  useEffect(() => {
    loadData();
  }, [FormSubmitted]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/student");
    setData(res.data);
  };

  const handleClickEdit = (row) => {
    setEditID(row);
    console.log("handleClickEdit", row);
  };

  const handleClickDelete = (row) => {
    setDeleteCode(row);
    console.log("handleClickDelete", row);
  };

  return (
    <div className="App">
      <h1>Material-UI Table Example</h1>
      <StudentForm editID={editID} setFormSubmitted={setFormSubmitted} />
      <DataTable
        data={data}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
}

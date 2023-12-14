import React, { useEffect, useState } from "react";
import DataTable from "../muiComponent/DataTable";
import axios from "axios";
import { Box, Button, Container } from "@mui/material";
import StudentForm from "./Student_Form";

export default function GUI_Student() {
  const [data, setData] = useState([]);
  const [editCode, setEdit] = useState();
  const [deleteCode, setDeleteCode] = useState();

  useEffect(() => {
    loadData();
  }, [data]);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/student");
    setData(res.data);
    // console.log(res);
  };

  const handleClickEdit = (row) => {
    setEdit(row);
   // console.log("handleClickEdit", row);
  };

  const handleClickDelete = (row) => {
    setDeleteCode(row);
    console.log("handleClickDelete", row);
  };

  // console.log(editCode);
  //   console.log(deleteCode);

  return (
    <div className="App">
      <h1>Material-UI Table Example</h1>
      <StudentForm edit={editCode}/>
      <DataTable
        data={data}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
}

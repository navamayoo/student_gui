import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit, EditNotifications } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const DataTable = ({ data }) => {
  const handleClick = (data) => {
    // Handle the button click event here
    console.log("Data", data);
  };

  return (
    <Container fixed>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phoneNum}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={handleClick(row._id)}
                      startIcon={<BorderColorIcon />}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleClick}
                      startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DataTable;

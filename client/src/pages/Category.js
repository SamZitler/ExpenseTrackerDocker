import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";
import CategoryForm from "../components/CategoryForm.js";
import { useState } from "react";

export default function Categories() {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editCategory, seteditCategory] = useState({});

  function setEdit(category) {
    seteditCategory(category);
  }

  async function remove(id) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const _user = {
        ...user,
        categories:
          user.categories && user.categories.filter((cat) => cat._id != id),
      };
      dispatch(setUser({ user: _user }));
    }
  }

  return (
    <Container>
      <CategoryForm editCategory={editCategory} />
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List Of Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              user?.categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {category.label}
                  </TableCell>
                  <TableCell align="center">{category.icon}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => setEdit(category)}
                    >
                      <EditSharpIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => remove(category._id)}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

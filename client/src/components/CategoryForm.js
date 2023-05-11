import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth.js";
const initialForm = {
  label: "",
  icon: "",
};

const icons = ["User"];

export default function CategoryForm({ editCategory }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editCategory._id !== undefined) {
      setForm(editCategory);
    }
  }, [editCategory]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleDate(newValue) {
    setForm({
      ...form,
      date: newValue,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editCategory._id === undefined) {
      create();
    } else {
      update();
    }
  };

  function reload(_user) {
    dispatch(setUser({ user: _user }));
    setForm(initialForm);
  }

  const create = async () => {
    console.log(form);
    axios
      .post(`${process.env.REACT_APP_API_URL}/category`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const _user = {
          ...user,
          categories: [...user?.categories, { ...form }],
        };
        reload(_user);
      });
  };

  const update = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        const _user = {
          ...user,
          categories: user?.categories.map((cat) =>
            cat._id == editCategory._id ? form : cat
          ),
        };
        reload(_user);
      });
  };

  function getCategoryNameById() {
    return (
      user &&
      user.categories &&
      (user?.categories.find((category) => category._id === form.category_id) ??
        "")
    );
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        marginTop: 10,
      }}
    >
      <CardContent>
        <Typography variant="h6"> Add New Category </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
          }}
        >
          <TextField
            sx={{
              marginRight: 5,
            }}
            size="small"
            id="outlined-basic"
            name="label"
            label="label"
            variant="outlined"
            type="text"
            value={form.label}
            onChange={handleChange}
          />{" "}
          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({
                ...form,
                icon: newValue,
              });
            }}
            id="icons"
            options={icons}
            sx={{
              width: 200,
              marginRight: 5,
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" />
            )}
          />{" "}
          {editCategory._id !== undefined && (
            <Button variant="secondary" type="submit">
              {" "}
              Update{" "}
            </Button>
          )}{" "}
          {editCategory._id === undefined && (
            <Button variant="contained" type="submit">
              {" "}
              Submit{" "}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

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
import { useSelector } from "react-redux";

const initialForm = {
  amount: 0,
  details: "",
  date: new Date(),
  category_id: "",
};

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
}) {
  const [isLoading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("token");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  // const user = useSelector((state) => state.auth.user);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  };

  const create = async () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/transaction`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setForm(initialForm);
        fetchTransactions();
      });
  };

  const update = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setForm(initialForm);
        fetchTransactions();
      });
  };

  function getCategoryNameById() {
    console.log("getCategoryNameById");
    // console.log(user?.categories);

    return (
      user &&
      user.categories &&
      (user?.categories?.find(
        (category) => category._id === form.category_id
      ) ??
        " ")
    );
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            name="amount"
            label="Amount"
            variant="outlined"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            name="details"
            label="Details"
            variant="outlined"
            value={form.details}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              value={form.date}
              name="date"
              onChange={handleDate}
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          <Autocomplete
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="Category"
            options={user && user.categories ? user.categories : []}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Category" />
            )}
          />
          {editTransaction.amount !== undefined && (
            <Button variant="secondary" type="submit">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button variant="contained" type="submit">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

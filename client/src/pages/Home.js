import { useState, useEffect, React } from "react";
import axios from "axios";
import TransactionForm from "../components/TransactionForm.js";
import dayjs, { Dayjs } from "dayjs";
import TransactionsList from "../components/TransactionsList.js";
import { Container } from "@mui/material";
import Cookies from "js-cookie";
import TransactionChart from "../components/TransactionChart.js";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionChart data={transactions} />
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
      <TransactionsList
        data={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}

export default Home;

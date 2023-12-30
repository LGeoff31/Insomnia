import { Box, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Form from "./components/Form";
import Display from "./components/Display";
import React, { useEffect, useState } from "react";
import Graph from "./components/Graph";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase";
import { useRouter } from "next/router";

export interface SleepEntry {
  _id: string;
  date: string;
  hours: number;
  quality: number;
  description: string;
}

export default function Home() {
  const [data, setData] = useState<SleepEntry[]>([]);
  const [user] = useAuthState(auth);
  const route = useRouter();

  const fetchData = async () => {
    const response = await fetch("/api/get", {
      method: "POST",
      body: JSON.stringify({ user_id: user?.uid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataEntry = await response.json();
    console.log(dataEntry);
    setData(dataEntry.dataEntry);
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Grid sx={{ background: "#E1F6FF" }}>
      <title>Insomnia</title>
      <Navbar />
      <Grid
        container
        direction="column"
        alignItems={"center"}
        justifyContent="center"
        gap="5rem"
        marginTop="2rem"
      >
        <Form fetchData={fetchData} />
        <Display data={data} fetchData={fetchData} />
      </Grid>
    </Grid>
  );
}

import {
  Alert,
  Box,
  Button,
  Divider,
  Hidden,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SleepEntry } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const Display = ({
  data,
  fetchData,
}: {
  data: SleepEntry[];
  fetchData: () => Promise<void>;
}) => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const handleDelete = async (id: string) => {
    setOpen(true);
    const response = await fetch(`/api/delete`, {
      method: "POST",
      body: JSON.stringify({
        id,
        user_id: user?.uid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    console.log(dataResponse);
    fetchData();
  };

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      alignItems={"center"}
      gap="3rem"
    >
      <Box
        border="2px solid #d0e8f2"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding={{ md: "2rem", xs: "1rem" }}
        sx={{ background: "#d0e8f2", boxShadow: "20" }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h3"
            fontFamily={"bold"}
            color="#008bE7"
            fontSize={{ md: "3rem", xs: "2rem" }}
          >
            &nbsp;Form Data
          </Typography>
          <Typography>Total Entires: {data?.length}</Typography>
        </Stack>
        <Divider />
        <TableContainer
          style={{ maxHeight: 425, background: "", marginTop: "1rem" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    display: { md: "table-cell", xs: "none" },
                    fontSize: "1rem",
                  }}
                >
                  Entries
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    fontWeight: "bold",
                    fontSize: "3rem",
                  }}
                >
                  📅
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    fontWeight: "bold",
                    fontSize: "3rem",
                  }}
                >
                  😴
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    fontWeight: "bold",
                    fontSize: "3rem",
                  }}
                >
                  🛏️
                </TableCell>
                <TableCell
                  sx={{
                    background: "#d0e8f2",
                    color: "#052A42",
                    fontWeight: "bold",
                    fontSize: "3rem",
                    display: { md: "table-cell", xs: "none" },
                  }}
                >
                  📙
                </TableCell>
                <TableCell
                  style={{
                    background: "#d0e8f2",
                    color: "#052A42",

                    fontSize: "1rem",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
                    Entry{" "}
                    <span style={{ fontWeight: "bold" }}>#{index + 1} </span>
                  </TableCell>

                  <TableCell sx={{ color: "#052A42", fontSize: "1rem" }}>
                    {entry.date}
                  </TableCell>
                  <TableCell sx={{ color: "#052A42", fontSize: "1rem" }}>
                    {entry.hours} Hours
                  </TableCell>
                  <TableCell sx={{ color: "#052A42", fontSize: "1rem" }}>
                    {entry.quality}/10
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#052A42",
                      fontSize: "1rem",
                      display: { md: "table-cell", xs: "none" },
                    }}
                  >
                    {entry.description}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ fontSize: { md: "1rem", xs: "0.75rem" } }}
                      onClick={() => handleDelete(entry._id)}
                    >
                      Delete
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleCloseToast}
                    >
                      <Alert
                        onClose={handleCloseToast}
                        severity="success"
                        sx={{ width: "100%" }}
                      >
                        Data Successfully Deleted!
                      </Alert>
                    </Snackbar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        width="12rem"
        height="10%"
        border="2px solid #052A42"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding="2rem"
        sx={{ background: "#faeda5", display: { md: "block", xs: "none" } }}
      >
        <Typography fontWeight="bold">Note</Typography>
        <Typography variant="body1" color="#052A42">
          Feel free to Scroll through your data when it overflows
        </Typography>
      </Box>
    </Stack>
  );
};

export default Display;

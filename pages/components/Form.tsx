import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Form = ({ fetchData }: { fetchData: () => Promise<void> }) => {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(0);
  const [quality, setQuality] = useState(0);
  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [targetSleep, setTargetSleep] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleHourChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setHours(newValue);
    }
    console.log(newValue);
  };

  const handleQualityChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue == "number") {
      setQuality(newValue);
    }
    console.log(newValue);
  };
  const handleSubmit = async (event: any) => {
    console.log("reached");
    event?.preventDefault();
    const formData = {
      date: date,
      hours: hours,
      quality: quality,
      description: description,
      user_id: user?.uid,
    };
    console.log("Form Data", formData);

    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    setOpen(true);
    console.log(dataResponse);

    fetchData();

    setDate("");
    setHours(0);
    setQuality(0);
    setDescription("");
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

  const openAlert = () => {
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };
  const handleEnter = async () => {
    setAlertOpen(false);
    console.log(targetSleep, "FINAWFKMAWNFMAWF");
    const formData = {
      targetSleep: targetSleep,
      user_id: user?.uid,
    };
    const response = await fetch("/api/createTarget", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
  };

  return (
    <Grid
      container
      direction="row"
      gap={"5rem"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        border="2px solid #d0e8f2"
        borderRadius="8px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        padding="2rem"
        sx={{ background: "#d0e8f2", boxShadow: "20" }}
      >
        <Typography variant="h2" fontFamily={"bold"} color="#008bE7">
          Insomnia
        </Typography>
        <Divider />
        <Typography color="#052A42" fontSize={{ md: "2rem", xs: "1.5rem" }}>
          Record your sleep last night!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction="column">
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: "#E1F6FF",
                width: "100%",
                marginBottom: "1rem",
                fontSize: "16px",
                color: "#052A42",
              }}
            />
            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Hours of Sleep
            </Typography>
            <Slider
              min={5}
              max={12}
              step={0.25}
              value={hours}
              onChange={handleHourChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0h" },
                { value: 3, label: "3h" },
                { value: 6, label: "6h" },
                { value: 9, label: "9h" },
                { value: 12, label: "12h" },
              ]}
            />
            <Typography variant="body1" paddingTop="1rem" color="#052A42">
              Quality of Sleep
            </Typography>

            <Slider
              min={0}
              max={10}
              value={quality}
              onChange={handleQualityChange}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: "0" },
                { value: 5, label: "5" },
                { value: 10, label: "10" },
              ]}
            />

            <Button
              sx={{ marginTop: "1rem", fontWeight: "400px" }}
              variant="contained"
              onClick={openAlert}
            >
              Set Target Sleep Goal
            </Button>
            <Dialog open={alertOpen} onClose={closeAlert}>
              <DialogTitle>Set Your Goal Number of Hours of Sleep</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  value={targetSleep}
                  onChange={(e) => setTargetSleep(parseInt(e.target.value))}
                  label="Ex. 8"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeAlert}>Cancel</Button>
                <Button onClick={handleEnter}>Enter</Button>
              </DialogActions>
            </Dialog>

            <TextField
              required
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              label="Note"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ fontWeight: "400px" }}
            >
              Submit
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
                Data Successfully Added!
              </Alert>
            </Snackbar>
          </Stack>
        </form>
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
          To view the data, click on the Analysis Page at the top!
        </Typography>
      </Box>
    </Grid>
  );
};

export default Form;

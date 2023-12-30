import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Navbar from "./components/Navbar";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("rerouting to home page");
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [user, route]);
  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{ background: "#E1F6FF" }}
        alignItems="center"
        direction="row"
        justifyContent={"center"}
        padding="2rem"
        gap="2rem"
        height="90vh"
      >
        <Box>
          <Typography variant="h2" fontFamily={"bold"} color="#008bE7">
            Insomnia
          </Typography>
          <Typography color="#052A42" fontSize="2rem" fontWeight="0">
            Record your sleep last night!
          </Typography>

          <Typography width="400px" paddingBottom="2rem">
            The best way to track your sleep wherever you are! Understand the
            correlations and factors to get better rest at night!{" "}
          </Typography>
          <Typography width="400px" paddingBottom="2rem">
            Utilizing advanced Data Visualization and powerful Algorithms, gain
            insights into your sleep quality and duration. Visualize
            correlations and trends, empowering yourself to achieve better rest.
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "#b7edf7",
              color: "#052A42",
              boxShadow: "100 100",
              textTransform: "none",
              fontWeight: "200px",
              fontSize: "1rem",
              "&:hover": {
                background: "#07d0f7",
              },
            }}
            onClick={GoogleLogin}
          >
            <FcGoogle style={{ fontSize: "1.5rem" }} /> &nbsp; Sign in with
            Google
          </Button>
        </Box>

        <Box>
          <img src={"../images/insomnia_pic.jpg"} alt="pic" width="600px" />
        </Box>
      </Grid>
      {/* <Grid
        container
        sx={{ background: "#E1F6FF" }}
        direction="row"
        // justifyContent={"center"}
        padding="7rem"
        gap="2rem"
      >
        <Stack direction="column">
          <Typography variant="h2" fontFamily={"bold"} color="#052A42">
            Try it out Now
          </Typography>
          <Typography width="400px">
            Data Visualization + Algorithms will help notify you to correlation
            between sleep duration and quality of sleep.
          </Typography>
          <Button
            variant="contained"
            onClick={GoogleLogin}
            sx={{ marginTop: "1rem", width: "100px", borderRadius: "1rem" }}
          >
            Login
          </Button>
        </Stack>
        <img src={"../images/form.jpg"} alt="pic" width="400px" />
      </Grid> */}
    </>
  );
};

export default Login;

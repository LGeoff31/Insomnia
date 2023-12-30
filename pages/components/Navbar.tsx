import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {}
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <h1>Loading...</h1>;
  if (!user) route.push("/login");
  return (
    <>
      <Box
        display="flex"
        sx={{ background: "#E1F6FF" }}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingTop="0.5rem"
        paddingBottom="0.5rem"
      >
        <Stack direction="row" alignItems={"center"} gap="1rem">
          <img
            src={"../../images/insomnia_logo.jpg"}
            alt="logo"
            width="60px"
            style={{ borderRadius: "5rem", marginLeft: "2rem" }}
          />
          <Typography
            variant="h2"
            fontSize={{ md: "3rem", sm: "2rem", xs: "1.5rem" }}
            color="#052A42"
            display={{ md: "block", xs: "none" }}
          >
            Insomnia
          </Typography>
        </Stack>
        {user && (
          <Link
            href="/"
            fontSize={{ md: "2rem", sm: "1.5rem", xs: "1.2rem" }}
            sx={{
              textDecoration: "none",
              color: "#052A42",

              padding: "1rem",
              "&:hover": {
                textDecoration: "none",
                backgroundColor: "rgba(0, 0, 0, 0.07)",
              },
            }}
          >
            Home
          </Link>
        )}
        {user && (
          <Link
            href="analysis"
            fontSize={{ md: "2rem", sm: "1.5rem", xs: "1.2rem" }}
            sx={{
              textDecoration: "none",
              padding: "1rem",
              color: "#052A42",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.07)",
              },
            }}
          >
            Analysis
          </Link>
        )}
        {!user ? (
          <Box fontSize={"2rem"} marginRight="2rem">
            <IconButton onClick={handleClick}>
              <AccountCircleIcon sx={{ fontSize: "3rem" }} />
              <ExpandMoreIcon style={{ color: "#052A42" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={GoogleLogin} href="/">
                {" "}
                <FcGoogle /> &nbsp; Sign In
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Box marginRight="2rem">
              <IconButton onClick={handleClick}>
                <img
                  src={user.photoURL || undefined}
                  alt="photo"
                  style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                />
                <ExpandMoreIcon style={{ color: "#052A42" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Box>
      <Divider sx={{ background: "grey" }} />
    </>
  );
};

export default Navbar;

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import animationData from "../../assets/login.json";
import Lottie from "react-lottie";
import useThemeContext from "../../hooks/useThemeContext";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

export default function Login() {
  const { tryLogin } = useAuthContext();
  const { mode } = useThemeContext();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", user);
    formData.append("password", password);
    tryLogin(formData).then();
  };

  return (
    <Box sx={{ height: "100%" }} className={"flexRow"} columnGap={"100px"}>
      <Box sx={{ maxWidth: "400px", height: "400px" }}>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isPaused={false}
          isStopped={false}
        />
      </Box>
      <Divider orientation="vertical" sx={{ height: "350px" }} />
      <Box sx={{ width: "300px" }} className={"flexColumn"} rowGap={"10px"}>
        <Box className={"flexRow"} columnGap={"10px"} width={"100%"}>
          <img
            src={mode === "light" ? "logo3black.png" : "logo3.png"}
            alt="logo"
            width={80}
            height={80}
          />
          <Typography variant={"h5"}>Login Fiscaliza</Typography>
        </Box>
        <TextField
          sx={{ width: "100%" }}
          label="Usuário"
          variant="outlined"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Senha"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          sx={{
            width: "100%",
            height: "50px",
            marginTop: "40px",
          }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Entrar
        </Button>
        <Box
          className={"flexRow"}
          justifyContent={"space-between"}
          sx={{ width: "98%" }}
        >
          <Typography
            variant={"body2"}
            onClick={() => (window.location.href = "register")}
            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
          >
            Registrar
          </Typography>
          <Typography
            variant={"body2"}
            onClick={() => (window.location.href = "recovery")}
            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
          >
            Esqueceu a senha?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

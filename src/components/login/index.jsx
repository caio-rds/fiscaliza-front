import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import animationData from "../../assets/login.json";
import Lottie from "react-lottie";
import useThemeContext from "../../hooks/useThemeContext";

export default function Login() {
  const { mode } = useThemeContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
        <TextField sx={{ width: "100%" }} label="Usuário" variant="outlined" />
        <TextField
          sx={{ width: "100%" }}
          label="Senha"
          variant="outlined"
          type="password"
        />

        <Button
          sx={{
            width: "100%",
            height: "50px",
            marginTop: "40px",
            background: "var(--secondary-color)",
            color: "#333",
          }}
          variant="contained"
          color="primary"
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

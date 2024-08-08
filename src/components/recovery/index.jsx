import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import animationData from "../../assets/recovery.json";
import Lottie from "react-lottie";
import useThemeContext from "../../hooks/useThemeContext";

export default function RecoveryUser() {
  const { mode } = useThemeContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const chooseRecovery = () => {
    return (
      <Box sx={{ height: "100%" }} className={"flexRow"} columnGap={"100px"}>
        <Box sx={{ width: "300px" }} className={"flexColumn"} rowGap={"10px"}>
          <Box className={"flexRow"} columnGap={"10px"} width={"100%"}>
            <img
              src={mode === "light" ? "logo3black.png" : "logo3.png"}
              alt="logo"
              width={80}
              height={80}
            />
            <Typography variant={"h5"}>Recuperar Senha</Typography>
          </Box>

          <TextField
            sx={{ width: "100%" }}
            label="Usuário"
            variant="outlined"
          />
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
          <Typography
            variant={"body2"}
            width={"100%"}
            textAlign={"left"}
            onClick={() => (window.location.href = "login")}
            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
          >
            Já tem uma conta?
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%" }} className={"flexRow"} columnGap={"100px"}>
      <Box sx={{ maxWidth: "400px", height: "300px" }}>
        <Lottie
          options={defaultOptions}
          height={300}
          width={322}
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
          <Typography variant={"h5"}>Recuperar Senha</Typography>
        </Box>
        <TextField
          sx={{ width: "100%" }}
          label="Usuário ou Email"
          variant="outlined"
        />

        <Button
          sx={{
            width: "100%",
            height: "50px",
            background: "var(--secondary-color)",
            color: "#333",
          }}
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
}

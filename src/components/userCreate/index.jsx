import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useThemeContext from "../../hooks/useThemeContext";

export default function RegisterUser() {
  const { mode } = useThemeContext();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Usuário negou a solicitação de Geolocalização.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Informações de localização não estão disponíveis.");
              break;
            case error.TIMEOUT:
              setError("A solicitação para obter a localização expirou.");
              break;
            default:
              setError("Ocorreu um erro desconhecido.");
              break;
          }
        }
      );
    } else {
      setError("Geolocalização não é suportada por este navegador.");
    }
  }, []);

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
          <Typography variant={"h5"}>Cadastre-se</Typography>
        </Box>

        <TextField
          sx={{ width: "100%" }}
          label="Usuário"
          placeholder="johndoe"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Nome Completo"
          placeholder="John Doe"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Email"
          placeholder="john_doe@email.com"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Telefone"
          placeholder="(99) 99999-9999"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Senha"
          variant="outlined"
          type="password"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Confirmar Senha"
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
          onClick={() => console.log(latitude, longitude)}
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
}

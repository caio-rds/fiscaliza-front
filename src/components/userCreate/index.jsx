import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import InputMask from "react-input-mask";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function RegisterUser() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email é obrigatório";
    } else if (!emailRegex.test(email)) {
      return "Email inválido";
    }
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial";
    }
    return "";
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    const newErrors = {};

    if (!user.username) newErrors.username = "Usuário é obrigatório";
    if (!user.name) newErrors.name = "Nome completo é obrigatório";

    const emailError = validateEmail(user.email);
    if (emailError) newErrors.email = emailError;

    if (!user.phone) newErrors.phone = "Telefone é obrigatório";

    if (!user.password) {
      newErrors.password = "Senha é obrigatória";
    } else {
      const passwordError = validatePassword(user.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Confirmar senha é obrigatório";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(serverURL + "user/", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        alert("Cadastro realizado com sucesso!");
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <Box
      sx={{ height: "100%" }}
      className={"flexRow"}
      alignItems={"flex-start"}
      columnGap={"100px"}
    >
      <Box
        sx={{ width: "300px" }}
        className={"flexColumn"}
        rowGap={"10px"}
        as="form"
      >
        <Typography variant={"h5"} sx={{ padding: "30px" }}>
          Cadastre-se
        </Typography>

        <TextField
          sx={{ width: "100%" }}
          label="Usuário"
          value={user.username}
          placeholder="johndoe"
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <TextField
          sx={{ width: "100%" }}
          label="Nome Completo"
          value={user.name}
          placeholder="John Doe"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <TextField
          sx={{ width: "100%" }}
          label="Email"
          value={user.email}
          placeholder="john_doe@email.com"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <InputMask
          mask="(99) 99999-9999"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              sx={{ width: "100%" }}
              label="Telefone"
              placeholder="(99) 99999-9999"
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone}
            />
          )}
        </InputMask>

        <TextField
          sx={{ width: "100%" }}
          label="Senha"
          value={user.password}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          sx={{ width: "100%" }}
          label="Confirmar Senha"
          value={user.confirmPassword}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />

        <Button
          sx={{
            width: "100%",
            height: "50px",
            marginTop: "40px",
          }}
          onClick={() => submit()}
          variant="contained"
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

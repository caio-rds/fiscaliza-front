import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";


export default function RegisterUser() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const submit = () => {
    console.log(user);
  }


  return (
    <Box sx={{ height: "100%" }} className={"flexRow"} alignItems={"flex-start"} columnGap={"100px"}>
      <Box sx={{ width: "300px" }} className={"flexColumn"} rowGap={"10px"}>        
        <Typography variant={"h5"} sx={{padding: '30px'}}>Cadastre-se</Typography>        

        <TextField
          sx={{ width: "100%" }}
          label="Usuário"
          value={user.username}
          placeholder="johndoe"
          variant="outlined"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Nome Completo"
          value={user.name}
          placeholder="John Doe"
          variant="outlined"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Email"
          value={user.email}
          placeholder="john_doe@email.com"
          variant="outlined"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Telefone"
          value={user.phone}
          placeholder="(99) 99999-9999"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          label="Senha"
          value={user.password}
          variant="outlined"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <TextField
          sx={{ width: "100%" }}
          label="Confirmar Senha"
          value={user.confirmPassword}
          variant="outlined"
          type="password"
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
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

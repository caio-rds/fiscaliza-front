import { Box, Button, Typography } from "@mui/material";
import animationData from "../../assets/welcome.json";
import Lottie from "react-lottie";

export default function NoLogin() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      className={"flexRow"}
    >
      <Box
        sx={{
          height: "92%",
          width: "35%",
          justifyContent: "flex-start",
          rowGap: "10px",
          marginLeft: { xs: "0", md: "15%" },
        }}
        className={"flexColumn"}
      >
        <Typography textAlign={"center"} variant={"h2"}>
          Plataforma Fiscaliza
        </Typography>
        <Typography textAlign={"center"} variant={"h4"}>
          Fiscalize a sua vizinhança
        </Typography>
        <Typography variant={"h7"} textAlign={"justify"} maxWidth={"70%"}>
          Com nossa plataforma você pode acompanhar as notícias e eventos da sua
          vizinhança, além de poder denunciar problemas de infraestrutura e
          segurança.
          <br />
          Estamos sempre trabalhando para melhorar a sua experiência e garantir
          que você tenha acesso a todas as ferramentas para engajar com a sua
          comunidade.
          <br />
          <br />
          Faça parte da nossa comunidade e ajude a construir um lugar melhor
          para todos.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "70%",
            rowGap: "2px",
            marginTop: "80px",
          }}
        >
          <Typography variant={"body2"} textAlign={"left"}>
            Não tem conta?
          </Typography>
          <Button
            sx={{
              width: "100%",
              height: "60px",
              backgroundColor: "var(--secondary-color)",
              color: "#333",
            }}
            variant={"contained"}
          >
            Crie a sua conta grátis
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "50%",
          justifyContent: "flex-start",
        }}
        className={"flexColumn"}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "var(--primary-color)",
            clipPath: "ellipse(150% 80% at 150% 30%)",
          }}
        />
        <Lottie
          options={defaultOptions}
          height={580}
          width={580}
          isPaused={false}
          isStopped={false}
        />
        <Button
          sx={{
            width: "200px",
            height: "60px",
            backgroundColor: "var(--secondary-color)",
            color: "#333",
          }}
          variant={"contained"}
        >
          Conheça Mais
        </Button>
      </Box>
    </Box>
  );
}

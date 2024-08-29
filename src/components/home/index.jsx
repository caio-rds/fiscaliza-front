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
          marginTop: "10%",
          justifyContent: "flex-start",
          rowGap: "10px",
          marginLeft: { xs: "0", md: "15%" },
          zIndex: "1",
        }}
        className={"flexColumn"}
      >
        <Typography textAlign={"center"} variant={"h3"}>
          Plataforma Fiscaliza
        </Typography>
        <Box className={"flexRow"} columnGap={'10px'}>
          <Lottie
            options={defaultOptions}
            height={420}
            width={420}
            isPaused={false}
            isStopped={false}
            isClickToPauseDisabled={true}          
          />
          <Box width={{xs: "100%", md: "70%"}} className={"flexColumn"}>
            <Typography variant={"body1"} textAlign={"justify"} maxWidth={"70%"}>
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
                marginTop: "40px",         
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
                onClick={() => window.location.href = "/register"}
                variant={"contained"}
              >
                Crie a sua conta grátis
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

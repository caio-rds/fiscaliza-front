import { Box, Button, Typography } from "@mui/material";
import animationData from "../../assets/welcome.json";
import Lottie from "react-lottie";
import useAuthContext from "../../hooks/useAuthContext";


export default function NoLogin() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },    
  };

  const { user } = useAuthContext();

  return (
    <Box
      sx={{                
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
      className={"flexRow"}
    >
      <Box
        sx={{
          height: "92%",          
          justifyContent: "flex-start",
          rowGap: "10px",          
        }}
        className={"flexColumn"}
      >
        <Typography textAlign={"center"} variant={"h3"}>
          Plataforma Fiscaliza
        </Typography>
        <Box className={"flexRow"} width={{xs: "100%", md: "70%"}} display={'flex'} justifyContent={'space-between'}>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isPaused={false}
            isStopped={false}
            isClickToPauseDisabled={true}          
          />
          
          <Typography variant={"body1"} textAlign={"left"} width={{xs: "100%", md: "50%"}} paddingRight={'20px'}>
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
        </Box>
        {
          user ? (
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
                Veja o que está acontecendo na sua vizinhança
              </Typography>
              <Button
                sx={{
                  width: "100%",
                  height: "60px"
                }}
                onClick={() => window.location.href = "/reports"}
                variant={"contained"}
              >
                Ver Ocorrências
              </Button>
            </Box>
          ) : (
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
                height: "60px"
              }}
              onClick={() => window.location.href = "/register"}
              variant={"contained"}
            >
              Crie a sua conta grátis
            </Button>
          </Box>
          )
        }

      </Box>
    </Box>
  );
}

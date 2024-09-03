import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const infos = [
    {
        title: "O que é Fiscaliza?",
        content: "O projeto Fiscaliza foi criado com o intuito de facilitar a comunicação entre a população e os órgãos responsáveis pela manutenção da cidade. A ideia é que qualquer cidadão possa reportar problemas de infraestrutura, como buracos, lâmpadas queimadas, vazamentos de água, entre outros. Além disso, o projeto visa incentivar a participação da população na manutenção da cidade, promovendo um ambiente mais limpo e seguro para todos."        
    },
    {
        title: "Como funciona o Fiscaliza?",
        content: "O Fiscaliza é um projeto de código aberto, desenvolvido por voluntários e mantido pela comunidade. Se você é desenvolvedor e gostaria de contribuir com o projeto, fique à vontade para acessar o repositório no GitHub e enviar suas sugestões e melhorias."
    },
    {
        title: "Time de Desenvolvimento",
        content: 
        <Box>
            <Typography variant="body1">Conheça os membros do time:</Typography>
            <Box>
                <Typography variant="body1">Caio Reis - Desenvolvedor FullStack</Typography>
                <Typography variant="body1">Michel Felipe - Desenvolvedor Front-End</Typography>
            </Box>
        </Box>
    },
    {
        title: "Agradecimentos",
        content: "Gostaria de agradecer ao João Henrique e Michel Felipe por sempre estarem dispostos a ajudar e a contribuir com o projeto de maneira direta ou indireta. Sem eles, o Fiscaliza não seria possível." 
    }
];

export default function AboutUs() {
    const [expanded, setExpanded] = useState(null);

  const handleChange = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };
    return (
        <Box>
            <Typography variant="h3">Sobre Nós</Typography>        
            {
                infos.map((info, index) => (           
                    <Accordion disableGutters key={index} expanded={expanded === index} onChange={handleChange(index)}>
                        <AccordionSummary key={index} expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                            <Typography variant="h5">{info.title}</Typography>                                
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1">{info.content}</Typography>
                        </AccordionDetails>
                    </Accordion>                 
                ))
            }            
        </Box>
    );
}
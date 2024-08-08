import { Box, FormControl, MenuItem, Select, Button, InputLabel, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";


const districts = [
  "Centro",
  "Botafogo",
  "Copacabana",
  "Ipanema",
  "Leblon",
  "Flamengo",
  "Laranjeiras",
  "Catete",
  "Glória",
  "Lapa",
  "Santa Teresa",
  "Tijuca",
  "Vila Isabel",
  "Grajaú",
  "Méier",
  "Engenho de Dentro",
  "Madureira",
  "Oswaldo Cruz",
  "Campo Grande",
  "Santa Cruz",
  "Barra da Tijuca",
  "Recreio dos Bandeirantes",
  "Jacarepaguá",
  "São Conrado",
  "Gávea",
  "Jardim Botânico",
  "Leme",
  "Urca",
  "São Cristóvão",
  "Benfica",
  "Maracanã",
  "Praça da Bandeira",
  "Rio Comprido",
  "Vila Valqueire",
  "Realengo",
  "Bangu",
  "Paciência",
  "Senador Camará",
  "Guaratiba",
  "Paquetá",
  "Ilha do Governador",
  "Penha",
  "Brás de Pina",
  "Olaria",
  "Bonsucesso",
  "Ramos",
  "Vigário Geral",
  "Parada de Lucas",
  "Caju"
]



export default function ReportRegister() {
  const [typeReport, setTypeReport] = useState("");

  const handleChange = (event) => {
    setTypeReport(event.target.value);
  };

  return (
    <Box sx={{ width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '60px'}}>  
      <Box sx={{width: {xs: '90%', md: '30%'}, display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
        <FormControl sx={{ display: 'flex', rowGap: '10px', flexDirection: 'column' }}>
          <InputLabel id="type-report-label" htmlFor="type-report-label">Tipo de Ocorrência</InputLabel>
          <Select
            labelId="type-report-label"
            id="type-report"
            value={typeReport}
            label="Tipo de Ocorrência"
            onChange={handleChange}          
          >
            <MenuItem value={10}>Acidente</MenuItem>
            <MenuItem value={20}>Incêndio</MenuItem>
            <MenuItem value={30}>Assalto</MenuItem>
            <MenuItem value={40}>Outro</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Descrição"
          multiline
          rows={4}
          fullWidth
          placeholder="Descreva a ocorrência"
        />
          <Box textAlign={'left'} className={'flexRow'} justifyContent={'flex-start'}>
            <FormLabel id="anonymous-report-label" sx={{marginLeft: '2px'}}>Relato Anônimo</FormLabel>
            <RadioGroup
              aria-labelledby="anonymous-report-label"
              defaultValue="false"
              name="radio-buttons-group"
              sx={{ display: 'flex', flexDirection: 'row', padding: '10px' }}
            >
                <FormControlLabel value="false" control={<Radio />} label="Sim" /> 
                <FormControlLabel value="true" control={<Radio />} label="Não" />
            </RadioGroup>
          </Box>
          <Box className={'flexRow'} columnGap={'10px'}>
            <TextField sx={{width: '90%'}} id="outlined-basic" label="Rua"/>
            <TextField id="outlined-basic" label="Número"/>          
          </Box>
          <FormControl>
            <InputLabel id="district-label" htmlFor="district">Bairro</InputLabel>
            <Select
              labelId="district-label"
              id="district"
              label="Bairro"
            >
              {districts.sort().map((district) => (
                <MenuItem key={district} value={district}>{district}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className={'flexRow'} columnGap={'10px'} sx={{width: '100%'}}>
            <Button variant="contained" color="primary" fullWidth>Enviar</Button>
            <Button variant="contained" color="secondary" fullWidth>Cancelar</Button>
          </Box>          
      </Box>    
    </Box>    
  );
}

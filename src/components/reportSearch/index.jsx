import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SearchReport({id_report}) {
    const [id, setId] = useState(id_report);

    return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center" sx={{padding: '10px 0'}} columnGap={'10px'}>
            <TextField label="Procurar Report" value={id} type="number" variant="outlined" sx={{width: '300px'}} inputProps={{ min: 0 }} />
            <Button variant="outlined" startIcon={<SearchIcon />} sx={{height: '55px', borderColor: 'var(--secondary-color)'}} onClick={() => setId(id)}>Pesquisar</Button>
        </Box>
    );
}

SearchReport.propTypes = {
    id_report: PropTypes.number,
};
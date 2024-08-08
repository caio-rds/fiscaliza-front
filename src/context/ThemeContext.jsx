import { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme === 'dark') {
            setMode(localTheme);
        }
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: {
                main: '#556cd6',
            },
            secondary: {
                main: '#19857b',
            },
            error: {
                main: '#f44336',
            },
        },
        components: {            
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: mode === 'light' ? '#333' : '#fff',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        // background: 'transparent',
                        boxShadow: 'none',
                    },
                },
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        background: 'transparent',
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === 'light' ? 'rgba(150,150,150, 0.5)' : '',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {                        
                        '&:hover': {
                            outline: mode === 'light' ? 'var(--primary-color)' : '',
                        },                        
                    }
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--secondary-color-light)', // Cor quando passa o mouse
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: mode === 'light' ? '#999' : 'var(--secondary-color)', // Cor quando focado
                        },   
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: mode === 'light' ? '#666' : 'var(--secondary-color)', // Cor do label quando focado
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input': {
                            color: mode === 'light' ? '#333' : '#fff', // Cor do texto do input quando focado
                        },   
                        '&:-webkit-autofill': {
                            WebkitBoxShadow: '0 0 0 1000px white inset', // Remove o fundo amarelo do autocomplete
                            WebkitTextFillColor: 'inherit', // Mantém a cor do texto                            
                        },                  
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === 'light' ? '#fff' : '#333',
                        color: mode === 'light' ? '#333' : '#fff',
                        borderColor: mode === 'light' ? 'rgba(150,150,150, 0.75)' : '',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    root: {
                        minWidth: '350px',
                    }
                },
            },
            MuiDataGrid: {
                styleOverrides: {
                    sortIcon: {
                        color: mode === 'light' ? '#333' : '#fff',
                    },
                    root: {
                        boxShadow: mode === 'light' ? '5px 5px 10px rgba(0,0,0,0.1)' : '',
                        border: mode === 'light' ? '1px solid rgba(125,125,125, 0.5)' : '',
                        '& .MuiDataGrid-cell': {
                            textAlign: 'center'                            
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: mode === 'light' ? '#f5f5f5' : '#444',
                            color: mode === 'light' ? '#333' : '#fff',                      
                        }                        
                    },
                },
            },
        }
    }), [mode]);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;

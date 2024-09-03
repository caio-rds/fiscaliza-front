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
            MuiSelect: {
                styleOverrides: {
                    root: {
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary-color)', // Cor quando passa o mouse
                        },
                    }
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
                        background: mode === "light" ? "#CDCDCD" : "#19181D",
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
                            // background: 'var(--secondary-color)',
                            outline: mode === 'light' ? 'var(--primary-color)' : '',
                           
                        },                        
                    }
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--primary-color)', // Cor quando passa o mouse
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: mode === 'light' ? '#999' : 'var(--primary-color)', // Cor quando focado
                        },   
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: mode === 'light' ? '#666' : 'var(--primary-color)', // Cor do label quando focado
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input': {
                            color: mode === 'light' ? '#333' : '#fff', // Cor do texto do input quando focado
                        },   
                        '&:-webkit-autofill-active': {
                            WebkitBoxShadow: '0 0 0 30px #f7f7f7 inset',
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
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        border: '1px solid rgba(0, 0, 0, .125)',
                        '&:not(:last-child)': {
                            borderBottom: 0,
                        },
                        '&::before': {
                            display: 'none',
                        },
                    }
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, .03)',
                        flexDirection: 'row-reverse',
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                            transform: 'rotate(90deg)',
                        },
                        '& .MuiAccordionSummary-content': {
                            marginLeft: "10px",
                        },
                    }
                }
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'rgba(0, 0, 0, .02)',
                        padding: '16px',
                        borderTop: '1px solid rgba(0, 0, 0, .125)',
                    }
                }
            },                     
        },
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

import { Box } from "@mui/material";
import useThemeContext from "../../hooks/useThemeContext";
import PropTypes from "prop-types";

export default function Main({ children }) {
  const { mode } = useThemeContext();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: mode === "light" ? "#fff" : "#333",
      }}
      className={"flexColumn"}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}


Main.propTypes = {
  children: PropTypes.node.isRequired,
};
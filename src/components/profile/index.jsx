import { Avatar, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

let mockUser = {
  name: "John Doe",
  email: "john_doe@email.com",
  phone: "(21) 99999-9999",
  username: "johndoe",
  address: "Rua dos Bobos, 0",
};

export default function MyProfile() {
  const [user, setUser] = useState(mockUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const cardStatic = () => {
    return (
      <Card variant="outlined" sx={{ maxWidth: 360 }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              $4.50
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the
            park or just down the hall.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Select type
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip color="primary" label="Soft" size="small" />
            <Chip label="Medium" size="small" />
            <Chip label="Hard" size="small" />
          </Stack>
        </Box>
      </Card>
    );
  };

  return (
    <Box
      sx={{ height: "100%", width: "100%" }}
      className={"flexRow"}
      columnGap={"20px"}
    >
      <Box className={"flexColumn"} rowGap={"10px"}>
        <Avatar sx={{ width: "200px", height: "200px" }} />
        <Typography variant={"h4"}>{user.username}</Typography>
        <Box className={"flexColumn"} rowGap={"10px"}>
          {Object.keys(user).map(
            (key, index) =>
              key !== "username" && (
                <TextField
                  key={index}
                  label={key}
                  name={key}
                  value={user[key]}
                  onChange={handleChange}
                  variant="outlined"
                />
              )
          )}
        </Box>
      </Box>
      <Box>
        {cardStatic()}
        {cardStatic()}
        {cardStatic()}
      </Box>
    </Box>
  );
}

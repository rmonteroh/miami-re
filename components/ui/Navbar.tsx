import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { Box } from "@mui/system";
import { HelpCenter } from "@mui/icons-material";

export const NavBar = () => {
  return (
    <AppBar position='static'>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', alignItems:'center'}}>
          <IconButton style={{ color: "white" }}>
            <MenuOutlined />
          </IconButton>
          <Typography variant='h6'component="div" >Miami RE</Typography>
        </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {}}
            color="inherit"
          >
            <HelpCenter />
          </IconButton>
      </Toolbar>
    </AppBar>
  );
};

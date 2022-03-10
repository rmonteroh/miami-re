import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuOutlined from '@mui/icons-material/MenuOutlined'

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton style={{color: 'white'}}>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6">Miami RE</Typography>
      </Toolbar>
    </AppBar>
  )
}
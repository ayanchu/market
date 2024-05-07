import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '../style/Header.css'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/CheckAuth';
import { useSelector } from 'react-redux';




function Header() {
    const {checkAuth, setCheckAuth} = useContext(AuthContext)
    const {cartTotalQuantity} = useSelector(state => state.cart)

    const settings = [
    {
        text: 'Profile',
        id: 1,
        action: () => {
            navigate('/profile')
        }
    },
    {
        text: 'Logout',
        id: 2,
        action: () => {
            setCheckAuth(true)
            navigate('/login')
        }
    }
    ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const naviateToBasket = () => {
    navigate('/busket')
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" id='header'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
                MARKET
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MARKET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <ShoppingBasketIcon onClick={naviateToBasket}/>
            <Typography>{cartTotalQuantity}</Typography>
            <Tooltip title="Open settings">
              {/*<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
              {/*  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
              {/*</IconButton>*/}
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={setting.action}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
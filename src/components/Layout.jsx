import React from 'react';
import { AppBar, Toolbar, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Menu as MenuIcon, Language as LanguageIcon } from '@mui/icons-material';

const Layout = ({ children }) => {
  const t = useTranslations('Navigation');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const menuItems = ['Home', 'About', 'Portfolio', 'ContactUs'];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className="flex h-screen">
      <AppBar position="fixed" className="z-50">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="lg:hidden"
          >
            <MenuIcon />
          </IconButton>
          <div className="flex-grow flex justify-center space-x-4">
            {menuItems.map((item) => (
              <Button key={item} color="inherit" component={Link} href={`/${item.toLowerCase()}`}>
                {t(item)}
              </Button>
            ))}
          </div>
          <Button color="inherit" startIcon={<LanguageIcon />}>
            {t('ChangeLanguage')}
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="w-64">
          {menuItems.map((item) => (
            <ListItem button key={item} component={Link} href={`/${item.toLowerCase()}`}>
              <ListItemText primary={t(item)} />
            </ListItem>
          ))}
          <ListItem button>
            <ListItemText primary={t('ChangeLanguage')} />
          </ListItem>
        </List>
      </Drawer>

      <main className="flex-grow p-4 mt-16">{children}</main>
    </div>
  );
};

export default Layout;
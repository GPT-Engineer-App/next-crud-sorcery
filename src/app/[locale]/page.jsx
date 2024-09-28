"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function HomePage() {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = () => {
    const nextLocale = pathname.startsWith('/en') ? 'ar' : 'en';
    router.push(`/${nextLocale}${pathname.substring(3)}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              t("home"),
              t("about"),
              t("portfolio"),
              t("services"),
              t("contact"),
            ].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button onClick={changeLanguage}>
              <ListItemText primary={t('language')} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            {[
              t("home"),
              t("about"),
              t("portfolio"),
              t("services"),
              t("contact"),
            ].map((text) => (
              <Button color="inherit" key={text} sx={{ marginRight: 2 }}>
                {text}
              </Button>
            ))}
            <Button color="inherit" onClick={changeLanguage}>
              {t('language')}
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Box
          className="text-[48px]"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
          }}
        >
          <Typography variant="h1" component="h2">
            {t('hello')}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
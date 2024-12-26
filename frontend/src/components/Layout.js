import React from "react";
import { Box, CssBaseline, Container, AppBar, Toolbar, Typography } from "@mui/material";

function Layout({ children }) {
    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        My Document Processing App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: 4, marginBottom: 4 }}>
                {children}
            </Container>
            <Box component="footer" sx={{ p: 2, backgroundColor: "#f5f5f5", textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    © 2024 My App. All Rights Reserved.
                </Typography>
            </Box>
        </>
    );
}

export default Layout;

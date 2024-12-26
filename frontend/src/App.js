import React from "react";
import Layout from "./components/Layout";
import FileUpload from "./components/FileUpload";
import ChatBox from "./components/ChatBox";
import { Box, Typography } from "@mui/material";

function App() {
    return (
        <Layout>
            <Box sx={{ textAlign: "center", marginBottom: 4 }}>
                <Typography variant="h2" gutterBottom>
                    Document Processing and Chat
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Upload your documents and interact with the chatbot for insights.
                </Typography>
            </Box>
            <FileUpload />
            <ChatBox />
        </Layout>
    );
}

export default App;

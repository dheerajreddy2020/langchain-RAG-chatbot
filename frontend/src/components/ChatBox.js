import React, { useState } from "react";
import { askChatbot } from "../api";
import { Box, TextField, Button, Typography, CircularProgress, Alert } from "@mui/material";

function ChatBox() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChat = async () => {
        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const response = await askChatbot(question);
            setAnswer(response.answer);
        } catch (err) {
            setError("Failed to get a response from the chatbot.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: "auto",
                textAlign: "center",
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "white",
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Chat with the Bot
            </Typography>
            <TextField
                fullWidth
                label="Ask a question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                variant="outlined"
                sx={{ marginBottom: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleChat}
                disabled={loading}
                sx={{ width: "100%", marginBottom: 2 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Ask"}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            {answer && (
                <Box
                    sx={{
                        marginTop: 2,
                        padding: 2,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <Typography variant="h6">Answer:</Typography>
                    <Typography>{answer}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default ChatBox;

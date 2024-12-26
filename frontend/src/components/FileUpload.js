import React, { useState } from "react";
import { uploadDocuments } from "../api";
import { Box, Button, Typography, TextField, Alert, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function FileUpload() {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
        setMessage(""); // Clear any existing messages when new files are selected
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage("Please select at least one file to upload.");
            return;
        }

        setLoading(true); // Show loader
        try {
            const response = await uploadDocuments(files);
            setMessage(response.message || "Files uploaded successfully!");
        } catch (error) {
            setMessage("Failed to upload files: " + error.message);
        } finally {
            setLoading(false); // Hide loader
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
                Upload Documents
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    type="file"
                    inputProps={{ multiple: true }}
                    onChange={handleFileChange}
                    fullWidth
                    variant="outlined"
                    helperText="Select one or more files to upload"
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={handleUpload}
                disabled={loading}
                sx={{ width: "100%", marginBottom: 2 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
            </Button>
            {message && (
                <Alert severity={message.includes("Failed") ? "error" : "success"}>
                    {message}
                </Alert>
            )}
        </Box>
    );
}

export default FileUpload;

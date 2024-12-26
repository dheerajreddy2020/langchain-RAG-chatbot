const API_BASE_URL = "http://localhost:8000";

export async function uploadDocuments(files) {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    const response = await fetch(`${API_BASE_URL}/upload-documents`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload documents");
    }

    return response.json();
}

export async function askChatbot(question) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
    });

    if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
    }

    return response.json();
}

from fastapi import APIRouter, HTTPException, UploadFile
from typing import List
from app.chatbot import process_documents, get_qa_chain
from pydantic import BaseModel
import os


router = APIRouter()

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Define request and response models
class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

@router.post("/upload-documents")
async def upload_documents(files: List[UploadFile]):
    """Save uploaded files locally and process them."""
    saved_files = []
    
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        saved_files.append(file_path)
    
    # Call the process_documents function after saving files
    process_documents(saved_files)

    return {"message": "Files uploaded and processed successfully."}


@router.post("/chat", response_model=QueryResponse)
def chat(query: QueryRequest):
    """API endpoint to interact with the chatbot."""
    try:
        qa_chain = get_qa_chain()
        response = qa_chain.invoke(query.question)
        return QueryResponse(answer=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
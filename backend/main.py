from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router  # Import your router module

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update to match your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include API routes
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

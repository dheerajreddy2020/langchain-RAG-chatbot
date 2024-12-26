# from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader,TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain import hub
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from mimetypes import guess_type
from dotenv import load_dotenv
load_dotenv()


# from langchain.text_splitter import CharacterTextSplitter
import os

# Set up OpenAI API Key
# os.environ["OPENAI_API_KEY"] = "your-openai-api-key"

# Initialize vector store and embeddings
vectorstore = None
embeddings = OpenAIEmbeddings()

# Define a prompt template
prompt_template = PromptTemplate(
    input_variables=["context", "question"],
    template="""
    You are an intelligent assistant. Use the following context to answer the user's question accurately:

    Context: {context}

    Question: {question}

    Answer: """
)


def process_documents(file_paths):
    print(file_paths)
    """Processes and updates the vector store with new documents."""
    global vectorstore
    documents = []
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

    for file_path in file_paths:
        print(f"Processing file: {file_path}")
        
        try:
            loader = PyPDFLoader(file_path) if file_path.endswith(".pdf") else TextLoader(file_path)
            documents.extend(loader.load())
        except Exception as e:
            print(f"Error processing file {file_path}: {e}")
            continue

    docs = text_splitter.split_documents(documents)

    # Create or update vector store
    if vectorstore is None:
        vectorstore = FAISS.from_documents(docs, embeddings)
    else:
        vectorstore.add_documents(docs)
    print(vectorstore.index.ntotal)


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


def get_qa_chain():
    """Creates and returns a RetrievalQA chain."""
    if vectorstore is None:
        raise ValueError("Vector store is not initialized. Upload documents first.")
    prompt = hub.pull("rlm/rag-prompt")
    retriever = vectorstore.as_retriever()
    qa_chain = (
                    {
                        "context": retriever | format_docs,
                        "question": RunnablePassthrough(),
                    }
                    | prompt
                    | ChatOpenAI()
                    | StrOutputParser()
                )

    return qa_chain

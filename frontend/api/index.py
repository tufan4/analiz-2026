
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add local backend_core directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend_core'))

try:
    from main import app as backend_app
except ImportError as e:
    # Print error to Vercel logs
    print(f"Error importing backend: {e}")
    backend_app = FastAPI()
    
    @backend_app.get("/api/{path:path}")
    def fallback(path: str):
        return {"error": f"Backend load failed: {str(e)}", "path": path}

app = backend_app

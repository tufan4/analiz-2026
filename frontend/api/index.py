
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add backend directory to path so we can import engine/scraper
# In Vercel, the root is usually where package.json is, or accessible via ".."
sys.path.append(os.path.join(os.path.dirname(__file__), '../../backend'))

try:
    from main import app as backend_app
except ImportError:
    # Fallback/Mock for build time if paths are messed up
    backend_app = FastAPI()

app = backend_app

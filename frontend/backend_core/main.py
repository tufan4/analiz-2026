
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from engine import AnalysisEngine
from scraper import MatchScraper
import uvicorn
import pandas as pd

app = FastAPI(title="Otonom Bahis Analiz Ekosistemi")

# CORS setup for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = AnalysisEngine()
scraper = MatchScraper()

# Initialize engine on startup (or lazy load)
@app.on_event("startup")
def startup_event():
    engine.initialize()

@app.get("/")
def read_root():
    return {"status": "Active", "system": "Autonomous Betting Agent v1.0"}

@app.get("/api/dashboard")
def get_dashboard_data():
    """
    Returns data for the main dashboard: 
    - Current best algorithm
    - System accuracy
    - Upcoming matches
    """
    if not engine.best_algorithm:
        return {"status": "Training..."}
        
    return {
        "golden_algorithm": engine.best_algorithm.name,
        "system_accuracy": f"{engine.best_algorithm.accuracy * 100:.1f}%",
        "algorithms_tested": len(engine.algorithms),
        "data_points": len(engine.historical_data) if engine.historical_data is not None else 0
    }

@app.get("/api/matches")
async def get_upcoming_matches():
    matches = scraper.get_upcoming_matches()
    return matches

@app.get("/api/analyze/{match_id}")
async def analyze_match(match_id: str):
    # Retrieve match details (mocked for now based on ID or generated)
    # In real app, fetch match details from scraper cache
    matches = scraper.get_upcoming_matches()
    target_match = next((m for m in matches if m["id"] == match_id), None)
    
    if not target_match:
        # Fallback if not found in upcoming, just create a dummy one for demo
        target_match = {"home_team": "Galatasaray", "away_team": "Fenerbahce", "date": "2024-05-19"}
    
    analysis = engine.analyze_match(target_match)
    return analysis

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

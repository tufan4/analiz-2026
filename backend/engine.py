
from algorithms import get_all_algorithms
from scraper import MatchScraper
import pandas as pd

class AnalysisEngine:
    def __init__(self):
        self.algorithms = get_all_algorithms()
        self.scraper = MatchScraper()
        self.historical_data = None
        self.best_algorithm = None

    def initialize(self):
        print("Initializing Engine...")
        self.historical_data = self.scraper.scrape_recent_matches()
        self.train_models()
        self.evaluate_models()

    def train_models(self):
        print(f"Training {len(self.algorithms)} algorithms on {len(self.historical_data)} matches...")
        for algo in self.algorithms:
            algo.train(self.historical_data)

    def evaluate_models(self):
        print("Evaluating models (Backtesting)...")
        # Split data into "past" and "recent" for testing
        test_size = int(len(self.historical_data) * 0.2)
        test_data = self.historical_data.tail(test_size)
        
        results = {}
        for algo in self.algorithms:
            correct = 0
            total = 0
            for _, match in test_data.iterrows():
                pred = algo.predict(match)
                if pred['prediction'] == match['result']:
                    correct += 1
                total += 1
            
            acc = correct / total if total > 0 else 0
            algo.accuracy = acc
            results[algo.name] = acc
            # print(f"{algo.name}: {acc*100:.1f}%")

        # Select Golden Algorithm
        self.best_algorithm = max(self.algorithms, key=lambda a: a.accuracy)
        print(f"Golden Algorithm Selected: {self.best_algorithm.name} with {self.best_algorithm.accuracy*100:.1f}% Accuracy")

    def analyze_match(self, match_info):
        """
        Runs the Golden Algorithm (and others for comparison) on a new match.
        """
        if not self.best_algorithm:
            self.initialize()

        # Get Golden prediction
        golden_pred = self.best_algorithm.predict(match_info)
        
        # Get others for consensus
        other_preds = []
        for algo in self.algorithms:
            if algo != self.best_algorithm:
                p = algo.predict(match_info)
                other_preds.append({
                    "algorithm": algo.name,
                    "prediction": p['prediction'],
                    "confidence": p['confidence'],
                    "details": p['details'],
                    "accuracy": algo.accuracy
                })
        
        return {
            "golden_algorithm": {
                "name": self.best_algorithm.name,
                "accuracy": self.best_algorithm.accuracy,
                "prediction": golden_pred,
            },
            "all_predictions": other_preds
        }

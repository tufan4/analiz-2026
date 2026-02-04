
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Trophy, AlertTriangle, TrendingUp } from "lucide-react"

interface PredictionCardProps {
    match: any
    prediction: any
}

export function PredictionCard({ match, prediction }: PredictionCardProps) {
    const golden = prediction.golden_algorithm
    const predValue = golden.prediction.prediction
    const confidence = golden.prediction.confidence

    return (
        <Card className="w-full bg-slate-900 border-slate-800 text-slate-100 mb-4 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                    Match Analysis
                </CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold">{match.home_team} vs {match.away_team}</div>
                    <Badge variant={confidence > 0.8 ? "default" : "destructive"} className={confidence > 0.8 ? "bg-green-600" : "bg-yellow-600"}>
                        {(confidence * 100).toFixed(1)}% Confidence
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Prediction</div>
                        <div className="text-3xl font-bold text-white">
                            {predValue === "1" ? "HOME WIN" : predValue === "2" ? "AWAY WIN" : "DRAW"}
                        </div>
                        <div className="text-xs text-slate-500 mt-2">
                            Based on {golden.name}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg col-span-2">
                        <div className="text-sm text-slate-400 mb-1">AI Reasoning</div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {golden.prediction.details}
                        </p>
                        <div className="mt-4 flex gap-2">
                            {prediction.all_predictions.slice(0, 3).map((algo: any, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs bg-slate-900 border-slate-700">
                                    {algo.algorithm}: {algo.prediction}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

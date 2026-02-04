
"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionCard } from "@/components/prediction-card";
import { Activity, Server, Zap, Database, RefreshCw, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Fetch initial dashboard status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const data = await res.json();
        setDashboardData(data);

        const matchesRes = await fetch('/api/matches');
        const matchesData = await matchesRes.json();
        setMatches(matchesData);

        // Auto-analyze first match for demo
        if (matchesData.length > 0) {
          analyzeMatch(matchesData[0].id);
        }
      } catch (e) {
        console.error("Backend connection failed", e);
      }
    };
    fetchData();
  }, []);

  const analyzeMatch = async (matchId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analyze/${matchId}`);
      const data = await res.json();
      setPredictions((prev: any) => ({ ...prev, [matchId]: data }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data for visual
  const chartData = [
    { name: 'Mon', score: 70 },
    { name: 'Tue', score: 75 },
    { name: 'Wed', score: 72 },
    { name: 'Thu', score: 82 },
    { name: 'Fri', score: 85 },
    { name: 'Sat', score: 80 },
    { name: 'Sun', score: 88 },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="mb-12 flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            OTONOM BAHİS AJANI
          </h1>
          <p className="text-slate-400 mt-2">Vibe-Coding Analysis Ecosystem v1.0</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 uppercase">System Status</span>
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              ONLINE
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Golden Algorithm</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dashboardData?.golden_algorithm || "Initializing..."}</div>
            <p className="text-xs text-slate-500">Currently best performing</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Accuracy</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dashboardData?.system_accuracy || "--%"}</div>
            <p className="text-xs text-slate-500">Last 5 weeks backtest</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Data Points</CardTitle>
            <Database className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dashboardData?.data_points || "0"}</div>
            <p className="text-xs text-slate-500">Matches analyzed</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Agents</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{dashboardData?.algorithms_tested || "20"}</div>
            <p className="text-xs text-slate-500">Algorithms competing</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" /> Live Analysis
          </h2>

          {matches.map(match => (
            <div key={match.id} className="relative">
              {predictions[match.id] ? (
                <PredictionCard match={match} prediction={predictions[match.id]} />
              ) : (
                <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold">{match.home_team} vs {match.away_team}</span>
                    <div className="text-xs text-slate-500">{match.date}</div>
                  </div>
                  <button
                    onClick={() => analyzeMatch(match.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                  >
                    Analyze Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" /> Performance Trend
          </h2>
          <div className="h-[300px] w-full bg-slate-900 rounded-lg border border-slate-800 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                  itemStyle={{ color: '#cbd5e1' }}
                />
                <Area type="monotone" dataKey="score" stroke="#8884d8" fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <h3 className="font-semibold text-slate-300 mb-2">System Logs</h3>
            <div className="space-y-2 text-xs text-slate-500 font-mono h-48 overflow-auto">
              <div>[20:24:12] Initializing Scraper...</div>
              <div>[20:24:14] Connected to macsonuclari1.net</div>
              <div>[20:24:15] Retrieved 50 historical matches</div>
              <div>[20:24:16] Training Random Forest... [OK]</div>
              <div>[20:24:17] Training XGBoost... [OK]</div>
              <div>[20:24:19] Golden Algorithm selected: {dashboardData?.golden_algorithm || "Pending"}</div>
              <div className="text-green-500">[20:24:20] System Ready</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

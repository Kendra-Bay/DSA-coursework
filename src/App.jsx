import MetricsCards from "./components/MetricsCards"
import TrafficPanel from "./components/TrafficPanel"
import ThreatPanel from "./components/ThreatPanel"
import TreeVisualizer from "./components/TreeVisualizer"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-4xl font-bold text-green-400 mb-6">
        IDS/IPS Red-Black Tree Dashboard
      </h1>

      <MetricsCards />

      <div className="grid grid-cols-3 gap-4 mt-6">

        <TrafficPanel />

        <TreeVisualizer />

        <ThreatPanel />

      </div>

    </div>
  )
}
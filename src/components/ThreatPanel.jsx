import { useEffect, useState } from "react"

const attackTypes = [
  "Possible DoS Attack",
  "Port Scan Detected",
  "Suspicious Session",
  "Exfiltration Attempt",
]

export default function ThreatPanel() {

  const [threats, setThreats] = useState([])

  useEffect(() => {

    const interval = setInterval(() => {

      const chance = Math.random()

      if (chance > 0.7) {

        const randomThreat =
          attackTypes[Math.floor(Math.random() * attackTypes.length)]

        setThreats(prev => [
          `${randomThreat} - ${new Date().toLocaleTimeString()}`,
          ...prev.slice(0, 5)
        ])
      }

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-red-500 h-[500px]">

      <h2 className="text-2xl text-red-400 mb-4">
        Threat Alerts
      </h2>

      <div className="space-y-3">

        {threats.map((threat, index) => (
          <div
            key={index}
            className="bg-black p-3 rounded-lg border border-red-500 animate-pulse"
          >
            {threat}
          </div>
        ))}

      </div>

    </div>
  )
}
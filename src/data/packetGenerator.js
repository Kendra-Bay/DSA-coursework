const protocols = ["TCP", "UDP", "HTTP", "HTTPS"]

function randomIP() {
  return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`
}

export function generatePacket() {

  const attackChance = Math.random()

  let packetCount =
    attackChance > 0.9
      ? Math.floor(Math.random() * 50000)
      : Math.floor(Math.random() * 500)

  return {
    sourceIP: randomIP(),
    destinationIP: randomIP(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    packetCount,
    timestamp: new Date().toLocaleTimeString(),
  }
}
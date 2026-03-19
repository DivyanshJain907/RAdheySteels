import { ParticleTextEffect } from "@/components/ui"

interface DemoProps {
  customWords?: string[]
  width?: number
  height?: number
}

export function ParticleTextDemo({ 
  customWords = ["RADHEY", "RAMAN", "STEELS", "SINCE", "1979"],
  width = 1000,
  height = 500
}: DemoProps) {
  return <ParticleTextEffect words={customWords} width={width} height={height} />
}

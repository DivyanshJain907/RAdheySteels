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
  return <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
    <h1 className="text-4xl font-bold text-white">Demo Component</h1>
  </div>
}

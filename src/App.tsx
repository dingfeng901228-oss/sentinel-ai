import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import "./index.css"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sora antialiased">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function App() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Mood Boost App
          </h1>
        </header>

        {/* Main Content Card */}
        <Card className="p-6 md:p-8 mb-8 bg-card shadow-lg">
          {/* Coolness Bar */}
          <div className="mb-8">
            <div className="mb-2">
              <span className="text-sm font-medium text-muted-foreground">Your Coolness Level</span>
            </div>
            <div id="coolness-bar" className="relative">
              <Progress 
                value={0} 
                className="h-6 bg-muted border-2 border-border rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">Let's get started!</span>
              </div>
            </div>
          </div>

          {/* Character Section */}
          <div className="flex flex-col items-center mb-8">
            <div id="cartoon-character" className="relative mb-4">
              {/* Character Placeholder */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-full border-4 border-primary-foreground shadow-lg flex items-center justify-center animate-bounce-slow">
                <div className="text-6xl md:text-7xl">😊</div>
              </div>

              {/* Speech Bubble */}
              <div className="absolute -top-4 -right-8 md:-right-12 bg-card border-2 border-border rounded-2xl p-4 max-w-xs md:max-w-sm shadow-lg">
                <p className="text-sm md:text-base text-card-foreground leading-relaxed">
                  Hi, beautiful person! I see you're having a bad day! I'll try to make it better for you. 
                  All you need to do is answer a few simple questions. ✨
                </p>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-border transform translate-y-2"></div>
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-7 border-l-transparent border-r-7 border-r-transparent border-t-7 border-t-card transform translate-y-1 ml-0.5"></div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div id="chat-window" className="bg-muted rounded-xl p-6 border-2 border-border min-h-48">
            <p className="text-muted-foreground text-center text-lg">
              Interactive questions will go here
            </p>
          </div>
        </Card>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-muted-foreground text-sm font-light tracking-wide">
            Brought to you by the Coolest Pumpkin team. 🎃
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
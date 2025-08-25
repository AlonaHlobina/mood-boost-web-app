import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Question {
  id: number
  text: string
  positiveResponse: string
  negativeResponse: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "Did you get enough sleep last night?",
    positiveResponse: "Great! Good sleep is so important for feeling awesome! ⭐",
    negativeResponse: "That's okay! Even tired heroes can be cool. Let's boost that energy! 💪"
  },
  {
    id: 2,
    text: "Have you eaten something tasty today?",
    positiveResponse: "Wonderful! Fuel for your amazing day! 🍎",
    negativeResponse: "No worries! Your body is still doing incredible things! 🌟"
  },
  {
    id: 3,
    text: "Did you talk to someone you care about today?",
    positiveResponse: "That's beautiful! Connection makes us all cooler! 💕",
    negativeResponse: "That's totally fine! You're still surrounded by people who care! 🤗"
  },
  {
    id: 4,
    text: "Have you done something creative or fun today?",
    positiveResponse: "Amazing! Creativity is the ultimate coolness! 🎨",
    negativeResponse: "No problem! Just being you is creative and wonderful! ✨"
  },
  {
    id: 5,
    text: "Did you step outside today?",
    positiveResponse: "Fantastic! Nature recognizes a cool person when it sees one! 🌳",
    negativeResponse: "That's perfectly okay! Indoor adventures count too! 🏠"
  }
]

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [characterMessage, setCharacterMessage] = useState(
    "Hi, beautiful person! I see you're having a bad day! I'll try to make it better for you. All you need to do is answer a few simple questions. ✨"
  )

  // Calculate progress based on answered questions
  const progressValue = (answeredQuestions.length / questions.length) * 100

  const handleAnswer = (isYes: boolean) => {
    const currentQuestion = questions[currentQuestionIndex]
    const response = isYes ? currentQuestion.positiveResponse : currentQuestion.negativeResponse
    
    // Add current question to answered list
    setAnsweredQuestions(prev => [...prev, currentQuestion.id])
    
    // Update character message with response
    setCharacterMessage(response)
    
    // Move to next question or show completion
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setCharacterMessage("Ready for the next one? You're doing great! 🌟")
      } else {
        setShowCompletion(true)
        setCharacterMessage("Look at you! Your coolness meter is off the charts! You're absolutely amazing, and I hope your day gets even better! 🎉")
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnsweredQuestions([])
    setShowCompletion(false)
    setCharacterMessage(
      "Hi, beautiful person! I see you're having a bad day! I'll try to make it better for you. All you need to do is answer a few simple questions. ✨"
    )
  }

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
                value={progressValue} 
                className="h-6 bg-muted border-2 border-border rounded-full transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">
                  {progressValue === 0 ? "Let's get started!" : 
                   progressValue === 100 ? "Maximum Coolness! 🎉" : 
                   `${Math.round(progressValue)}% Cool!`}
                </span>
              </div>
            </div>
          </div>

          {/* Character Section */}
          <div className="flex flex-col items-center mb-8">
            <div id="cartoon-character" className="relative mb-4">
              {/* Character Placeholder */}
              <div className="w-32 h-32 md:w-40 md:h-40 bg-primary rounded-full border-4 border-primary-foreground shadow-lg flex items-center justify-center animate-bounce-slow">
                <div className="text-6xl md:text-7xl">
                  {progressValue === 100 ? "🤩" : progressValue > 0 ? "😊" : "😊"}
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="absolute -top-4 -right-8 md:-right-12 bg-card border-2 border-border rounded-2xl p-4 max-w-xs md:max-w-sm shadow-lg">
                <p className="text-sm md:text-base text-card-foreground leading-relaxed">
                  {characterMessage}
                </p>
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-border transform translate-y-2"></div>
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-7 border-l-transparent border-r-7 border-r-transparent border-t-7 border-t-card transform translate-y-1 ml-0.5"></div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div id="chat-window" className="bg-muted rounded-xl p-6 border-2 border-border min-h-48">
            {!showCompletion ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h3>
                <p className="text-foreground text-lg mb-8 leading-relaxed">
                  {questions[currentQuestionIndex].text}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => handleAnswer(true)}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    disabled={answeredQuestions.includes(questions[currentQuestionIndex].id)}
                  >
                    Yes! 👍
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    className="border-2 border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    disabled={answeredQuestions.includes(questions[currentQuestionIndex].id)}
                  >
                    No 👎
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  🎉 You're Amazing! 🎉
                </h3>
                <p className="text-foreground text-lg mb-6 leading-relaxed">
                  You've completed all the questions and boosted your coolness to the maximum! 
                  Remember, you're incredible just as you are. ✨
                </p>
                <Button
                  onClick={resetQuiz}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Start Again 🔄
                </Button>
              </div>
            )}
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
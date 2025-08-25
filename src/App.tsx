import { Card } from "@/components/ui/card"
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
  const [yesCount, setYesCount] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [characterMessage, setCharacterMessage] = useState(
    "Hi, beautiful person! I see you're having a bad day! I'll try to make it better for you. All you need to do is answer a few simple questions. ✨"
  )

  // Calculate progress based on answered questions
  const progressValue = (answeredQuestions.length / questions.length) * 100
  // Calculate coolness bar height based on yes answers (0-5 yes answers mapped to 0-100%)
  const coolnessHeight = (yesCount / questions.length) * 100

  const handleAnswer = (isYes: boolean) => {
    const currentQuestion = questions[currentQuestionIndex]
    const response = isYes ? currentQuestion.positiveResponse : currentQuestion.negativeResponse
    
    // Add current question to answered list
    setAnsweredQuestions(prev => [...prev, currentQuestion.id])
    
    // Update yes count if user answered yes
    if (isYes) {
      setYesCount(prev => prev + 1)
    }
    
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
    setYesCount(0)
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
          {/* Overall Progress Display */}
          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {yesCount === 0 ? "Let's boost your mood! 🌟" : 
               yesCount === questions.length ? "You're at maximum coolness! 🎉" : 
               `Getting cooler... ${yesCount} out of ${questions.length} yes! ⭐`}
            </h2>
          </div>

          {/* Character Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
            {/* Cartoon Human Figure */}
            <div id="cartoon-character" className="flex-shrink-0 relative">
              {/* Coolness Bar Above Character */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-8 h-20">
                <div className="text-xs font-medium text-muted-foreground mb-1 text-center">
                  Cool
                </div>
                {/* Vertical bar container */}
                <div className="relative w-4 h-16 bg-muted border border-border rounded-full mx-auto">
                  {/* Rising/falling bar */}
                  <div 
                    className="absolute bottom-0 w-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      height: `${coolnessHeight}%`,
                      background: coolnessHeight >= 80 ? 'linear-gradient(to top, #22c55e, #4ade80)' :
                                 coolnessHeight >= 40 ? 'linear-gradient(to top, #3b82f6, #60a5fa)' :
                                 'linear-gradient(to top, #6b7280, #9ca3af)'
                    }}
                  ></div>
                  {/* Level indicator marks */}
                  <div className="absolute left-0 top-0 w-full h-full">
                    {[20, 40, 60, 80, 100].map((level) => (
                      <div 
                        key={level}
                        className="absolute left-0 w-full border-t border-border/50"
                        style={{ bottom: `${level}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-center mt-1 font-medium">
                  {yesCount}/{questions.length}
                </div>
              </div>

              {/* Human Figure */}
              <div className={`relative animate-bounce-slow ${coolnessHeight >= 80 ? 'coolness-high' : ''}`}>
                {/* Head */}
                <div className="w-16 h-16 bg-amber-200 rounded-full border-2 border-amber-300 mx-auto mb-1 relative shadow-md">
                  {/* Eyes */}
                  <div className={`absolute top-4 left-3 w-2 h-2 bg-gray-800 rounded-full transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'animate-pulse' : ''
                  }`}></div>
                  <div className={`absolute top-4 right-3 w-2 h-2 bg-gray-800 rounded-full transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'animate-pulse' : ''
                  }`}></div>
                  {/* Eye sparkles when at high coolness */}
                  {coolnessHeight >= 80 && (
                    <>
                      <div className="absolute top-3 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    </>
                  )}
                  {/* Mouth */}
                  <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'border-green-600 rounded-b-full' : 
                    coolnessHeight >= 40 ? 'border-yellow-600' : 'border-gray-600 rotate-180 rounded-t-full'
                  }`}></div>
                  {/* Hair */}
                  <div className="absolute -top-1 left-2 right-2 h-6 bg-amber-700 rounded-t-full"></div>
                </div>

                {/* Body */}
                <div className={`w-12 h-16 rounded-lg mx-auto border-2 shadow-md relative transition-all duration-500 ${
                  coolnessHeight >= 80 ? 'bg-yellow-400 border-yellow-500' : 
                  coolnessHeight >= 40 ? 'bg-blue-400 border-blue-500' : 'bg-gray-400 border-gray-500'
                }`}>
                  {/* Arms */}
                  <div className="absolute -left-3 top-2 w-6 h-2 bg-amber-200 rounded-full border border-amber-300"></div>
                  <div className="absolute -right-3 top-2 w-6 h-2 bg-amber-200 rounded-full border border-amber-300"></div>
                  {/* Shirt details */}
                  <div className={`absolute top-1 left-1 right-1 h-1 rounded transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'bg-yellow-500' : 
                    coolnessHeight >= 40 ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  
                  {/* Cool effects when high coolness */}
                  {coolnessHeight >= 80 && (
                    <>
                      <div className="absolute top-3 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    </>
                  )}
                </div>

                {/* Legs */}
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-3 h-12 bg-gray-700 rounded-lg border border-gray-800"></div>
                  <div className="w-3 h-12 bg-gray-700 rounded-lg border border-gray-800"></div>
                </div>

                {/* Feet */}
                <div className="flex justify-center gap-2 mt-1">
                  <div className="w-4 h-2 bg-gray-900 rounded-full"></div>
                  <div className="w-4 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="bg-card border-2 border-border rounded-2xl p-4 md:p-6 shadow-lg relative max-w-md lg:max-w-none">
                <p className="text-sm md:text-base text-card-foreground leading-relaxed">
                  {characterMessage}
                </p>
                {/* Speech bubble tail pointing to character */}
                <div className="absolute top-6 -left-3 lg:-left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-border border-b-8 border-b-transparent"></div>
                <div className="absolute top-6 -left-2 lg:-left-2 w-0 h-0 border-t-7 border-t-transparent border-r-7 border-r-card border-b-7 border-b-transparent"></div>
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
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import React from "react"

interface Question {
  id: number
  text: string
  positiveResponse: string
  negativeResponse: string
}

// Coolness assessment messages for variety
const coolnessMessages = [
  {
    zero: "Let's boost your mood! 🌟",
    low: [
      "Getting started... ", 
      "Building momentum... ", 
      "Warming up... ", 
      "On the path... ",
      "Taking the first steps... ",
      "Beginning your journey... ",
      "Starting to shine... ",
      "Coolness loading... "
    ],
    medium: [
      "Halfway to awesome! ", 
      "You're getting there! ", 
      "Progress is progress! ", 
      "Looking good! ",
      "Steadily climbing! ",
      "Making great strides! ",
      "Coolness rising! ",
      "On the right track! "
    ],
    high: [
      "Almost at peak cool! ", 
      "So close to maximum! ", 
      "Nearly there! ", 
      "Excellence incoming! ",
      "Approaching legendary! ",
      "Almost at the summit! ",
      "Nearing perfection! ",
      "Peak coolness ahead! "
    ],
    max: [
      "You're at maximum coolness! 🎉", 
      "Peak coolness achieved! 🚀", 
      "Maximum awesome reached! ⭐", 
      "Coolness level: LEGENDARY! 👑",
      "Ultimate coolness unlocked! 🔥",
      "Coolness meter exploded! 💥",
      "Off-the-charts awesome! 📊",
      "Coolness overload activated! ⚡"
    ]
  }
]

// Final completion messages for variety
const completionMessages = [
  "Your coolness level is absolutely legendary! You radiate such positive energy that everyone around you can feel it. Today is going to be an incredible day full of amazing moments! 🎉",
  "Maximum coolness achieved! You're the kind of person who makes the world brighter just by being in it. Your day is going to be filled with joy, laughter, and wonderful surprises! ✨",
  "Off-the-charts cool! Your amazing personality and positive spirit are going to make today absolutely fantastic. Great things are coming your way because you deserve them! 🌟",
  "Peak coolness unlocked! You have this incredible ability to turn any day into something special. Today is going to be one of those days you'll remember with a smile! 🚀",
  "Ultimate coolness status! Your awesomeness is contagious and today everyone you meet will be lucky to encounter someone as cool as you. Prepare for an amazing day! 👑",
  "Legendary coolness reached! You're the kind of person who brings sunshine wherever you go. Today is going to shine just as bright as your incredible spirit! 💫",
  "Maximum cool factor activated! Your unique blend of awesomeness means today is going to unfold in the most wonderful ways. Every moment will be touched by your coolness! 🎊",
  "Coolness meter exploded! You're so incredibly cool that today doesn't stand a chance of being anything less than spectacular. Amazing adventures await you! 🌈",
  "Supreme coolness achieved! Your fantastic energy is going to make today absolutely magical. Every person you meet and every experience you have will be enhanced by your coolness! 🎯",
  "Infinite coolness unlocked! You're so wonderfully cool that today is going to be one of those perfect days where everything just flows beautifully. Get ready for awesomeness! ⭐"
]

const questions: Question[] = [
  {
    id: 1,
    text: "Did you breathe at all today?",
    positiveResponse: "Incredible! You're literally keeping yourself alive - that's the coolest superpower ever! 💨",
    negativeResponse: "Wait... how are you answering this? You're definitely breathing and that's amazing! 😄"
  },
  {
    id: 2,
    text: "Are you currently thinking about something?",
    positiveResponse: "Your brain is working beautifully! Thinking minds are the coolest minds! 🧠",
    negativeResponse: "Even having a blank mind moment makes you zen-level cool! ✨"
  },
  {
    id: 3,
    text: "Did you experience the passage of time today?",
    positiveResponse: "You're traveling through time at exactly the right speed! Time traveler level: Expert! ⏰",
    negativeResponse: "Even if time felt weird, you're still here in this moment and that's perfect! 🌟"
  },
  {
    id: 4,
    text: "Did you open your eyes today?",
    positiveResponse: "Yes! You're seeing the world and that makes the world brighter! 👀",
    negativeResponse: "Whether your eyes are open or closed, you're still perceiving and that's beautiful! ✨"
  },
  {
    id: 5,
    text: "Did you hear a sound today?",
    positiveResponse: "Your ears are working like magic! Sound waves think you're pretty cool! 👂",
    negativeResponse: "Silence can be golden, and you're appreciating it like a pro! 🤫"
  },
  {
    id: 6,
    text: "Are you reading this right now?",
    positiveResponse: "Look at you being literate and engaged! Reading is one of humanity's coolest inventions! 📖",
    negativeResponse: "Even if you're not reading, you're somehow getting this message and that's mysterious and cool! 🔮"
  },
  {
    id: 7,
    text: "Did you get out of bed today?",
    positiveResponse: "Champion! You conquered gravity and started your day like a hero! 🛏️",
    negativeResponse: "Beds are amazing inventions and you're appreciating comfort - that's wisdom! 😴"
  },
  {
    id: 8,
    text: "Have you seen the sky today?",
    positiveResponse: "You looked up at the infinite universe! That's pretty cosmic and cool! 🌌",
    negativeResponse: "The sky is still there waiting for you, and indoor ceilings can be interesting too! 🏠"
  },
  {
    id: 9,
    text: "Did you touch something today?",
    positiveResponse: "Your sense of touch is connecting you to the physical world! Tactile excellence! ✋",
    negativeResponse: "Even floating through life without touching anything would be impressively ethereal! 👻"
  },
  {
    id: 10,
    text: "Did you drink any water today?",
    positiveResponse: "Hydration nation! You're taking care of your amazing body! 💧",
    negativeResponse: "Your body is remarkably efficient - even a little dehydration can't stop your coolness! 🌟"
  },
  {
    id: 11,
    text: "Did you exercise today?",
    positiveResponse: "Movement master! Your body loves you for keeping it active! 💪",
    negativeResponse: "Rest is important too! Your muscles are recharging for future awesome activities! 😌"
  },
  {
    id: 12,
    text: "Did you see another person today?",
    positiveResponse: "Human connection activated! You're part of the amazing human community! 👥",
    negativeResponse: "Solo adventures are cool too! You're enjoying your own excellent company! 🦸"
  },
  {
    id: 13,
    text: "Did you have breakfast?",
    positiveResponse: "Morning fuel achieved! You're starting your day like a breakfast champion! 🥞",
    negativeResponse: "Maybe you're trying intermittent fasting or just marching to your own breakfast beat! 🥐"
  },
  {
    id: 14,
    text: "Did you get enough sleep last night?",
    positiveResponse: "Great! Good sleep is so important for feeling awesome! ⭐",
    negativeResponse: "That's okay! Even tired heroes can be cool. Let's boost that energy! 💪"
  },
  {
    id: 15,
    text: "Have you eaten something tasty today?",
    positiveResponse: "Wonderful! Fuel for your amazing day! 🍎",
    negativeResponse: "No worries! Your body is still doing incredible things! 🌟"
  },
  {
    id: 16,
    text: "Did you talk to someone you care about today?",
    positiveResponse: "That's beautiful! Connection makes us all cooler! 💕",
    negativeResponse: "That's totally fine! You're still surrounded by people who care! 🤗"
  },
  {
    id: 17,
    text: "Have you done something creative or fun today?",
    positiveResponse: "Amazing! Creativity is the ultimate coolness! 🎨",
    negativeResponse: "No problem! Just being you is creative and wonderful! ✨"
  },
  {
    id: 18,
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
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [showParticles, setShowParticles] = useState(false)
  const [messageVariationIndex, setMessageVariationIndex] = useState(0)
  const [completionMessageIndex, setCompletionMessageIndex] = useState(0)

  // Number of questions to ask in each session
  const QUESTIONS_TO_ASK = 5

  // Function to get coolness assessment message with variety
  const getCoolnessMessage = (yesCount: number) => {
    if (yesCount === 0) {
      return coolnessMessages[0].zero
    } else if (yesCount === QUESTIONS_TO_ASK) {
      const maxMessages = coolnessMessages[0].max
      return maxMessages[messageVariationIndex % maxMessages.length]
    } else if (yesCount >= Math.ceil(QUESTIONS_TO_ASK * 0.8)) {
      const highMessages = coolnessMessages[0].high
      return `${highMessages[messageVariationIndex % highMessages.length]}${yesCount} out of ${QUESTIONS_TO_ASK} yes! ⭐`
    } else if (yesCount >= Math.ceil(QUESTIONS_TO_ASK * 0.4)) {
      const mediumMessages = coolnessMessages[0].medium
      return `${mediumMessages[messageVariationIndex % mediumMessages.length]}${yesCount} out of ${QUESTIONS_TO_ASK} yes! ⭐`
    } else {
      const lowMessages = coolnessMessages[0].low
      return `${lowMessages[messageVariationIndex % lowMessages.length]}${yesCount} out of ${QUESTIONS_TO_ASK} yes! ⭐`
    }
  }

  // Enhanced sound effects using Web Audio API
  const playCelebrationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Resume audio context if it's suspended (required for some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Victory fanfare - triumphant chord progression
      const chords = [
        [523.25, 659.25, 783.99], // C Major (C5, E5, G5)
        [587.33, 739.99, 880.00], // D Major (D5, F#5, A5)  
        [659.25, 830.61, 987.77], // E Major (E5, G#5, B5)
        [698.46, 880.00, 1046.50] // F Major (F5, A5, C6)
      ]
      
      // Play triumphant chord progression
      chords.forEach((chord, chordIndex) => {
        setTimeout(() => {
          chord.forEach((frequency) => {
            try {
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              
              oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
              oscillator.type = 'triangle'
              
              // Powerful chord envelope
              gainNode.gain.setValueAtTime(0, audioContext.currentTime)
              gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.02)
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6)
              
              oscillator.start(audioContext.currentTime)
              oscillator.stop(audioContext.currentTime + 0.6)
            } catch (e) {
              console.log('Audio chord failed:', e)
            }
          })
        }, chordIndex * 150)
      })

      // Magical sparkle cascade
      setTimeout(() => {
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            try {
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              
              // Descending magical sparkles with randomness
              const baseFreq = 2000 - (i * 120) + (Math.random() * 200 - 100)
              oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime)
              oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, audioContext.currentTime + 0.15)
              oscillator.type = 'sine'
              
              gainNode.gain.setValueAtTime(0, audioContext.currentTime)
              gainNode.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + 0.01)
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
              
              oscillator.start(audioContext.currentTime)
              oscillator.stop(audioContext.currentTime + 0.15)
            } catch (e) {
              console.log('Audio sparkle failed:', e)
            }
          }, i * 35)
        }
      }, 400)

      // Epic finale burst
      setTimeout(() => {
        try {
          // Low dramatic boom
          const boom = audioContext.createOscillator()
          const boomGain = audioContext.createGain()
          boom.connect(boomGain)
          boomGain.connect(audioContext.destination)
          
          boom.frequency.setValueAtTime(80, audioContext.currentTime)
          boom.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.3)
          boom.type = 'triangle'
          
          boomGain.gain.setValueAtTime(0, audioContext.currentTime)
          boomGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05)
          boomGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)
          
          boom.start(audioContext.currentTime)
          boom.stop(audioContext.currentTime + 0.3)

          // High celestial chimes
          const chimeFreqs = [1047, 1319, 1568, 2093, 2637] // C6, E6, G6, C7, E7
          chimeFreqs.forEach((freq, i) => {
            setTimeout(() => {
              const chime = audioContext.createOscillator()
              const chimeGain = audioContext.createGain()
              chime.connect(chimeGain)
              chimeGain.connect(audioContext.destination)
              
              chime.frequency.setValueAtTime(freq, audioContext.currentTime)
              chime.type = 'sine'
              
              chimeGain.gain.setValueAtTime(0, audioContext.currentTime)
              chimeGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01)
              chimeGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8)
              
              chime.start(audioContext.currentTime)
              chime.stop(audioContext.currentTime + 0.8)
            }, i * 80)
          })
        } catch (e) {
          console.log('Audio finale failed:', e)
        }
      }, 1000)
      
    } catch (e) {
      // Silently fail if Web Audio API is not available
      console.log('Audio context creation failed:', e)
    }
  }

  // Particle-specific sound effects
  const playParticleSound = (particleType: string, delay: number = 0) => {
    setTimeout(() => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        if (audioContext.state === 'suspended') {
          audioContext.resume()
        }
        
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // Different sounds for different particle types
        let frequency = 800
        let duration = 0.1
        let volume = 0.03
        
        switch (particleType) {
          case '🎉': // Party popper
            frequency = 600 + Math.random() * 400
            oscillator.type = 'square'
            duration = 0.15
            volume = 0.04
            break
          case '✨': // Sparkle
            frequency = 1200 + Math.random() * 800
            oscillator.type = 'sine'
            duration = 0.2
            volume = 0.03
            break
          case '⭐': // Star
            frequency = 900 + Math.random() * 600
            oscillator.type = 'triangle'
            duration = 0.25
            volume = 0.035
            break
          case '🌟': // Glowing star
            frequency = 1000 + Math.random() * 1000
            oscillator.type = 'sine'
            duration = 0.3
            volume = 0.04
            break
          case '💫': // Dizzy
            frequency = 800
            oscillator.type = 'sawtooth'
            duration = 0.2
            volume = 0.03
            // Add frequency modulation for dizzy effect
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
            oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, audioContext.currentTime + duration / 2)
            oscillator.frequency.exponentialRampToValueAtTime(frequency, audioContext.currentTime + duration)
            break
          case '🎊': // Confetti
            frequency = 700 + Math.random() * 300
            oscillator.type = 'square'
            duration = 0.12
            volume = 0.025
            break
          case '🔥': // Fire
            frequency = 400 + Math.random() * 400
            oscillator.type = 'sawtooth'
            duration = 0.15
            volume = 0.03
            break
          case '💎': // Diamond
            frequency = 1500 + Math.random() * 500
            oscillator.type = 'triangle'
            duration = 0.4
            volume = 0.04
            break
          case '👑': // Crown
            frequency = 1100
            oscillator.type = 'triangle'
            duration = 0.5
            volume = 0.05
            break
          case '🏆': // Trophy  
            frequency = 880 // A5
            oscillator.type = 'triangle'
            duration = 0.6
            volume = 0.06
            break
          default:
            frequency = 800 + Math.random() * 400
            oscillator.type = 'sine'
        }
        
        if (particleType !== '💫') { // Skip for dizzy since we set it above
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        }
        
        // Envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
        
      } catch (e) {
        console.log('Particle sound failed:', e)
      }
    }, delay)
  }

  const playButtonClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Resume audio context if it's suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Gentle click sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      oscillator.type = 'triangle'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (e) {
      // Silently fail if Web Audio API is not available
      console.log('Button click sound failed:', e)
    }
  }

  // Enhanced Particle component with sound effects
  const Particle = ({ delay, duration, size, emoji }: { delay: number; duration: number; size: number; emoji: string }) => {
    // Trigger particle sound effect when particle appears
    React.useEffect(() => {
      playParticleSound(emoji, delay * 1000)
    }, [emoji, delay])

    return (
      <div 
        className="absolute pointer-events-none animate-bounce opacity-0"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          animationFillMode: 'forwards',
          animationName: 'particle-float'
        }}
      >
        {emoji}
      </div>
    )
  }

  // Initialize random questions and message variation on first load
  React.useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    setSelectedQuestions(shuffled.slice(0, QUESTIONS_TO_ASK))
    setMessageVariationIndex(Math.floor(Math.random() * 8)) // Random index for message variation (0-7)
    setCompletionMessageIndex(Math.floor(Math.random() * completionMessages.length)) // Random completion message
  }, [])

  // Trigger particles and enhanced sound effects when maximum coolness is reached
  useEffect(() => {
    if (yesCount === QUESTIONS_TO_ASK) {
      setShowParticles(true)
      // Play celebration sound with enhanced effects
      playCelebrationSound()
      
      // Additional ambient celebration sounds
      setTimeout(() => {
        // Play some extra magical sounds
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            playParticleSound('✨', 0)
          }, i * 200)
        }
      }, 1500)
      
      // Hide particles after animation completes
      const timer = setTimeout(() => {
        setShowParticles(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [yesCount, QUESTIONS_TO_ASK])

  // Calculate progress based on answered questions
  const progressValue = (answeredQuestions.length / QUESTIONS_TO_ASK) * 100
  // Calculate coolness bar height based on yes answers (0-5 yes answers mapped to 0-100%)
  const coolnessHeight = (yesCount / QUESTIONS_TO_ASK) * 100

  const handleAnswer = (isYes: boolean) => {
    // Play button click sound
    playButtonClickSound()
    
    const currentQuestion = selectedQuestions[currentQuestionIndex]
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
      if (currentQuestionIndex < QUESTIONS_TO_ASK - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setCharacterMessage("Ready for the next one? You're doing great! 🌟")
      } else {
        setShowCompletion(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    // Play button click sound
    playButtonClickSound()
    
    setCurrentQuestionIndex(0)
    setAnsweredQuestions([])
    setYesCount(0)
    setShowCompletion(false)
    setShowParticles(false)
    setCharacterMessage(
      "Hi, beautiful person! I see you're having a bad day! I'll try to make it better for you. All you need to do is answer a few simple questions. ✨"
    )
    // Select new random questions and message variation
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    setSelectedQuestions(shuffled.slice(0, QUESTIONS_TO_ASK))
    setMessageVariationIndex(Math.floor(Math.random() * 8)) // New random variation each reset (0-7)
    setCompletionMessageIndex(Math.floor(Math.random() * completionMessages.length)) // New random completion message
  }

  return (
    <div className={`min-h-screen bg-background p-4 md:p-8 relative overflow-hidden transition-all duration-1000 ${yesCount === QUESTIONS_TO_ASK ? 'celebration-mode' : ''}`}>
      {/* Particle Effects Overlay */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Create multiple particles with different emojis and animations */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle 
              key={i} 
              delay={i * 0.1} 
              duration={3 + Math.random() * 2}
              size={16 + Math.random() * 16}
              emoji={['🎉', '✨', '⭐', '🌟', '💫', '🎊', '🔥', '💎', '👑', '🏆'][i % 10]}
            />
          ))}
          {/* Additional burst of confetti */}
          {Array.from({ length: 15 }).map((_, i) => (
            <Particle 
              key={`confetti-${i}`} 
              delay={0.5 + i * 0.05} 
              duration={2 + Math.random() * 1.5}
              size={12 + Math.random() * 8}
              emoji={['🎈', '🎁', '🍀', '🌈', '☀️'][i % 5]}
            />
          ))}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto relative z-10">
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
              {getCoolnessMessage(yesCount)}
            </h2>
          </div>

          {/* Character Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
            {/* Cartoon Human Figure with Coolness Bar */}
            <div id="cartoon-character" className="flex-shrink-0 flex items-center gap-4">
              {/* Coolness Bar Next to Character */}
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-muted-foreground mb-1 text-center">
                  Cool
                </div>
                {/* Vertical bar container */}
                <div className="relative w-4 h-32 bg-muted border border-border rounded-full">
                  {/* Rising/falling bar */}
                  <div 
                    className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ease-out ${coolnessHeight >= 100 ? 'animate-pulse' : ''}`}
                    style={{ 
                      height: `${coolnessHeight}%`,
                      background: coolnessHeight >= 80 ? 'linear-gradient(to top, #22c55e, #4ade80)' :
                                 coolnessHeight >= 40 ? 'linear-gradient(to top, #3b82f6, #60a5fa)' :
                                 'linear-gradient(to top, #6b7280, #9ca3af)',
                      boxShadow: coolnessHeight >= 100 ? '0 0 10px rgba(34, 197, 94, 0.8)' : 'none'
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
                  {coolnessHeight >= 100 && (
                    <>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                      <div className="absolute top-1/4 -left-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 -right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                      <div className="absolute top-3/4 -left-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                    </>
                  )}
                </div>
                <div className="text-xs text-center mt-1 font-medium">
                  {yesCount}/{QUESTIONS_TO_ASK}
                </div>
              </div>

              {/* Cool Panda Figure */}
              <div className={`relative animate-bounce-slow ${coolnessHeight >= 80 ? 'coolness-high' : ''}`}>
                {/* Panda Head */}
                <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300 mx-auto mb-1 relative shadow-md">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-900 rounded-full"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full"></div>
                  
                  {/* Sunglasses (when cool) or Regular Eyes */}
                  {coolnessHeight >= 60 ? (
                    <>
                      {/* Cool Sunglasses */}
                      <div className="absolute top-3 left-2 right-2 h-4 bg-gray-800 rounded-lg border border-gray-900">
                        {/* Left lens with palm tree reflection */}
                        <div className="absolute left-0 top-0 w-5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-l-lg overflow-hidden">
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-green-800"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-green-600 rounded-full"></div>
                          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        {/* Right lens with palm tree reflection */}
                        <div className="absolute right-0 top-0 w-5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-lg overflow-hidden">
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-green-800"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-green-600 rounded-full"></div>
                          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        {/* Bridge */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-700"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Regular Panda Eyes */}
                      <div className="absolute top-3 left-2 w-4 h-5 bg-gray-900 rounded-full">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full">
                          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-900 rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute top-3 right-2 w-4 h-5 bg-gray-900 rounded-full">
                        <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full">
                          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-gray-900 rounded-full"></div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Nose */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
                  
                  {/* Mouth */}
                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'w-4 h-2 bg-red-600 rounded-full' : 
                    coolnessHeight >= 40 ? 'w-3 h-1 border-b-2 border-gray-800' : 'w-2 h-1 border-b border-gray-600'
                  }`}></div>
                </div>

                {/* Panda Body */}
                <div className="w-12 h-16 bg-gray-100 rounded-lg mx-auto border-2 border-gray-300 shadow-md relative overflow-hidden">
                  {/* Striped Shirt */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    coolnessHeight >= 80 ? 'bg-gradient-to-b from-blue-600 to-blue-700' : 
                    coolnessHeight >= 40 ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {/* White stripes */}
                    <div className="absolute top-2 left-0 right-0 h-1 bg-white"></div>
                    <div className="absolute top-5 left-0 right-0 h-1 bg-white"></div>
                    <div className="absolute top-8 left-0 right-0 h-1 bg-white"></div>
                    <div className="absolute top-11 left-0 right-0 h-1 bg-white"></div>
                  </div>
                  
                  {/* Arms */}
                  <div className="absolute -left-3 top-2 w-6 h-3 bg-gray-900 rounded-full"></div>
                  <div className="absolute -right-3 top-2 w-6 h-3 bg-gray-900 rounded-full"></div>
                  
                  {/* Cool sparkles when at high coolness */}
                  {coolnessHeight >= 80 && (
                    <>
                      <div className="absolute top-3 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                      <div className="absolute top-3 right-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
                    </>
                  )}
                </div>

                {/* Panda Legs */}
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-3 h-12 bg-gray-900 rounded-lg"></div>
                  <div className="w-3 h-12 bg-gray-900 rounded-lg"></div>
                </div>

                {/* Panda Feet */}
                <div className="flex justify-center gap-2 mt-1">
                  <div className="w-4 h-3 bg-gray-900 rounded-full"></div>
                  <div className="w-4 h-3 bg-gray-900 rounded-full"></div>
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
              selectedQuestions.length > 0 && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    Question {currentQuestionIndex + 1} of {QUESTIONS_TO_ASK}
                  </h3>
                  <p className="text-foreground text-lg mb-8 leading-relaxed">
                    {selectedQuestions[currentQuestionIndex].text}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => handleAnswer(true)}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      disabled={answeredQuestions.includes(selectedQuestions[currentQuestionIndex].id)}
                    >
                      Yes! 👍
                    </Button>
                    <Button
                      onClick={() => handleAnswer(false)}
                      variant="outline"
                      className="border-2 border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      disabled={answeredQuestions.includes(selectedQuestions[currentQuestionIndex].id)}
                    >
                      No 👎
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  🎉 You're Amazing! 🎉
                </h3>
                <p className="text-foreground text-lg mb-6 leading-relaxed">
                  {completionMessages[completionMessageIndex]}
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
"use client"
import { useState } from "react"
import clsx from "clsx"

interface QuestionnaireProps {
  email: string
  onComplete: (data: any) => void
  onSkip: () => void
}

const questions = [
  {
    id: "name",
    question: "What's your first name?",
    type: "text",
    placeholder: "Enter your first name"
  },
  {
    id: "background",
    question: "I am currently...",
    type: "select",
    options: [
      "A student (college/university)",
      "A recent graduate", 
      "Working professional",
      "Looking to switch careers",
      "Just curious about business"
    ]
  },
  {
    id: "learningGoals",
    question: "I want to get better at...",
    type: "select",
    options: [
      "Solving business problems",
      "Making decisions with data",
      "Thinking like a consultant",
      "Interview preparation",
      "Understanding how businesses work",
      "Just exploring new skills"
    ]
  },
  {
    id: "experienceLevel",
    question: "When it comes to business problem-solving, I...",
    type: "select",
    options: [
      "Am completely new to this",
      "Have some basic knowledge",
      "Have tried a few cases before",
      "Am actively practicing",
      "Am already experienced"
    ]
  },
  {
    id: "learningPreferences",
    question: "I prefer learning through...",
    type: "select",
    options: [
      "Step-by-step guides",
      "Interactive practice",
      "Video explanations",
      "Real business examples",
      "Working with others",
      "Whatever works best"
    ]
  }
]

export function Questionnaire({ email, onComplete, onSkip }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      await onComplete(answers)
    } catch (error) {
      console.error('Error completing questionnaire:', error)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== ""

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-slate-10 mb-2">
          <span>Step {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-11/10 rounded-full h-2">
          <div 
            className="bg-gray-12 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-medium text-slate-12">
        {currentQuestion.question}
      </h2>

      {/* Answer Input */}
      {currentQuestion.type === "text" ? (
        <input
          type="text"
          placeholder={currentQuestion.placeholder}
          value={answers[currentQuestion.id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          className="w-full text-sm pl-4 pr-4 py-3 h-12 bg-gray-11/5 rounded-full text-gray-12 placeholder:text-gray-9 border border-gray-11/10 focus:outline-none focus:border-gray-12/20"
        />
      ) : (
        <div className="space-y-2 w-full">
          {currentQuestion.options?.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={clsx(
                "w-full text-left p-3 rounded-lg border transition-all duration-200",
                answers[currentQuestion.id] === option
                  ? "bg-gray-12 text-gray-1 border-gray-12"
                  : "bg-gray-11/5 text-gray-12 border-gray-11/10 hover:border-gray-12/20"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center w-full pt-4">
        <button
          onClick={onSkip}
          className="text-sm text-slate-10 hover:text-slate-12 transition-colors"
        >
          Skip
        </button>
        
        <div className="flex gap-2">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm text-slate-10 hover:text-slate-12 transition-colors"
            >
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            disabled={!canProceed || loading}
            className={clsx(
              "px-6 py-2 bg-gray-12 text-gray-1 text-sm rounded-full font-medium transition-all",
              canProceed && !loading
                ? "hover:bg-gray-11"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Saving..." : currentStep === questions.length - 1 ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
} 
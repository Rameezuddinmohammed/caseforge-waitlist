import { NextRequest, NextResponse } from 'next/server'
import { addEmailToSheet, checkEmailExists, updateUserData } from '@/lib/google-sheets'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, questionnaireData } = body

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return NextResponse.json(
        { success: false, error: "This email is already on the waitlist" },
        { status: 400 }
      )
    }

    // Add email to Google Sheet
    const result = await addEmailToSheet(email)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "There was an error while submitting the form" },
        { status: 500 }
      )
    }

    // If questionnaire data is provided, update the user data
    if (questionnaireData) {
      await updateUserData(email, {
        name: questionnaireData.name || "",
        background: questionnaireData.background || "",
        learningGoals: questionnaireData.learningGoals || "",
        experienceLevel: questionnaireData.experienceLevel || "",
        learningPreferences: questionnaireData.learningPreferences || ""
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in submit-email API:', error)
    return NextResponse.json(
      { success: false, error: "There was an error while submitting the form" },
      { status: 500 }
    )
  }
} 
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let analytics = null

export function initFirebase() {
  try {
    const app = initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
    console.log('[ElectIQ] Firebase Analytics initialized')
  } catch (e) {
    console.warn('[ElectIQ] Firebase not configured — analytics disabled')
  }
}

export function trackEvent(eventName, params = {}) {
  try {
    if (analytics) {
      logEvent(analytics, eventName, params)
    }
  } catch (e) {
    // Silently fail if analytics unavailable
  }
}

export function trackQuestionAsked(question, detectedLanguage = 'en') {
  trackEvent('question_asked', {
    question_length: question.length,
    language: detectedLanguage,
  })
}

export function trackStepViewed(stepId) {
  trackEvent('election_step_viewed', { step_id: stepId })
}

export function trackChecklistItem(itemKey, isChecked) {
  trackEvent('checklist_item_toggled', {
    item: itemKey,
    checked: isChecked,
  })
}

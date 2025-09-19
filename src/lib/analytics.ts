import ReactGA from 'react-ga4'

if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
  throw new Error('Missing GA Measurement ID')
}

// Initialize GA4
ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID)

// Page view tracking
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path })
}

// Event tracking
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  })
}

// User tracking
export const setUserProperties = (properties: { [key: string]: any }) => {
  ReactGA.set(properties)
}

// Custom dimensions
export const setCustomDimension = (dimensionIndex: number, value: string) => {
  ReactGA.set({ [`dimension${dimensionIndex}`]: value })
}

// Commonly used events
export const events = {
  // Authentication events
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  SIGNUP_SUCCESS: 'signup_success',
  SIGNUP_FAILURE: 'signup_failure',
  LOGOUT: 'logout',

  // Form events
  FORM_START: 'form_start',
  FORM_COMPLETION: 'form_completion',
  FORM_ERROR: 'form_error',

  // Payment events
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILURE: 'payment_failure',

  // Document events
  DOCUMENT_UPLOAD: 'document_upload',
  DOCUMENT_DOWNLOAD: 'document_download',

  // Feature usage
  FEATURE_INTERACTION: 'feature_interaction',
}

// Categories
export const categories = {
  AUTH: 'Authentication',
  FORMS: 'Forms',
  PAYMENTS: 'Payments',
  DOCUMENTS: 'Documents',
  FEATURES: 'Features',
}

// Track specific actions
export const trackLogin = (success: boolean, error?: string) => {
  trackEvent(
    categories.AUTH,
    success ? events.LOGIN_SUCCESS : events.LOGIN_FAILURE,
    error
  )
}

export const trackSignup = (success: boolean, error?: string) => {
  trackEvent(
    categories.AUTH,
    success ? events.SIGNUP_SUCCESS : events.SIGNUP_FAILURE,
    error
  )
}

export const trackFormCompletion = (
  formName: string,
  success: boolean,
  error?: string
) => {
  trackEvent(
    categories.FORMS,
    success ? events.FORM_COMPLETION : events.FORM_ERROR,
    `${formName}${error ? `: ${error}` : ''}`
  )
}

export const trackPayment = (
  status: 'initiated' | 'success' | 'failure',
  amount: number,
  error?: string
) => {
  const event = {
    initiated: events.PAYMENT_INITIATED,
    success: events.PAYMENT_SUCCESS,
    failure: events.PAYMENT_FAILURE,
  }[status]

  trackEvent(categories.PAYMENTS, event, error, amount)
}

export const trackFeatureUsage = (feature: string, action: string) => {
  trackEvent(
    categories.FEATURES,
    events.FEATURE_INTERACTION,
    `${feature}:${action}`
  )
}

export default {
  trackPageView,
  trackEvent,
  setUserProperties,
  setCustomDimension,
  events,
  categories,
  trackLogin,
  trackSignup,
  trackFormCompletion,
  trackPayment,
  trackFeatureUsage,
}

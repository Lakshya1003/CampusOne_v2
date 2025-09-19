import { Credentials, App } from 'realm-web'
import * as bcrypt from 'bcrypt'

const APP_ID = import.meta.env.VITE_MONGODB_APP_ID
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY

if (!APP_ID || !API_KEY) {
  throw new Error(
    'MongoDB configuration is missing. Please check your .env file.'
  )
}

const app = new App({ id: APP_ID })

// MongoDB Collections
const Collections = {
  USERS: 'users',
  ADMISSIONS: 'admissions',
  FEES: 'fees',
  HOSTEL: 'hostel',
  EXAMS: 'exams',
  ATTENDANCE: 'attendance',
} as const

// Get a valid Realm user access token
async function getValidAccessToken() {
  if (!app.currentUser) {
    // If no user is logged in, log in with the API Key
    await app.logIn(Credentials.apiKey(API_KEY))
  } else {
    // The currentUser is guaranteed to be authenticated if defined
    await app.currentUser.refreshAccessToken()
  }
  return app.currentUser!.accessToken
}

export async function getCollection(collectionName: string) {
  await getValidAccessToken()

  if (!app.currentUser) {
    throw new Error('Must be logged in to access the database')
  }

  const mongodb = app.currentUser.mongoClient('mongodb-atlas')
  const collection = mongodb.db('campus_bloom').collection(collectionName)
  return collection
}

export const db = {
  users: () => getCollection(Collections.USERS),
  admissions: () => getCollection(Collections.ADMISSIONS),
  fees: () => getCollection(Collections.FEES),
  hostel: () => getCollection(Collections.HOSTEL),
  exams: () => getCollection(Collections.EXAMS),
  attendance: () => getCollection(Collections.ATTENDANCE),
}

// Helper functions for auth

// Test connection
export async function testConnection() {
  try {
    const collection = await getCollection(Collections.USERS)
    const result = await collection.count()
    console.log('MongoDB connection successful. Users count:', result)
    return true
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    return false
  }
}
export async function createUser({
  email,
  password,
  role,
}: {
  email: string
  password: string
  role: string
}) {
  const users = await db.users()
  const existingUser = await users.findOne({ email })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(password)

  const result = await users.insertOne({
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
  })

  return { id: result.insertedId, email, role }
}

export async function verifyUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const users = await db.users()
  const user = await users.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw new Error('Invalid password')
  }

  return { id: user._id, email: user.email, role: user.role }
}

// Helper function to hash password (you'll need to install bcrypt)
async function hashPassword(password: string): Promise<string> {
  const bcrypt = require('bcrypt')
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Helper function to verify password
async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const bcrypt = require('bcrypt')
  return bcrypt.compare(password, hashedPassword)
}

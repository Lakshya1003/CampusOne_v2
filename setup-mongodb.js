// Create collections
db = db.getSiblingDB('campus_bloom')

// Create collections if they don't exist
db.createCollection('users')
db.createCollection('admissions')
db.createCollection('fees')
db.createCollection('hostel')
db.createCollection('exams')
db.createCollection('attendance')

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })

// Additional useful indexes
db.admissions.createIndex({ status: 1 })
db.fees.createIndex({ studentId: 1 })
db.hostel.createIndex({ roomNumber: 1 })
db.exams.createIndex({ studentId: 1, date: 1 })
db.attendance.createIndex({ studentId: 1, date: 1 })

// Print confirmation
print('Database setup completed successfully!')
print('Collections created:')
db.getCollectionNames().forEach((c) => print(' - ' + c))
print('\nIndexes created for users collection:')
db.users.getIndexes().forEach((i) => print(' - ' + JSON.stringify(i)))

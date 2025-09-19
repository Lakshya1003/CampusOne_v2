
-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'student')),
    email TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT
);

-- Students Table (details specific to students)
CREATE TABLE IF NOT EXISTS Students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    student_id TEXT NOT NULL UNIQUE, -- e.g., University ID
    admission_status TEXT DEFAULT 'pending', -- e.g., 'pending', 'approved', 'rejected'
    date_of_birth DATE,
    address TEXT,
    phone_number TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Admissions Table (for tracking applications and admin approvals)
CREATE TABLE IF NOT EXISTS Admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    application_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    admin_notes TEXT,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- Fees Table
CREATE TABLE IF NOT EXISTS Fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    status TEXT NOT NULL DEFAULT 'unpaid', -- 'paid', 'unpaid', 'partially_paid'
    description TEXT, -- e.g., "Tuition Fee", "Hostel Fee"
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- HostelApplications Table
CREATE TABLE IF NOT EXISTS HostelApplications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    application_date DATE DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    room_number TEXT,
    hostel_name TEXT,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- Exams Table
CREATE TABLE IF NOT EXISTS Exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_name TEXT NOT NULL,
    exam_date DATE NOT NULL,
    max_marks INTEGER
);

-- Results Table
CREATE TABLE IF NOT EXISTS Results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    exam_id INTEGER NOT NULL,
    marks_obtained REAL,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES Exams(id) ON DELETE CASCADE
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS Attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'absent', -- 'present', 'absent', 'leave'
    subject_or_class TEXT,
    FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS Notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, -- NULL for general notifications
    message TEXT NOT NULL,
    date_sent DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    type TEXT, -- e.g., 'info', 'warning', 'alert'
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

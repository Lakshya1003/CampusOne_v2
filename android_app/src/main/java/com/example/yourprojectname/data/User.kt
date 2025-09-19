package com.example.yourprojectname.data

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "Users")
data class User(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val username: String,
    val password: String,
    val role: String,
    val email: String?,
    val first_name: String?,
    val last_name: String?
)

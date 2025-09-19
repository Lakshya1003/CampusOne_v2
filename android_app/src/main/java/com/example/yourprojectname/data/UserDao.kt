package com.example.yourprojectname.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface UserDao {
    @Insert
    suspend fun insertUser(user: User)

    @Update
    suspend fun updateUser(user: User)

    @Query("SELECT * FROM Users WHERE username = :username")
    suspend fun getUserByUsername(username: String): User?

    @Query("SELECT * FROM Users WHERE id = :userId")
    suspend fun getUserById(userId: Int): User?

    @Query("DELETE FROM Users WHERE id = :userId")
    suspend fun deleteUserById(userId: Int)

    @Query("SELECT * FROM Users")
    suspend fun getAllUsers(): List<User>
}

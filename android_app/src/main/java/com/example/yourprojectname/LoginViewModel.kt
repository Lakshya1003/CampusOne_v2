package com.example.yourprojectname

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.yourprojectname.data.UserDao
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class LoginViewModel(private val userDao: UserDao) : ViewModel() {

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _loginError = MutableStateFlow<String?>(null)
    val loginError: StateFlow<String?> = _loginError

    fun login(email: String, password: String) {
        _isLoading.value = true
        _loginError.value = null

        viewModelScope.launch {
            try {
                // TODO: In a real app, you would perform actual authentication here:
                // 1. Validate email/password locally (e.g., format, length).
                // 2. Make an API call to your backend for authentication.
                //    If using Firebase, you'd call FirebaseAuth.signInWithEmailAndPassword.

                // For now, let's simulate a successful login and save a dummy user locally
                // This part would typically be replaced by fetching user data from your backend
                val dummyUser = userDao.getUserByUsername(email)

                if (dummyUser != null && dummyUser.password == password) {
                    // Login successful (simulated)
                    println("User logged in: ${dummyUser.username}")
                    // Navigate to dashboard or home screen
                } else {
                    _loginError.value = "Invalid credentials"
                }

            } catch (e: Exception) {
                _loginError.value = e.localizedMessage ?: "An unknown error occurred"
                println("Login error: ${e.localizedMessage}")
            } finally {
                _isLoading.value = false
            }
        }
    }

    // Factory for creating LoginViewModel with dependencies
    class Factory(private val userDao: UserDao) : ViewModelProvider.Factory {
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            if (modelClass.isAssignableFrom(LoginViewModel::class.java)) {
                @Suppress("UNCHECKED_CAST")
                return LoginViewModel(userDao) as T
            }
            throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}

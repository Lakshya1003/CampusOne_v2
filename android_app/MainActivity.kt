package com.example.Campusone

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.yourprojectname.ui.theme.YourProjectNameTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            YourProjectNameTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    LoginPage(
                        onLoginClick = { email, password ->
                            // Handle login logic here
                            println("Login attempted with Email: $email, Password: $password")
                            // You would typically call a ViewModel or a service to handle authentication
                        },
                        onForgotPasswordClick = {
                            // Handle navigation to forgot password screen
                            println("Forgot password clicked!")
                        }
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    YourProjectNameTheme {
        LoginPage(
            onLoginClick = { email, password -> },
            onForgotPasswordClick = {}
        )
    }
}

package com.example.yourprojectname

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*\nimport androidx.compose.runtime.*\nimport androidx.compose.ui.Alignment\nimport androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation\nimport androidx.compose.ui.tooling.preview.Preview\nimport androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.yourprojectname.data.AppDatabase
import com.example.yourprojectname.ui.theme.YourProjectNameTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginPage(onForgotPasswordClick: () -> Unit) {
    val context = androidx.compose.ui.platform.LocalContext.current
    val userDao = remember { AppDatabase.getDatabase(context).userDao() }
    val loginViewModel: LoginViewModel = viewModel(factory = LoginViewModel.Factory(userDao))

    var email by remember { mutableStateOf(\"\") }
    var password by remember { mutableStateOf(\"\") }
    var showPassword by remember { mutableStateOf(false) }

    val isLoading by loginViewModel.isLoading.collectAsState()
    val loginError by loginViewModel.loginError.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = \"Sign In\",
            style = MaterialTheme.typography.headlineLarge,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text(\"Email\") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text(\"Password\") },
            visualTransformation = if (showPassword) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            trailingIcon = {\n                val image = if (showPassword)\n                    Icons.Filled.Visibility\n                else Icons.Filled.VisibilityOff\n                IconButton(onClick = { showPassword = !showPassword }) {\n                    Icon(imageVector = image, contentDescription = if (showPassword) \"Hide password\" else \"Show password\")\n                }\n            },\n            leadingIcon = {\n                Icon(imageVector = Icons.Filled.Lock, contentDescription = \"Password icon\")\n            },\n            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = { loginViewModel.login(email, password) },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            enabled = !isLoading
        ) {
            if (isLoading) {
                CircularProgressIndicator(color = MaterialTheme.colorScheme.onPrimary, modifier = Modifier.size(24.dp))
            } else {
                Text(\"Sign In\", style = MaterialTheme.typography.titleMedium)
            }
        }

        loginError?.let { message ->
            Text(
                text = message,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier.padding(top = 8.dp)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = \"Forgot your password?\",
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.clickable { onForgotPasswordClick() }
        )
    }
}

@Preview(showBackground = true)
@Composable
fun PreviewLoginPage() {
    YourProjectNameTheme {
        LoginPage(onForgotPasswordClick = {
            println(\"Forgot password clicked!\")
        })
    }
}

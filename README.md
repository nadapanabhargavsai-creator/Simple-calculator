# 🧮 Simple Calculator

A modern, responsive, and robust calculator web application built with a **Java Spring Boot** backend and a **HTML/CSS/Vanilla JavaScript** frontend. 

The application utilizes a client-server architecture where the frontend handles the user interface and key inputs, while the backend computes the arithmetic expressions securely and handles edge cases like division by zero.

---

## ✨ Features

- **Standard Operations:** Addition (`+`), Subtraction (`-`), Multiplication (`×`), Division (`÷`), and Modulo (`%`).
- **Modern UI:** Responsive, clean, glassmorphic button grid design.
- **Keyboard Support:** Input numbers and operators directly from your physical keyboard.
- **Error Handling:** Safe division-by-zero checks on the backend returning clear warnings rather than system crashes.
- **Micro-interactions:** Interactive hover states and active animations on buttons.
- **Clean Architecture:** Separated Frontend (UI logic) and Backend (arithmetic evaluation service).

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Backend:** Java 17, Spring Boot 3.2.0, Maven
- **Communication:** REST API (JSON payloads)

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Java JDK 17** or higher
- **Apache Maven**
- A modern web browser

### Running the Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start running on `http://localhost:8080`.

### Running the Frontend

Since the frontend is built using standard web technologies, there's no need for npm installs or complicated builds:

1. Navigate to the `Frontend` directory.
2. Open `index.html` in any web browser (you can double-click the file or drag and drop it into your browser tab).
3. Start calculating!

---

## 🔌 API Documentation

The frontend communicates with the backend via a single REST endpoint.

### Calculate endpoint

- **URL:** `/api/calculate`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "num1": 8,
    "num2": 8,
    "operator": "*"
  }
  ```
- **Response Body (Success):**
  ```json
  {
    "result": 64.0
  }
  ```
- **Response Body (Error):**
  ```json
  {
    "error": "Division by zero is not allowed."
  }
  ```

---

## 📁 Project Structure

```text
Simple_calculator/
├── Backend/                 # Spring Boot application
│   ├── src/main/java/       # Java source files (Controller, Service, Request DTO)
│   ├── src/main/resources/  # Configuration properties
│   └── pom.xml              # Maven dependencies configuration
├── Frontend/                # UI interface files
│   ├── index.html           # Main structure
│   ├── Style.css            # Stylesheets
│   └── Script.js            # Frontend logic and API calls
└── .gitignore               # Ignored files for Git
```

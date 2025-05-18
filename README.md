# Social Chat Application

This project is developed to understand the workings of backend API authentication using JWT tokens and cookies, and how they play a critical role in web applications.

## 🚀 Project Overview
This project is a social chat application that allows users to:
- Signup and login to the platform.
- Onboard and manage user profiles.
- Make friends and maintain a friend list.
- Chat with friends in real-time.
- Initiate video streaming sessions with friends.

## 🛠️ Technologies Used
- Backend: Node.js, Express.js, JWT Authentication
- Frontend: React.js
- Database: MongoDB
- WebSockets for real-time messaging
- WebRTC for video streaming

## 📦 Installation and Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/social-chat-app.git
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Configure environment variables for backend:
    - Create a `.env` file in the `backend` folder and add the following:
    ```env
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    COOKIE_SECRET=<your-cookie-secret>
    ```

5. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

6. Start the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

## ✅ Features
- JWT Authentication and Authorization
- Secure Cookie Management
- Real-time Messaging
- Video Streaming using WebRTC

## 🤝 Contribution
Feel free to fork the repository and raise a PR for any feature suggestions or bug fixes.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

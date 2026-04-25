# 💬 Chatify – Anonymous Real-Time Chat Application

Chatify is a **full-stack real-time chat platform** designed to improve communication by enabling **anonymous interaction within group channels**. The system focuses on enhancing **psychological safety**, allowing users to ask questions and share ideas without fear of judgment.

---

## 📌 About the Project

Chatify is inspired by workplace communication challenges where individuals hesitate to speak openly. The platform introduces **anonymous messaging** to encourage participation and improve communication quality.


## 🚀 Key Features

- 🔐 User Authentication (Login/Signup)
- 💬 Real-time Messaging using Socket.io
- 👥 Channel-based Group Chat
- 🕵️ Anonymous Messaging (Identity hidden server-side)
- 📁 Media Sharing (uploads)
- 😀 Emoji Support
- 🟢 Online User Status
- 🕒 Message History Persistence
- 🔄 Session-based pseudonym system

---

## 🧠 Core Concept

Chatify implements **peer-anonymous communication**, where:
- User identity is **removed server-side before broadcasting**
- Messages are evaluated based on **content, not identity**
- Improves participation and reduces fear of judgment

---

## 🏗️ System Architecture

- Frontend: React (SPA)
- Backend: Node.js + Express
- Database: MongoDB
- Real-time: Socket.io

---

## 📂 Project Structure

```
FINAL_PROJECT/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── index.js
│   ├── socket.js
│   └── chatting.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── dist/
│   └── index.html
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```

---

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:
```bash
npm start
```

---

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Research Insights

From the conducted survey (N = 52):

- 📈 88% users prefer anonymous communication  
- 📈 83% increased participation  
- ⚠️ 52% concerned about misuse  
- 👍 81% would recommend Chatify  

---

## ⚠️ Challenges Identified

- Misuse / inappropriate content  
- Lack of accountability  
- Spam & message flooding  
- Toxic behavior  

---

## 🔮 Future Enhancements

- 🛡️ Content Moderation Panel  
- 🚨 Reporting System  
- ⏱️ Rate Limiting  
- 🔐 Hybrid Anonymity (Admin traceability)  
- 🧠 AI moderation  
- 🎥 Video/Voice Chat  

---

## 👨‍💻 Authors

- Paras Sanserwal  
- Hardik Bajaj  

Chitkara University, Punjab  

---

## 📄 License

This project is for academic and research purposes.

---

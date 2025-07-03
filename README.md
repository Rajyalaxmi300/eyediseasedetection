# 👁️ AI Eye Disease Detection

An intelligent, AI-powered platform that helps users analyze **retinal images** to detect common eye diseases such as **Glaucoma, Cataracts, Uveitis, and Bulging Eyes**. Designed with accessibility and efficiency in mind, this tool allows for instant screening, live doctor consultation, and chatbot assistance — all within a sleek and intuitive web interface.

🌐 **Live Site**: [eyediseasedetection-henna.vercel.app](https://eyediseasedetection-henna.vercel.app)

---

## 🖼️ Preview

### 📊 AI-generated detection results for uploaded retina images  

### 🎯 Central dashboard with quick analysis, chat, and live consult options  

### 🎥 Secure live consultation interface with video calling  

---

## ⚙️ Features

- 🧠 **AI-Based Disease Detection**  
  Upload retinal images and get real-time disease predictions using deep learning.

- 💬 **Chatbot Integration**  
  Get answers to common eye health queries via a conversational interface.

- 📞 **Live Video Consultation**  
  Instantly connect with a certified ophthalmologist for further guidance.

- 🧾 **Multi-Disease Prediction**  
  Detects: **Glaucoma**, **Uveitis**, **Cataracts**, **Bulging Eyes** with individual confidence scores.

- 📤 **Image Upload and Real-Time Results**  
  Simple, smooth, and instant analysis pipeline.

- 🌐 **Fully Responsive UI**  
  Built with modern design principles and mobile-friendly layouts.

---

## 🧪 Diseases Detected

| Disease         | Description |
|----------------|-------------|
| **Glaucoma**    | A group of eye conditions that damage the optic nerve. |
| **Cataracts**   | Clouding of the lens, leading to blurry vision. |
| **Uveitis**     | Inflammation of the middle layer of the eye (uvea). |
| **Bulging Eyes**| Abnormal protrusion of the eyeballs, often due to thyroid eye disease. |

---

## 🧰 Tech Stack

| Frontend        | Backend         | AI/ML Model |
|-----------------|------------------|-------------|
| HTML, CSS, JavaScript | Node.js + Express | TensorFlow / Keras |
| Bootstrap, Vanilla JS | REST APIs | Convolutional Neural Network (CNN) |
| Deployed via Vercel | Hosted Separately | Custom-trained on retina datasets |

---

## 🔍 How It Works

1. **Upload** a retinal image.
2. The image is processed by a **trained deep learning model**.
3. Model outputs predictions with **confidence scores**.
4. UI displays disease results + chatbot + video consult options.
5. **Low-confidence** cases prompt recommendation for a professional consult.

---

## 📁 Folder Structure

```bash
eyediseasedetection/
├── frontend/               # Frontend hosted on Vercel
│   ├── index.html
│   ├── styles/
│   ├── js/
│   └── assets/
├── backend/                # Node.js backend + Python ML model
│   ├── server.js
│   ├── routes/
│   ├── model/
│   │   ├── train_model.py
│   │   ├── model.h5
│   └── utils/

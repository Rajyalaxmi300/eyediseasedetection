👁️ AI Eye Disease Detection
An intelligent, AI-powered platform that helps users analyze retinal images to detect common eye diseases such as Glaucoma, Cataracts, Uveitis, and Bulging Eyes. Designed with accessibility and efficiency in mind, this tool allows for instant screening, live doctor consultation, and chatbot assistance — all within a sleek and intuitive web interface.

🌐 Live Site: eyediseasedetection-henna.vercel.app

🖼️ Preview
<p align="center"> <img src="/mnt/data/88e4556a-bf9e-493d-bc16-63b5d45311af.png" width="700"/> <br><em>📊 AI-generated detection results for uploaded retina images</em> </p> <p align="center"> <img src="/mnt/data/c2281e08-b6a7-45b2-a602-071fbda84508.png" width="700"/> <br><em>🎯 Central dashboard with quick analysis, chat, and live consult options</em> </p> <p align="center"> <img src="/mnt/data/2f666e01-4617-4cdd-b934-f8016adb5a29.png" width="700"/> <br><em>🎥 Secure live consultation interface with video calling</em> </p>
⚙️ Features
🧠 AI-Based Disease Detection
Upload retinal images and get real-time disease predictions using deep learning.

💬 Chatbot Integration
Get answers to common eye health queries via a conversational interface.

📞 Live Video Consultation
Instantly connect with a certified ophthalmologist for further guidance.

📈 Multi-Disease Prediction
Detects: Glaucoma, Uveitis, Cataracts, Bulging Eyes with individual confidence scores.

📤 Image Upload and Real-Time Results
Simple, smooth, and instant analysis pipeline.

🌐 Fully Responsive UI
Built with modern design principles and mobile-friendly layouts.

🧪 Diseases Detected
Disease	Description
Glaucoma	A group of eye conditions that damage the optic nerve.
Cataracts	Clouding of the lens, leading to blurry vision.
Uveitis	Inflammation of the middle layer of the eye (uvea).
Bulging Eyes	Abnormal protrusion of the eyeballs, often due to thyroid eye disease.

🧰 Tech Stack
Frontend	Backend	AI/ML Model
HTML, CSS, JavaScript	Node.js + Express	TensorFlow / Keras
Bootstrap, Vanilla JS	REST APIs	Convolutional Neural Network (CNN)
Deployed via Vercel	Hosted Separately	Custom-trained on retina datasets

🔍 How It Works
Upload a retinal image.

Image is sent to the backend and processed by a trained deep learning model.

Model outputs predictions with confidence scores.

UI displays disease results + offers chat or video consult options.

Low-confidence alerts are issued to encourage professional follow-up.

📁 Folder Structure
bash
Copy
Edit
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
🚀 Deployment
🔧 Frontend
bash
Copy
Edit
cd frontend
vercel deploy
⚙️ Backend
bash
Copy
Edit
cd backend
npm install
node server.js
⚠️ Make sure to set the proper CORS policies and connect the frontend with backend API endpoints.

📌 Future Enhancements
🔐 User Authentication for patient history tracking

🧾 PDF report generation with detection results

🌍 Multi-language support

📦 Docker containerization for complete deployment

🧑‍⚕️ Disclaimer
This tool is for educational and preliminary screening purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult with a licensed eye care provider for any medical concerns.

🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

📃 License
MIT License

📫 Contact
Feel free to reach out for feedback, suggestions, or collaboration:

Email: youremail@example.com
LinkedIn: Your Profile
Portfolio: Your Portfolio


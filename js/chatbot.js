// Chatbot responses database
const responses = {
    default: "I'm here to help with eye health questions. For medical advice, please consult a healthcare professional.",
    greeting: ["Hello!", "Hi there!", "How can I help you today?"],
    farewell: ["Goodbye!", "Take care!", "Have a great day!"],
    thanks: ["You're welcome!", "Happy to help!", "No problem at all!"],
    
    // Eye disease related responses
    "diabetes": "Diabetic retinopathy is a serious condition that can affect people with diabetes. Regular eye checkups are essential for early detection.",
    "cataract": "Cataracts cause clouding of the eye's natural lens. Common symptoms include blurred vision and difficulty seeing at night.",
    "glaucoma": "Glaucoma is a group of eye conditions that damage the optic nerve. Early detection through regular eye exams is crucial.",
    "symptoms": "Common eye problem symptoms include redness, pain, blurred vision, and light sensitivity. Please consult an eye doctor for proper diagnosis.",
    "prevention": "To maintain eye health: get regular checkups, wear UV protection, eat a healthy diet, and take screen breaks using the 20-20-20 rule.",
    "treatment": "Treatment options vary depending on the condition. Our AI can help screen for issues, but a doctor should determine the best treatment plan.",
    
    // Service related responses
    "upload": "You can upload your eye images for AI analysis on our Upload page. The system will provide a preliminary assessment.",
    "video": "Our video consultation service connects you with eye care professionals for remote examinations.",
    "appointment": "While we offer AI screening, we recommend scheduling regular appointments with eye care professionals.",
    "cost": "Our AI screening service is currently free. For professional consultations, please check with your healthcare provider about coverage.",
    
    // Error handling
    error: "I'm sorry, I didn't quite understand that. Could you please rephrase your question?"
};

// Helper function to find the best matching response
function findBestResponse(input) {
    const text = input.toLowerCase();
    
    // Check for greetings
    if (text.match(/^(hi|hello|hey|greetings)/))
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    
    // Check for farewells
    if (text.match(/^(bye|goodbye|see you|farewell)/))
        return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
    
    // Check for thanks
    if (text.match(/(thank|thanks|appreciate)/))
        return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
    
    // Check for specific keywords
    for (const [key, response] of Object.entries(responses)) {
        if (text.includes(key) && key !== 'default' && key !== 'error' && 
            !['greeting', 'farewell', 'thanks'].includes(key)) {
            return response;
        }
    }
    
    // If no specific match is found, look for general medical terms
    if (text.match(/(eye|vision|sight|blind|doctor|hospital|clinic)/))
        return responses.default;
    
    return responses.error;
}

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle form submission
document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, true);
        
        // Clear input
        input.value = '';
        
        // Add bot response with a small delay
        setTimeout(() => {
            const response = findBestResponse(message);
            addMessage(response);
        }, 500);
    }
}); 
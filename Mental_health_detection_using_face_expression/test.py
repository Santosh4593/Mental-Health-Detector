import streamlit as st
from deepface import DeepFace
from PIL import Image
import cv2
import numpy as np

# Load the pre-trained emotion detection model
model = DeepFace.build_model("Emotion")

# Define emotion labels
emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Define a simple user class to store user information
class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

# Define a session state to store user information
class SessionState:
    def __init__(self):
        self.user = None

# Initialize session state
session_state = SessionState()

def detect_emotion(img):
    # Convert image to grayscale
    gray_frame = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the face ROI (Region of Interest)
        face_roi = gray_frame[y:y + h, x:x + w]

        # Resize the face ROI to match the input shape of the model
        resized_face = cv2.resize(face_roi, (48, 48), interpolation=cv2.INTER_AREA)

        # Normalize the resized face image
        normalized_face = resized_face / 255.0

        # Reshape the image to match the input shape of the model
        reshaped_face = normalized_face.reshape(1, 48, 48, 1)

        # Predict emotions using the pre-trained model
        preds = model.predict(reshaped_face)[0]
        emotion_idx = preds.argmax()
        emotion = emotion_labels[emotion_idx]

        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(img, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        
        return img, emotion

def registration_page():
    st.title("Registration Page")
    username_reg = st.text_input("Username:")
    password_reg = st.text_input("Password:", type="password")

    if st.button("Register"):
        # Simple validation (you should add more comprehensive validation)
        if username_reg and password_reg:
            # Create a new user object
            new_user = User(username_reg, password_reg)

            # Simulate storing user information in session state
            session_state.user = new_user

            st.success("Registration successful! You can now log in.")

def login_page():
    st.title("Login Page")
    username_login = st.text_input("Username:")
    password_login = st.text_input("Password:", type="password")

    if st.button("Login"):
        # Simple validation (you should add more comprehensive validation)
        if session_state.user and session_state.user.username == username_login and session_state.user.password == password_login:
            st.success(f"Welcome, {username_login}! You are now logged in.")
            return True
        else:
            st.warning("Account not found. Redirecting to registration page.")
            return False

def main():
    st.title("Emotion Detection and User Authentication App")

    # Display login or registration page based on the user's authentication status
    if not session_state.user:
        selected_page = st.radio("Choose a page", ["Login", "Registration"])
        if selected_page == "Login":
            if not login_page():
                return
        elif selected_page == "Registration":
            registration_page()
            return

    # Image upload and emotion detection page
    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        # Read image and convert to numpy array
        image = cv2.imdecode(np.frombuffer(uploaded_file.read(), np.uint8), 1)

        # Perform emotion detection
        result_image, detected_emotion = detect_emotion(image)

        # Convert result_image to PIL Image
        pil_image = Image.fromarray(cv2.cvtColor(result_image, cv2.COLOR_BGR2RGB))

        # Display the resulting image
        st.image(pil_image, caption="Emotion Detection Result", use_column_width=True)

        # Print the detected emotion with increased font size and bold, center-aligned
        st.markdown(f"<p style='font-size:35px; text-align:center;'><strong>Detected Emotion:</strong> <strong>{detected_emotion}</strong></p>", unsafe_allow_html=True)

if __name__ == "__main__":
    main()

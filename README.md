# Haseen (حصين): An AI-Powered Arabic Fraud Detector

**Haseen** is an end-to-end AI system built to detect fraudulent SMS messages (Spam) in Arabic, with a specific focus on the Saudi dialect. The project includes a fine-tuned language model, a robust data engineering pipeline, and a production-ready API.

---

### **[➡️ View the Full Interactive Project Report](https://www.170.me/index2.html)**

---

## 📖 Project Overview

This project tackles the growing problem of SMS phishing and fraud targeting users in Saudi Arabia. It covers the complete machine learning lifecycle: from strategic data collection and augmentation to training advanced language models, solving complex engineering challenges, and deploying the final model as an interactive web service.

The goal was not just to build a model, but to engineer a reliable, scalable, and continuously improving system.

---

## ✨ Key Features

*   **Custom Fine-Tuned Model:** A BERT-based model was fine-tuned specifically on Arabic and Saudi dialect contexts, giving it a high-precision understanding of the nuances between legitimate and fraudulent texts.

*   **Advanced Training Methodology:** The project's training script implements **Early Stopping** to prevent overfitting and select the most generalizable version of the model, ensuring it performs well on unseen data.

*   **Strategic Data Engineering:** The dataset was "fortified" by systematically adding "hard examples," such as subtle, link-free fraudulent messages and legitimate texts that use urgent language. This significantly enhanced the model's intelligence and robustness.

*   **Full-Stack & API-Ready:**
    *   A powerful and efficient backend server was built with **FastAPI**, serving the model as a REST API ready for immediate integration.
    *   The backend was successfully connected to an interactive **React** frontend, resulting in a fully functional local web application.

---

## 🛠️ Core Engineering Challenges

The development journey involved solving real-world engineering problems that are common in the ML field.

### 1. The "Brittle" Model
*   **Problem:** The initial model, despite achieving high accuracy on the test set, failed to identify new and varied fraud techniques in practice. This was a classic case of overfitting on synthetic data.
*   **Solution:** This was diagnosed as a "diversity gap" in the data. The fix was an **Iterative Improvement Cycle**: performing adversarial testing, collecting failure cases, and retraining the model on the newly enriched dataset. This process transforms the model from "brittle" to "robust."

### 2. Local Environment Setup
*   **Problem:** We faced a series of complex errors when setting up the project locally on Windows, including Python version conflicts, libraries requiring a C++ compiler, and server startup issues.
*   **Solution:** Through **Systematic Diagnosis**, we resolved each issue methodically. This involved stabilizing the Python version (3.11), manually installing difficult libraries, and correcting run commands until the entire system was operational.

---

## 🔬 Evaluation, Limitations & Future Roadmap

### Current State: A Solid Proof of Concept
The current model is a successful **Proof of Concept** that validates the ability of the AraBERT architecture to understand complex fraud patterns. Its main limitation is **overfitting**, as it was primarily trained on synthetic data. This means its performance on novel, real-world fraud techniques is constrained.

### Future Roadmap
To overcome these limitations, a clear, multi-stage improvement plan is proposed:

1.  **Data-Centric Enhancement:** Collect and annotate real-world fraud and legitimate messages to improve the model's ability to generalize.
2.  **Advanced Training & Evaluation:** Implement K-Fold Cross-Validation for more reliable performance assessment and conduct systematic Hyperparameter Tuning.
3.  **Continuous Learning & Feedback Loop:** Transform the project into a **living system** by implementing a feedback loop that uses user-reported errors to periodically retrain and adapt the model.

---

## 🚀 Tech Stack

| Category           | Technologies                                                                   |
| ------------------ | ------------------------------------------------------------------------------ |
| **Machine Learning** | `Python 3.11`, `PyTorch`, `Hugging Face Transformers`, `Pandas`, `Scikit-learn`, `Faker` |
| **Backend & API**  | `FastAPI`, `Uvicorn`                                                           |
| **Frontend**       | `Node.js`, `React`, `Vite`                                                     |
| **DevOps & Tools**   | `Git`, `Git LFS`, `Google Colab`                                               |

---

## 🏁 Getting Started

To get a local copy of the full-stack application up and running, follow these steps.

### Prerequisites
*   Python 3.11+
*   Node.js and npm (or a compatible package manager)

### Installation & Setup

1.  **Clone the Repository:**
    ```sh
    git clone https://github.com/Mod578/arabic-spam-detector.git
    cd arabic-spam-detector
    ```

2.  **Setup the Backend (API Server):**
    *   Navigate to the backend directory:
        ```sh
        cd backend
        ```
    *   Create and activate a virtual environment:
        ```sh
        # For macOS/Linux
        python3 -m venv venv
        source venv/bin/activate

        # For Windows
        python -m venv venv
        venv\Scripts\activate
        ```
    *   Install the required Python packages:
        ```sh
        pip install -r requirements.txt
        ```
    *   **Keep this terminal open** and run the FastAPI server:
        ```sh
        uvicorn main:app --reload
        ```
    *   The API will now be running at `http://127.0.0.1:8000`.

3.  **Setup the Frontend (Web Interface):**
    *   **Open a new terminal window.**
    *   Navigate to the frontend directory from the project root:
        ```sh
        cd arabic-spam-detector/frontend
        ```
    *   Install the necessary Node.js packages:
        ```sh
        npm install
        ```
    *   Run the React development server:
        ```sh
        npm run dev
        ```
    *   The frontend will now be accessible in your browser, typically at `http://localhost:5173`. The application is now fully running.

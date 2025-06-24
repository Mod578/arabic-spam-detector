# Haseen (حصين): An AI-Powered Arabic Fraud Detector

**Haseen** is an end-to-end AI system built to detect fraudulent SMS messages (Spam) in Arabic, with a specific focus on the Saudi dialect. The project includes a fine-tuned language model, a robust data engineering pipeline, and a production-ready API.

**[View Project on GitHub](https://github.com/Mod578/arabic-spam-detector)**

---

## 📖 Project Overview

This project tackles the growing problem of SMS phishing and fraud targeting users in Saudi Arabia. It covers the complete machine learning lifecycle: from strategic data collection and augmentation to training advanced language models, solving complex engineering challenges, and deploying the final model as an interactive web service.

The goal was not just to build a model, but to engineer a reliable, scalable, and continuously improving system.

---

## ✨ Key Features

*   **Custom Fine-Tuned Model:** A BERT-based model was fine-tuned specifically on Arabic and Saudi dialect contexts, giving it a high-precision understanding of the nuances between legitimate and fraudulent texts.

*   **Advanced Training Methodology:** We implemented **Early Stopping** during training to prevent overfitting and select the most generalizable version of the model, ensuring it performs well on unseen data.

*   **Strategic Data Engineering:** The dataset was "fortified" by systematically adding "hard examples," such as subtle, link-free fraudulent messages and legitimate texts that use urgent language. This significantly enhanced the model's intelligence and robustness.

*   **Full-Stack & API-Ready:**
    *   A powerful and efficient backend server was built with **FastAPI**, serving the model as a REST API ready for immediate integration.
    *   The backend was successfully connected to an interactive **React** frontend, resulting in a fully functional local web application.

---

## 🛠️ Core Engineering Challenges

The development journey involved solving real-world engineering problems that are common in the ML field.

### 1. The "Brittle" Model
*   **Problem:** The initial model, despite achieving high accuracy on the test set, failed to identify new and varied fraud techniques in practice. This was a classic case of overfitting on synthetic data.
*   **Solution:** We diagnosed this as a "diversity gap" in our data. The fix was an **Iterative Improvement Cycle**: we performed adversarial testing, collected the failure cases, and retrained the model on the newly enriched dataset. This process transformed the model from "brittle" to "robust."

### 2. Local Environment Setup
*   **Problem:** We faced a series of complex errors when setting up the project locally on Windows, including Python version conflicts, libraries requiring a C++ compiler, and server startup issues.
*   **Solution:** Through **Systematic Diagnosis**, we resolved each issue methodically. This involved stabilizing the Python version (to 3.11), manually installing difficult libraries, and correcting run commands until the entire system was operational.

---

## 🔬 Evaluation, Limitations & Future Roadmap

### Current State: A Solid Proof of Concept
The current model is a successful **Proof of Concept** that validates the ability of the AraBERT architecture to understand complex fraud patterns. Its main limitation is **overfitting**, as it was primarily trained on synthetic data. This means its performance on novel, real-world fraud techniques is constrained.

### Future Roadmap
To overcome these limitations, we have a clear, multi-stage improvement plan:

1.  **Data-Centric Enhancement:**
    *   Collect and annotate real-world fraud and legitimate messages.
    *   Diversify the dataset with a wider range of fraud techniques and Arabic dialects.
    *   Build a strong "negative" dataset to minimize false positives.

2.  **Advanced Training & Evaluation:**
    *   Implement **K-Fold Cross-Validation** for a more reliable performance assessment.
    *   Conduct systematic **Hyperparameter Tuning** to optimize the training process.
    *   Establish a "Golden Test Set" of unseen, real-world data to serve as the true benchmark for model efficacy.

3.  **Continuous Learning & Feedback Loop:**
    *   The most critical step is to transform the project from a static model into a **living system**.
    *   We will implement a **feedback loop** allowing end-users to report classification errors (both false positives and false negatives).
    *   This feedback will be collected, verified, and used to **periodically retrain** the model, ensuring it continuously adapts to the latest fraud tactics.

---

## 🚀 Tech Stack

| Category           | Technologies                                                                   |
| ------------------ | ------------------------------------------------------------------------------ |
| **Machine Learning** | `Python 3.11`, `PyTorch`, `Hugging Face Transformers`, `Pandas`, `Scikit-learn`    |
| **Backend & API**  | `FastAPI`, `Uvicorn`                                                           |
| **Frontend**       | `Node.js`, `React`, `Vite`                                                     |
| **DevOps & Tools**   | `Git`, `Git LFS`                                                               |

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
*   Python 3.11+
*   Node.js and npm

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/Mod578/arabic-spam-detector.git
    cd arabic-spam-detector
    ```

2.  **Setup the Backend (in the `backend` directory):**
    ```sh
    # Navigate to backend folder
    cd backend

    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

    # Install Python dependencies
    pip install -r requirements.txt

    # Run the FastAPI server
    uvicorn main:app --reload
    ```

3.  **Setup the Frontend (in the `frontend` directory):**
    ```sh
    # Navigate to frontend folder from the root directory
    cd ../frontend

    # Install NPM packages
    npm install

    # Run the React development server
    npm run dev
    ```

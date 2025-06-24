# Haseen (حصين): An AI-Powered Arabic Fraud Detector

**Haseen** is an end-to-end AI system built to detect fraudulent SMS messages (Spam) in Arabic, with a specific focus on the Saudi dialect.

---

### **[➡️ View the Full Interactive Project Report](https://mod578.github.io/arabic-spam-detector/)**

*(Note: Replace the link above with the link to your live GitHub Pages site once deployed)*

---

## 📖 Project Overview

This project tackles the growing problem of SMS phishing and fraud. It covers the complete machine learning lifecycle: from strategic data generation and model training to solving engineering challenges and preparing the model for deployment.

The core challenge identified was the model's overfitting on synthetic data. The project documents this limitation and lays out a clear, data-centric roadmap for future improvements, focusing on real-world data and a continuous learning feedback loop.

## 🚀 Tech Stack

*   **Data Generation:** Python, Pandas, Faker
*   **Machine Learning:** PyTorch, Hugging Face Transformers, Scikit-learn
*   **Deployment (Simulated):** The project is structured with a `final_model` directory, ready to be served by a backend like FastAPI.

## 🏁 Getting Started

This project consists of two main Jupyter notebooks:

1.  `faker-data.ipynb`: Generates the synthetic dataset (`saudi_spam_ham_dataset.csv`).
2.  `AraBert_spam.ipynb`: Loads the generated data, trains the model using a robust methodology (including early stopping), and saves the best model for deployment.

### To run this project:
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Mod578/arabic-spam-detector.git
    cd arabic-spam-detector
    ```
2.  **Open in Google Colab:**
    *   Upload both `faker-data.ipynb` and `AraBert_spam.ipynb` to your Google Colab environment.
3.  **Run `faker-data.ipynb` first:**
    *   This will create the `saudi_spam_ham_dataset.csv` file required for training. Download this file.
4.  **Run `AraBert_spam.ipynb`:**
    *   Upload the `saudi_spam_ham_dataset.csv` file to the same Colab session where you are running this notebook.
    *   Execute all cells to train the model and see the final evaluation. The best model will be saved in the `haseen-spam-classifier` directory.

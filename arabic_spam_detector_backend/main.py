# =================================================================
# main.py - The Final, Clean, and Error-Free Version
# =================================================================

import os
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# --- 1. FastAPI App Setup ---
app = FastAPI(
    title="Arabic Spam Detection API",
    description="An API to analyze Arabic text and detect potential fraud.",
    version="1.0.0"
)

# --- 2. CORS Middleware Configuration ---
# This is crucial for allowing the frontend (React/Vite) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, suitable for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. Load the Fine-Tuned Model and Tokenizer ---
MODEL_DIR = "./final_spam_classifier_model"
tokenizer = None
model = None
device = None

# This block ensures the model is loaded only once when the server starts.
@app.on_event("startup")
def load_model():
    global tokenizer, model, device
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    if os.path.exists(MODEL_DIR):
        try:
            tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
            model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
            model.to(device)
            model.eval() # Set the model to evaluation mode
            print("INFO:     Model and Tokenizer loaded successfully from local directory!")
        except Exception as e:
            print(f"ERROR:    Failed to load model. Error: {e}")
    else:
        print(f"ERROR:    Model directory not found at {MODEL_DIR}")


# --- 4. Define Request and Response Data Structures ---
class TextInput(BaseModel):
    text_to_analyze: str

class AnalysisResponse(BaseModel):
    analysis_report: str


# --- 5. Report Generation Logic ---
def generate_report(text: str) -> str:
    # Check if the model was loaded successfully during startup
    if not model or not tokenizer:
        return "## خطأ في الخادم\n\nلم يتم تحميل النموذج بنجاح. يرجى مراجعة سجلات الخادم الخلفي."

    # Tokenize and predict
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
    with torch.no_grad():
        logits = model(**inputs).logits
        prediction_idx = torch.argmax(logits, dim=1).item()
    
    is_spam = (prediction_idx == 1)

    # Using parenthesized strings to be immune to indentation errors
    if is_spam:
        report = (
            "## تقييم مستوى الخطورة الإجمالي:\n"
            "مرتفع جداً\n\n"
            "## المؤشرات المثيرة للقلق:\n"
            "- تم تحديد النمط اللغوي على أنه يطابق أساليب الاحتيال المعروفة.\n"
            "- استخدام عبارات تهدف إلى خلق شعور بالإلحاح أو الخوف.\n\n"
            "## شرح المخاطر:\n"
            "هذا النص يهدف على الأرجح إلى سرقة معلوماتك الشخصية أو المالية.\n\n"
            "## التوصيات والإجراءات المقترحة:\n"
            "- **لا تقم بالرد على هذه الرسالة أو الضغط على أي روابط.**\n"
            "- **احظر المرسل فوراً.**"
        )
    else:
        report = (
            "## تقييم مستوى الخطورة الإجمالي:\n"
            "منخفض جداً\n\n"
            "## المؤشرات المثيرة للقلق:\n"
            "- لم يتم العثور على مؤشرات احتيال واضحة في النص.\n\n"
            "## شرح المخاطر:\n"
            "يبدو أن هذا النص آمن ولا يمثل تهديدًا مباشرًا.\n\n"
            "## التوصيات والإجراءات المقترحة:\n"
            "- يمكنك التعامل مع هذه الرسالة بشكل طبيعي مع أخذ الحيطة."
        )
    
    return report


# --- 6. API Endpoints ---
@app.post("/analyze", response_model=AnalysisResponse)
def analyze_text_endpoint(request: TextInput):
    """
    Receives text from the frontend, analyzes it, and returns a detailed report.
    """
    report_content = generate_report(request.text_to_analyze)
    return AnalysisResponse(analysis_report=report_content)

@app.get("/")
def read_root():
    """
    Root endpoint to check if the API is running.
    """
    if model and tokenizer:
        return {"message": "Arabic Spam Detection API is running and model is loaded."}
    else:
        return {"message": "Arabic Spam Detection API is running, but there was an error loading the model."}
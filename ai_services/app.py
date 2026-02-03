from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add model directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'model'))

from gender_model import predict

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify")
async def classify_gender(file: UploadFile = File(...)):
    try:
        # Load image bytes
        image_bytes = await file.read()
        gender = predict(image_bytes)

        # Return the result
        return {"gender": gender, "success": True}
    except Exception as e:
        return {"error": str(e), "success": False}

@app.get("/health")
def health_check():
    return {"status": "ok"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
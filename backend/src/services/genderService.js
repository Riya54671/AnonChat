import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const verifyGender = async (imagePath) => {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Create FormData
    const form = new FormData();
    form.append("file", imageBuffer, "image.jpg");

    console.log("Sending image to AI service at http://localhost:8000/classify");

    // Call the FastAPI service with a timeout
    const response = await axios.post(
      "http://localhost:8000/classify",
      form,
      {
        headers: form.getHeaders(),
        timeout: 5000
      }
    );

    console.log("AI service response:", response.data);

    return {
      gender: response.data.gender,
      success: response.data.success,
    };
  } catch (err) {
    // Provide detailed logging for debugging
    if (err.response) {
      console.error("AI service returned error:", err.response.status, err.response.data);
      throw new Error(`AI service error ${err.response.status}: ${JSON.stringify(err.response.data)}`);
    } else if (err.request) {
      console.error("No response from AI service:", err.message);
      throw new Error("No response from AI service: " + err.message);
    } else {
      console.error("Error calling gender classification service:", err.message);
      throw new Error("Failed to verify gender: " + err.message);
    }
  } finally {
    // Attempt to remove the temporary uploaded file to avoid disk buildup
    try {
      if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    } catch (e) {
      console.warn("Failed to remove temp image:", e && e.message);
    }
  }
};

export default { verifyGender };


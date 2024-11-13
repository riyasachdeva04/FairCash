from dotenv import load_dotenv

load_dotenv()
import base64
import streamlit as st
import os
import io
from PIL import Image
import pdf2image
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(input, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input, pdf_content[0], prompt])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        images = pdf2image.convert_from_bytes(uploaded_file.read())

        first_page = images[0]

        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode() 
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")


st.set_page_config(page_title="Resume Scorer")
st.header("ATS System")
input_text = st.text_area("Job Description: ", key="input")
uploaded_file = st.file_uploader("Upload your resume(PDF)...", type=["pdf"])

if uploaded_file is not None:
    st.write("PDF Uploaded Successfully")

submit1 = st.button("Tell Me About the Resume")
submit2 = st.button("How Can I Improvise my Skills")  
submit3 = st.button("Percentage match")

# Prompt for Resume Review (submit1)
input_prompt1 = """
You are a seasoned Technical Human Resources Manager with a deep understanding of job requirements and candidate profiles. Your task is to evaluate the provided resume against the job description in detail. Please assess the candidate's qualifications and experience in the context of the role’s key skills and requirements. 
- Provide a professional evaluation on whether the candidate’s profile aligns with the role.
- Highlight the candidate’s strengths and weaknesses based on their qualifications, experience, and specific skills.
- Identify any missing skills or qualifications that are critical for the role and provide actionable feedback.
"""

# Prompt for ATS Percentage Match (submit3)
input_prompt3 = """
You are an expert in ATS (Applicant Tracking Systems), particularly in how these systems assess resumes based on job descriptions. Your task is to evaluate the uploaded resume against the provided job description. 
- First, provide the percentage match between the resume and the job description based on keyword and skill alignment.
- List any relevant keywords or skills missing in the resume.
- Conclude with actionable thoughts for improving the resume’s chances of passing through an ATS, such as adding critical keywords or reformatting sections for better clarity.
"""

# Prompt for Skill Improvement Suggestions (submit2)
input_prompt2 = """
You are a career coach specialized in technical roles. Your task is to provide feedback on how the candidate can improve their skill set to be better aligned with the job description. 
- Based on the resume and job description, suggest specific technical and soft skills the candidate should focus on to increase their chances of landing the role.
- Recommend certifications, training, or online courses that could enhance the candidate’s profile.
- Provide suggestions for improving the resume, such as formatting, highlighting achievements, or adding specific keywords to better reflect the required skills.
"""

if submit1:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_gemini_response(input_prompt1, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")

elif submit2:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_gemini_response(input_prompt2, pdf_content, input_text)
        st.subheader("Suggestions for Improvement")
        st.write(response)
    else:
        st.write("Please upload the resume")

elif submit3:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_gemini_response(input_prompt3, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")

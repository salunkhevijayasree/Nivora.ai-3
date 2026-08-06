import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

if (!apiKey) {
  console.warn('⚠️  Missing GEMINI_API_KEY in .env — AI features will be disabled');
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generate a text response from Gemini.
 */
export async function generateText(prompt: string, systemInstruction?: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are a medical AI assistant for NIVORA AI Hospital Workflow Platform.',
        temperature: 0.4,
        maxOutputTokens: 2048,
      },
    });

    return response.text || 'No response generated.';
  } catch (error: any) {
    console.error('Gemini API error:', error.message);
    return `AI service temporarily unavailable: ${error.message}`;
  }
}

/**
 * AI Triage: Analyze symptoms and return structured triage data.
 */
export async function analyzeSymptoms(symptoms: string): Promise<{
  conditions: string[];
  priority: 'Emergency' | 'High' | 'Medium' | 'Low';
  department: string;
  waitTimeMinutes: number;
  recommendation: string;
}> {
  const prompt = `
You are a hospital triage AI. A patient describes: "${symptoms}"

Return ONLY a valid JSON object (no markdown, no code fences) with:
{
  "conditions": ["list of possible conditions"],
  "priority": "Emergency|High|Medium|Low",
  "department": "target department name",
  "waitTimeMinutes": estimated wait time as number,
  "recommendation": "brief medical recommendation"
}`;

  const result = await generateText(prompt, 'You are a clinical triage AI. Output valid JSON only.');
  try {
    const cleaned = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      conditions: ['Unable to parse symptoms'],
      priority: 'Medium',
      department: 'General Medicine',
      waitTimeMinutes: 30,
      recommendation: 'Please consult with a doctor for proper diagnosis.',
    };
  }
}

/**
 * AI Insurance Verification: Analyze an insurance document.
 */
export async function verifyInsurance(documentText: string): Promise<{
  status: 'Approved' | 'Requires_Manual_Review' | 'Rejected';
  confidenceScore: number;
  coveredAmount: number;
  notes: string;
}> {
  const prompt = `
Analyze this insurance document text and determine coverage:
"${documentText}"

Return ONLY valid JSON:
{
  "status": "Approved|Requires_Manual_Review|Rejected",
  "confidenceScore": number between 0-100,
  "coveredAmount": estimated covered amount as number,
  "notes": "brief explanation"
}`;

  const result = await generateText(prompt, 'You are a hospital insurance verification AI. Output valid JSON only.');
  try {
    const cleaned = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      status: 'Requires_Manual_Review',
      confidenceScore: 0,
      coveredAmount: 0,
      notes: 'Could not automatically verify. Manual review required.',
    };
  }
}

/**
 * AI Discharge Summary Generator
 */
export async function generateDischargeSummary(patientData: {
  name: string;
  diagnosis: string;
  medications: string;
  visitNotes: string;
}): Promise<string> {
  const prompt = `
Generate a professional medical discharge summary:
Patient: ${patientData.name}
Diagnosis: ${patientData.diagnosis}
Current Medications: ${patientData.medications}
Visit Notes: ${patientData.visitNotes}

Include: Summary, Treatment Given, Medications on Discharge, Follow-up Instructions, Diet & Activity Restrictions.
Format as a clean medical document.`;

  return await generateText(prompt, 'You are a clinical documentation AI. Generate professional medical discharge summaries.');
}

export default ai;

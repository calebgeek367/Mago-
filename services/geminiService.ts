import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client
// The API key is obtained exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_TEXT = 'gemini-2.5-flash';
const MODEL_IMAGE = 'gemini-2.5-flash-image';
const MODEL_REASONING = 'gemini-2.5-flash'; // Good enough for trends

export const generateTitles = async (topic: string, tone: string): Promise<string[]> => {
  const prompt = `Gere 10 títulos altamente clicáveis e virais para um vídeo do YouTube sobre "${topic}". 
  O tom deve ser ${tone}. 
  Retorne APENAS a lista de títulos, um por linha, sem numeração ou texto adicional.
  Use gatilhos mentais como curiosidade, urgência e benefício.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
      config: {
        temperature: 0.8,
        candidateCount: 1,
      }
    });
    const text = response.text || '';
    return text.split('\n').filter(line => line.trim().length > 0).map(t => t.replace(/^[-*•\d\.]+\s+/, ''));
  } catch (error) {
    console.error("Error generating titles:", error);
    throw error;
  }
};

export const generateScript = async (title: string, duration: string): Promise<string> => {
  const prompt = `Crie um roteiro completo para um vídeo do YouTube com o título: "${title}".
  Duração estimada: ${duration}.
  Estrutura:
  1. Gancho (Hook) - 0:00 a 0:30
  2. Introdução - 0:30 a 1:00
  3. Conteúdo Principal (dividido em 3 pontos chave)
  4. Conclusão e CTA (Call to Action)
  
  Formate usando Markdown com negrito para as seções. Seja direto e engajador.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
    });
    return response.text || 'Erro ao gerar roteiro.';
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

export const generateTags = async (topic: string): Promise<string[]> => {
  const prompt = `Gere 20 tags de SEO de alta conversão para um vídeo sobre "${topic}".
  Retorne as tags separadas por vírgula. Apenas as tags.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: prompt,
    });
    const text = response.text || '';
    return text.split(',').map(t => t.trim());
  } catch (error) {
    console.error("Error generating tags:", error);
    throw error;
  }
};

export const analyzeTrends = async (topic: string): Promise<any[]> => {
  // We ask Gemini to simulate/estimate trend data for visualization purposes
  const prompt = `Aja como um analista de dados do YouTube. Estime o interesse de busca e a competição para o nicho "${topic}" ao longo dos próximos 6 meses.
  
  Retorne os dados estritamente em formato JSON seguindo este schema:
  Array de objetos, onde cada objeto tem:
  - "month" (string, ex: "Jan")
  - "interest" (number, 0-100)
  - "competition" (number, 0-100)
  
  Gere 6 meses de dados.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_REASONING,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              month: { type: Type.STRING },
              interest: { type: Type.NUMBER },
              competition: { type: Type.NUMBER },
            },
            required: ['month', 'interest', 'competition']
          }
        }
      }
    });
    
    // The SDK returns the raw JSON string in .text
    const jsonStr = response.text || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing trends:", error);
    return [];
  }
};

export const generateThumbnailConcept = async (topic: string): Promise<{prompt: string, imageBase64?: string}> => {
  // First, generate a detailed image prompt
  const textPrompt = `Descreva uma thumbnail de YouTube altamente clicável, vibrante e contrastante para um vídeo sobre "${topic}".
  A descrição deve ser em Inglês (para melhor geração de imagem), detalhada, descrevendo a composição, expressões faciais, cores e texto na imagem.`;
  
  try {
    const promptResponse = await ai.models.generateContent({
      model: MODEL_TEXT,
      contents: textPrompt,
    });
    
    const imagePrompt = promptResponse.text || `A viral youtube thumbnail about ${topic}`;

    // Now generate the actual image
    const imageResponse = await ai.models.generateContent({
      model: MODEL_IMAGE,
      contents: imagePrompt,
      config: {
        // Nano banana models do not support responseMimeType or imageConfig for aspect ratio in the same way via generateContent
        // But we can try to guide it via prompt or just use defaults. 
        // Per docs, gemini-2.5-flash-image is used via generateContent.
      }
    });

    // Extract image
    let base64Image = undefined;
    if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
        }
      }
    }

    return {
      prompt: imagePrompt,
      imageBase64: base64Image
    };

  } catch (error) {
    console.error("Error generating thumbnail:", error);
    throw error;
  }
}

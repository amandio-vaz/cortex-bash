import { GoogleGenAI, Chat, Type } from "@google/genai";
import { ValidationResult } from '../types';

const getAi = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeScript = async (script: string): Promise<string> => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analise o seguinte script Bash. Forneça feedback sobre possíveis bugs, inconsistências de estilo e sugira melhorias. Formate sua resposta como Markdown, incluindo trechos de código quando apropriado.\n\n\`\`\`bash\n${script}\n\`\`\``
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing script:", error);
        throw error;
    }
};

export const improveScript = async (script: string): Promise<string> => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Você é um engenheiro especialista em Bash. Revise e melhore o seguinte script Bash. Seu objetivo é torná-lo mais robusto, eficiente e legível, seguindo as melhores práticas modernas. Forneça o script melhorado dentro de um bloco de código \`\`\`bash, seguido por uma lista detalhada com marcadores explicando as mudanças.\n\n**Script Original:**\n\`\`\`bash\n${script}\n\`\`\``
        });
        return response.text;
    } catch (error) {
        console.error("Error improving script:", error);
        throw error;
    }
};

export const generateScript = async (prompt: string): Promise<string> => {
    const langInstruction = `
### Requisitos de Comentários (Português do Brasil - pt-BR)
- O script DEVE ser extensiva e claramente comentado em Português do Brasil (pt-BR).
- Adicione um bloco de cabeçalho detalhado explicando o propósito do script, como usá-lo e quaisquer dependências.
- Comente cada função ou bloco lógico para descrever seu propósito e funcionamento.
- Forneça comentários detalhados para quaisquer comandos, pipelines ou algoritmos complexos.
- Explique a estratégia de tratamento de erros, detalhando o que cada verificação de erro faz e por quê.`;
    
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Você é um especialista de classe mundial em engenharia Bash. Sua tarefa é gerar um script Bash de alta qualidade e pronto para produção com base na solicitação do usuário. O script deve ser robusto, idempotente quando aplicável e incluir um excelente tratamento de erros.

${langInstruction}

**Solicitação do Usuário:** "${prompt}"`,
            config: {
                thinkingConfig: { thinkingBudget: 32768 }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating script:", error);
        throw error;
    }
};

export const validateScript = async (script: string): Promise<ValidationResult> => {
    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the following Bash script for a range of issues.
- **Syntax Errors**: Identify critical syntax mistakes that would prevent the script from running. Use 'error' severity.
- **Security Vulnerabilities**: Find common security risks like command injection, unquoted variables in sensitive contexts, or unsafe use of temp files. Use 'error' or 'warning' severity depending on impact.
- **Performance & Efficiency**: Detect performance bottlenecks (e.g., commands in tight loops) and inefficient practices (e.g., "useless use of cat"). Use 'performance' severity.

Respond ONLY with a JSON object that adheres to the provided schema.

**IMPORTANT**: Set \`isValid\` to \`false\` only if you find one or more issues with \`severity: 'error'\`. If you only find 'warning' or 'performance' issues, set \`isValid\` to \`true\`. If there are no issues at all, return \`isValid: true\` and an empty \`issues\` array.

Script:
\`\`\`bash
${script}
\`\`\`
`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isValid: { type: Type.BOOLEAN },
                        issues: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    line: { type: Type.INTEGER, description: "The line number of the issue, or null if it's a general script issue.", nullable: true },
                                    message: { type: Type.STRING, description: "A clear description of the issue." },
                                    severity: { type: Type.STRING, enum: ['error', 'warning', 'performance'], description: "The severity of the issue." }
                                },
                                required: ['message', 'severity']
                            }
                        }
                    },
                    required: ['isValid', 'issues']
                }
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText) as ValidationResult;
        return result;

    } catch (error) {
        console.error("Error validating script:", error);
        return {
            isValid: false,
            issues: [{
                line: null,
                message: "The AI validation service failed to analyze the script.",
                severity: 'error'
            }]
        };
    }
};

let chatInstance: Chat | null = null;

export const getChatResponse = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
    try {
        const ai = getAi();
        
        if (!chatInstance) {
            const systemInstruction = "Você é um assistente prestativo e amigável, especializado em scripts Bash e ferramentas de linha de comando. Responda às perguntas de forma clara e concisa.";
            
            chatInstance = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
                history: history,
            });
        }
        const response = await chatInstance.sendMessage({ message: newMessage });
        return response.text;
    } catch (error) {
        console.error("Error in chat:", error);
        chatInstance = null;
        throw error;
    }
};
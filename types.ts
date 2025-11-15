
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum ActiveView {
  Assistant = 'ASSISTANT',
  Chat = 'CHAT',
  Generator = 'GENERATOR',
}

export interface ValidationIssue {
  line: number | null;
  message: string;
  severity: 'error' | 'warning' | 'performance';
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}

export type CustomizableAction = 
  | 'analyze' 
  | 'improve' 
  | 'validate' 
  | 'assistantTab' 
  | 'generatorTab' 
  | 'chatTab' 
  | 'generateAction';

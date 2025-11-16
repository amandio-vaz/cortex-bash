export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum ActiveView {
  Assistant = 'ASSISTANT',
  Chat = 'CHAT',
  Generator = 'GENERATOR',
  KnowledgeBase = 'KNOWLEDGE_BASE',
  ApiTesting = 'API_TESTING',
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
  | 'execute'
  | 'runInTerminal'
  | 'assistantTab' 
  | 'generatorTab' 
  | 'chatTab'
  | 'knowledgeBaseTab'
  | 'generateAction'
  | 'addDocstrings'
  | 'optimizePerformance'
  | 'checkSecurity'
  | 'testApi'
  | 'apiTestingTab'
  | 'clearScript';

export type TemplateCategory = 'file' | 'system' | 'network' | 'utility' | 'api';

export interface ScriptTemplate {
  id: string;
  nameKey: string;
  descriptionKey: string;
  prompt: string;
  category: TemplateCategory;
}

export interface ScriptHistoryEntry {
  timestamp: number;
  content: string;
}

// --- GitHub Integration Types ---

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  content?: string;
}

export interface Gist {
  id: string;
  html_url: string;
  files: { [key: string]: GistFile };
  description: string;
  owner: GithubUser;
  public: boolean;
  created_at: string;
  updated_at: string;
}

// --- Knowledge Base Types ---

export interface CommandEntry {
  command: string;
  description: string;
  example: string;
}

export interface KnowledgeCategory {
  displayName: string;
  commands: CommandEntry[];
}

// --- Editor Theme Types ---

export interface EditorTheme {
  name: string;
  isDark: boolean;
  colors: {
    editorBg: string;
    editorGutterBg: string;
    editorText: string;
    lineNumbers: string;
    resultBg: string;
    resultText: string;
    resultTitle: string;
    codeBg: string;
    codeText: string;
    highlightError: string;
    highlightWarning: string;
    highlightPerformance: string;
    scrollbarThumb: string;
    scrollbarThumbHover: string;
    scrollbarTrack: string;
  };
}
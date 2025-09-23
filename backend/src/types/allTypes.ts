export interface KnowledgeBaseEntryI {
    id: string;
    document: string;
    embedding: number[];
    type: string;
};

export interface MessageMetricsI {
  promptTokens: number
  completionTokens: number
  totalTime: number
}

export interface MessageI {
  role: "user" | "bot"
  content: string
  important: boolean
}


export interface AIInputI {
  role: "assistant" | "user";
  content: string;
}[]

export const CHUNK_TYPES = {
  UNDERGRADUATE_PROGRAM_OFFERED: "Details about the undergraduate program offered by UTM",
  UNDERGRADUATE_ENTRY_REQ: "Overview of undergraduate entry requirements",
  UNDERGRADUATE_FEES: "Introduction to undergraduate fees",
};
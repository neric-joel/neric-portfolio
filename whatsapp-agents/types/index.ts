export interface Group {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: number;
  slug: string;
  display_name: string;
  backend: string;
  model: string;
  system_prompt: string;
  enabled: number;
}

export interface Message {
  id: number;
  group_id: number;
  sender_type: "user" | "agent" | "system";
  sender_agent_id: number | null;
  content: string;
  status: string;
  parent_message_id: number | null;
  created_at: string;
}

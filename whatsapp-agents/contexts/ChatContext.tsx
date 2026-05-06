"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Agent, Group, Message } from "@/types";

type ApiGroup = Group & {
  createdAt?: string;
  updatedAt?: string;
};

type ApiAgent = Omit<Agent, "enabled"> & {
  displayName?: string;
  systemPrompt?: string;
  enabled?: boolean | number;
};

type ApiMessage = Message & {
  groupId?: number;
  senderType?: Message["sender_type"];
  senderAgentId?: number;
  parentMessageId?: number;
  createdAt?: string;
};

interface ChatContextValue {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  activeGroupId: number | null;
  setActiveGroupId: React.Dispatch<React.SetStateAction<number | null>>;
  messages: Record<number, Message[]>;
  setMessagesForGroup: (groupId: number, messages: Message[]) => void;
  appendMessage: (groupId: number, message: Message) => void;
  updateMessage: (
    groupId: number,
    messageId: number,
    updater: (message: Message) => Message,
  ) => void;
  appendTokenToMessage: (groupId: number, messageId: number, token: string) => void;
  streamingMessageIds: Set<number>;
  setMessageStreaming: (messageId: number, streaming: boolean) => void;
  agentsInGroup: Agent[];
  setAgentsInGroup: React.Dispatch<React.SetStateAction<Agent[]>>;
  allAgents: Agent[];
  setAllAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  refreshGroups: () => Promise<void>;
  refreshAllAgents: () => Promise<void>;
  refreshAgentsInGroup: (groupId?: number | null) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

function normalizeGroup(group: ApiGroup): Group {
  return {
    id: group.id,
    name: group.name,
    created_at: group.created_at ?? group.createdAt ?? "",
    updated_at: group.updated_at ?? group.updatedAt ?? "",
  };
}

export function normalizeAgent(agent: ApiAgent): Agent {
  return {
    id: agent.id,
    slug: agent.slug,
    display_name: agent.display_name ?? agent.displayName ?? agent.slug,
    backend: agent.backend,
    model: agent.model,
    system_prompt: agent.system_prompt ?? agent.systemPrompt ?? "",
    enabled:
      typeof agent.enabled === "boolean"
        ? agent.enabled
          ? 1
          : 0
        : agent.enabled ?? 1,
  };
}

export function normalizeMessage(message: ApiMessage): Message {
  return {
    id: message.id,
    group_id: message.group_id ?? message.groupId ?? 0,
    sender_type: message.sender_type ?? message.senderType ?? "system",
    sender_agent_id: message.sender_agent_id ?? message.senderAgentId ?? null,
    content: message.content,
    status: message.status,
    parent_message_id: message.parent_message_id ?? message.parentMessageId ?? null,
    created_at: message.created_at ?? message.createdAt ?? new Date().toISOString(),
  };
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [streamingMessageIds, setStreamingMessageIds] = useState<Set<number>>(
    () => new Set(),
  );
  const [agentsInGroup, setAgentsInGroup] = useState<Agent[]>([]);
  const [allAgents, setAllAgents] = useState<Agent[]>([]);

  const refreshGroups = useCallback(async () => {
    const response = await fetch("/api/groups");
    if (!response.ok) {
      throw new Error("Failed to load groups");
    }
    const data = (await response.json()) as ApiGroup[];
    setGroups(data.map(normalizeGroup));
  }, []);

  const refreshAllAgents = useCallback(async () => {
    const response = await fetch("/api/agents");
    if (!response.ok) {
      throw new Error("Failed to load agents");
    }
    const data = (await response.json()) as ApiAgent[];
    setAllAgents(data.map(normalizeAgent));
  }, []);

  const refreshAgentsInGroup = useCallback(
    async (groupId: number | null = activeGroupId) => {
      if (groupId === null) {
        setAgentsInGroup([]);
        return;
      }
      const response = await fetch(`/api/groups/${groupId}/agents`);
      if (!response.ok) {
        throw new Error("Failed to load group agents");
      }
      const data = (await response.json()) as ApiAgent[];
      setAgentsInGroup(data.map(normalizeAgent));
    },
    [activeGroupId],
  );

  const setMessagesForGroup = useCallback(
    (groupId: number, nextMessages: Message[]) => {
      setMessages((current) => ({
        ...current,
        [groupId]: nextMessages,
      }));
    },
    [],
  );

  const appendMessage = useCallback((groupId: number, message: Message) => {
    setMessages((current) => {
      const groupMessages = current[groupId] ?? [];
      if (groupMessages.some((item) => item.id === message.id)) {
        return current;
      }
      return {
        ...current,
        [groupId]: [...groupMessages, message],
      };
    });
  }, []);

  const updateMessage = useCallback(
    (
      groupId: number,
      messageId: number,
      updater: (message: Message) => Message,
    ) => {
      setMessages((current) => ({
        ...current,
        [groupId]: (current[groupId] ?? []).map((message) =>
          message.id === messageId ? updater(message) : message,
        ),
      }));
    },
    [],
  );

  const appendTokenToMessage = useCallback(
    (groupId: number, messageId: number, token: string) => {
      updateMessage(groupId, messageId, (message) => ({
        ...message,
        content: `${message.content}${token}`,
      }));
    },
    [updateMessage],
  );

  const setMessageStreaming = useCallback((messageId: number, streaming: boolean) => {
    setStreamingMessageIds((current) => {
      const next = new Set(current);
      if (streaming) {
        next.add(messageId);
      } else {
        next.delete(messageId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      await Promise.resolve();
      if (cancelled) {
        return;
      }

      try {
        await refreshGroups();
        if (!cancelled) {
          await refreshAllAgents();
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [refreshAllAgents, refreshGroups]);

  useEffect(() => {
    let cancelled = false;

    async function loadAgentsInGroup() {
      await Promise.resolve();
      if (cancelled) {
        return;
      }

      try {
        await refreshAgentsInGroup(activeGroupId);
      } catch (error: unknown) {
        console.error(error);
      }
    }

    void loadAgentsInGroup();

    return () => {
      cancelled = true;
    };
  }, [activeGroupId, refreshAgentsInGroup]);

  const value = useMemo<ChatContextValue>(
    () => ({
      groups,
      setGroups,
      activeGroupId,
      setActiveGroupId,
      messages,
      setMessagesForGroup,
      appendMessage,
      updateMessage,
      appendTokenToMessage,
      streamingMessageIds,
      setMessageStreaming,
      agentsInGroup,
      setAgentsInGroup,
      allAgents,
      setAllAgents,
      refreshGroups,
      refreshAllAgents,
      refreshAgentsInGroup,
    }),
    [
      activeGroupId,
      agentsInGroup,
      allAgents,
      appendMessage,
      appendTokenToMessage,
      groups,
      messages,
      refreshAgentsInGroup,
      refreshAllAgents,
      refreshGroups,
      setMessageStreaming,
      setMessagesForGroup,
      streamingMessageIds,
      updateMessage,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}

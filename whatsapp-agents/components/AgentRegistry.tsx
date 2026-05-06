"use client";

import { useMemo, useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import type { Agent } from "@/types";

interface AgentRegistryProps {
  open: boolean;
  onClose: () => void;
}

function backendLabel(backend: string) {
  if (backend === "anthropic") {
    return "Claude";
  }
  if (backend === "openai") {
    return "Codex";
  }
  if (backend === "google") {
    return "Google";
  }
  return backend;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M6.7 5.3a1 1 0 0 0-1.4 1.4l5.3 5.3-5.3 5.3a1 1 0 1 0 1.4 1.4l5.3-5.3 5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 0 0-1.4-1.4L12 10.6 6.7 5.3Z" />
    </svg>
  );
}

export function AgentRegistry({ open, onClose }: AgentRegistryProps) {
  const {
    activeGroupId,
    agentsInGroup,
    allAgents,
    refreshAgentsInGroup,
    refreshAllAgents,
  } = useChat();
  const [expandedAgentId, setExpandedAgentId] = useState<number | null>(null);
  const [draftPrompts, setDraftPrompts] = useState<Record<number, string>>({});
  const [selectedAgentId, setSelectedAgentId] = useState("");

  const availableAgents = useMemo(() => {
    const activeIds = new Set(agentsInGroup.map((agent) => agent.id));
    return allAgents.filter((agent) => !activeIds.has(agent.id));
  }, [agentsInGroup, allAgents]);

  async function addAgent() {
    if (activeGroupId === null || !selectedAgentId) {
      return;
    }

    const response = await fetch(`/api/groups/${activeGroupId}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId: Number(selectedAgentId) }),
    });

    if (!response.ok) {
      console.error("Failed to add agent");
      return;
    }

    setSelectedAgentId("");
    await refreshAgentsInGroup(activeGroupId);
  }

  async function removeAgent(agent: Agent) {
    if (activeGroupId === null) {
      return;
    }

    const response = await fetch(`/api/groups/${activeGroupId}/agents`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId: agent.id }),
    });

    if (!response.ok) {
      console.error("Failed to remove agent");
      return;
    }

    await refreshAgentsInGroup(activeGroupId);
  }

  async function savePrompt(agent: Agent) {
    const prompt = draftPrompts[agent.id] ?? agent.system_prompt;
    const response = await fetch(`/api/agents/${agent.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: prompt }),
    });

    if (!response.ok) {
      console.error("Failed to save system prompt");
      return;
    }

    await Promise.all([refreshAllAgents(), refreshAgentsInGroup(activeGroupId)]);
  }

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 flex w-[360px] flex-col border-l border-[--wa-separator] bg-[--wa-header-bg] shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-transform duration-200 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-[60px] flex-shrink-0 items-center justify-between border-b border-[--wa-separator] px-4">
        <h3 className="text-[16px] font-semibold text-[--wa-text-primary]">
          Agents
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close agents"
          className="grid h-10 w-10 place-items-center rounded-full text-[--wa-icon] transition-colors duration-150 hover:bg-[--wa-hover]"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {agentsInGroup.map((agent) => {
            const isExpanded = expandedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                className="overflow-hidden rounded-lg bg-[--wa-input-bg]"
              >
                <button
                  type="button"
                  onClick={() => setExpandedAgentId(isExpanded ? null : agent.id)}
                  className="flex w-full items-start justify-between gap-3 px-3 py-3 text-left transition-colors duration-150 hover:bg-[--wa-hover]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold text-[--wa-text-primary]">
                      {agent.display_name}
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-[--wa-text-secondary]">
                      @{agent.slug} - {agent.model}
                    </span>
                  </span>
                  <span className="rounded-full bg-[--wa-green] px-2 py-0.5 text-[11px] font-semibold text-[--wa-main-bg]">
                    {backendLabel(agent.backend)}
                  </span>
                </button>

                <div className="flex justify-end border-t border-[--wa-separator] px-3 py-2">
                  <button
                    type="button"
                    onClick={() => void removeAgent(agent)}
                    className="rounded-md px-2 py-1 text-[12px] font-semibold text-[--wa-green] transition-colors duration-150 hover:bg-[--wa-hover]"
                  >
                    Remove
                  </button>
                </div>

                {isExpanded ? (
                  <div className="border-t border-[--wa-separator] p-3">
                    <textarea
                      value={draftPrompts[agent.id] ?? agent.system_prompt}
                      onChange={(event) =>
                        setDraftPrompts((current) => ({
                          ...current,
                          [agent.id]: event.target.value,
                        }))
                      }
                      onBlur={() => void savePrompt(agent)}
                      rows={6}
                      className="w-full resize-none rounded-lg bg-[--wa-sidebar-bg] px-3 py-2 text-[14px] leading-5 text-[--wa-text-primary] outline-none placeholder:text-[--wa-text-secondary] focus:ring-1 focus:ring-[--wa-green]"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[--wa-separator] p-4">
        <div className="mb-2 text-[12px] font-medium uppercase text-[--wa-text-secondary]">
          Add Agent
        </div>
        <div className="flex gap-2">
          <select
            value={selectedAgentId}
            onChange={(event) => setSelectedAgentId(event.target.value)}
            className="min-w-0 flex-1 rounded-lg bg-[--wa-input-bg] px-3 py-2 text-[14px] text-[--wa-text-primary] outline-none focus:ring-1 focus:ring-[--wa-green]"
          >
            <option value="">Select</option>
            {availableAgents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.display_name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => void addAgent()}
            disabled={!selectedAgentId}
            className="rounded-lg bg-[--wa-green] px-3 py-2 text-[14px] font-semibold text-[--wa-main-bg] transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </aside>
  );
}

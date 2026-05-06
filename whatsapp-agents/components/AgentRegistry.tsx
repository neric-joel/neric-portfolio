"use client";

import { useMemo, useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import type { Agent } from "@/types";

interface AgentRegistryProps {
  open: boolean;
  onClose: () => void;
}

function backendBadgeClass(backend: string) {
  if (backend === "anthropic") {
    return "border-[--accent-purple]/40 bg-[--accent-purple]/15 text-[--accent-purple]";
  }
  if (backend === "openai") {
    return "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
  }
  if (backend === "google") {
    return "border-amber-300/40 bg-amber-300/10 text-amber-200";
  }
  return "border-white/20 bg-white/5 text-[--text-muted]";
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      className={`fixed inset-y-0 right-0 z-50 flex w-80 flex-col border-l border-white/10 bg-[--bg-sidebar] shadow-2xl transition-all duration-150 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[--text-muted]">
          Agents
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[--text-primary] transition-all duration-150 hover:bg-white/5"
        >
          X
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {agentsInGroup.map((agent) => {
            const isExpanded = expandedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                className="rounded-lg border border-white/10 bg-[--bg-bubble]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedAgentId(isExpanded ? null : agent.id)
                  }
                  className="flex w-full items-start justify-between gap-3 px-3 py-3 text-left transition-all duration-150 hover:bg-white/5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-[--text-primary]">
                      {agent.display_name}
                    </span>
                    <span className="mt-1 block truncate text-xs text-[--text-muted]">
                      @{agent.slug} · {agent.model}
                    </span>
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${backendBadgeClass(
                      agent.backend,
                    )}`}
                  >
                    {agent.backend}
                  </span>
                </button>

                <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => void removeAgent(agent)}
                    aria-label={`Remove ${agent.display_name}`}
                    className="ml-auto rounded-lg px-2 py-1 text-xs font-semibold text-rose-300 transition-all duration-150 hover:bg-rose-400/10"
                  >
                    X
                  </button>
                </div>

                {isExpanded ? (
                  <div className="border-t border-white/10 p-3">
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
                      className="w-full resize-none rounded-md border border-white/10 bg-[--bg-primary] px-3 py-2 text-sm text-[--text-primary] outline-none transition-all duration-150 placeholder:text-[--text-muted] focus:border-[--accent-cyan]/60 focus:ring-2 focus:ring-[--accent-cyan]/20"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[--text-muted]">
          Add Agent
        </div>
        <div className="flex gap-2">
          <select
            value={selectedAgentId}
            onChange={(event) => setSelectedAgentId(event.target.value)}
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-[--bg-bubble] px-3 py-2 text-sm text-[--text-primary] outline-none transition-all duration-150 focus:border-[--accent-cyan]/60"
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
            className="rounded-lg bg-[--accent-cyan] px-3 py-2 text-sm font-semibold text-black transition-all duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </aside>
  );
}

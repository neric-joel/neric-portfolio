"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ChatArea } from "@/components/ChatArea";
import { GroupSidebar } from "@/components/GroupSidebar";

export default function Home() {
  return (
    <ChatProvider>
      <main className="flex h-screen flex-row overflow-hidden bg-[--bg-primary] text-[--text-primary]">
        <GroupSidebar />
        <ChatArea />
      </main>
    </ChatProvider>
  );
}

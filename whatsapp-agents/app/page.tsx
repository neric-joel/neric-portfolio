"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ChatArea } from "@/components/ChatArea";
import { GroupSidebar } from "@/components/GroupSidebar";

export default function Home() {
  return (
    <ChatProvider>
      <main className="flex h-screen flex-row overflow-hidden bg-[--wa-main-bg] text-[--wa-text-primary]">
        <GroupSidebar />
        <ChatArea />
      </main>
    </ChatProvider>
  );
}

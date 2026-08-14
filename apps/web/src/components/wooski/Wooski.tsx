"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { WOOSKI_ACTIONS, type WooskiAction } from "./actions";
import styles from "./Wooski.module.css";

type Message = {
  id: string;
  from: "wooski" | "user";
  text: string;
};

let messageCounter = 0;
function nextId() {
  messageCounter += 1;
  return `wooski-msg-${messageCounter}`;
}

const GREETING: Message = {
  id: "wooski-greeting",
  from: "wooski",
  text: "Hey — I'm Wooski. Where do you want to go?",
};

export function Wooski() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleAction(action: WooskiAction) {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: action.label },
      { id: nextId(), from: "wooski", text: action.reply },
    ]);
    if (action.href) {
      router.push(action.href);
    }
  }

  return (
    <div className={styles.root}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Wooski assistant">
          <div className={styles.header}>
            <span className={styles.avatar} aria-hidden>
              W
            </span>
            <div className={styles.headerText}>
              <div className={styles.name}>Wooski</div>
              <div className={styles.status}>
                <span className={styles.statusDot} aria-hidden />
                Site guide
              </div>
            </div>
            <button
              type="button"
              className={styles.close}
              aria-label="Close Wooski"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.messages} ref={listRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.bubble} ${
                  message.from === "wooski" ? styles.bubbleWooski : styles.bubbleUser
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            {WOOSKI_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                className={styles.action}
                onClick={() => handleAction(action)}
              >
                <action.icon size={16} strokeWidth={2} aria-hidden />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.fab}
        aria-expanded={open}
        aria-label={open ? "Close Wooski assistant" : "Open Wooski assistant"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

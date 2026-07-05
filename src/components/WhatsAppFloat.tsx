"use client";

import { motion } from "framer-motion";
import { whatsappHref } from "@/lib/site-config";

export default function WhatsAppFloat({
  label,
  message,
}: {
  label: string;
  message: string;
}) {
  return (
    <motion.a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor="link"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[var(--shadow-soft-lg)]"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.6 6.32A7.85 7.85 0 0 0 12.02 4a7.94 7.94 0 0 0-6.87 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.8 1h.01a7.94 7.94 0 0 0 5.6-13.58ZM12.02 18.4h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 1 1 12.24-3.51 6.6 6.6 0 0 1-6.64 6.61Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.19-.5.64-.62.77-.11.13-.23.15-.42.05a5.4 5.4 0 0 1-2.7-2.36c-.2-.35.2-.32.58-1.07.06-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.24-.18.19-.68.67-.68 1.63s.7 1.9.8 2.03c.1.13 1.37 2.1 3.33 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.85.12-.94-.05-.09-.18-.14-.38-.24Z"
          fill="white"
        />
      </svg>
    </motion.a>
  );
}

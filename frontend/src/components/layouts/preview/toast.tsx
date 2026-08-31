import { AnimatePresence, motion } from "motion/react";
import { LuCircleCheck } from "react-icons/lu";

interface PreviewToastProps {
  message: string | null;
  onDismiss: () => void;
}

export function PreviewToast({ message, onDismiss }: PreviewToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="preview-toast"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={onDismiss}
          role="button"
          tabIndex={0}
          className="absolute right-4 top-4 z-30 flex w-[min(90%,20rem)] cursor-pointer flex-row-reverse items-center justify-between gap-2 rounded-xl border border-blue-600! bg-white/80 px-4 py-3.5 text-sm text-zinc-900 shadow-lg backdrop-blur-md transition-opacity hover:opacity-90"
        >
          <LuCircleCheck className="size-5 shrink-0 text-emerald-500" />
          <span className="flex-1">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

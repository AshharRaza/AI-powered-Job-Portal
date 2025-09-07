// components/AILoader.tsx
import { motion } from "framer-motion";

export const AILoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {/* Animated gradient circle */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated typing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-blue-500"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.p
        className="text-gray-600 font-medium text-lg"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        AI is thinking...
      </motion.p>
    </div>
  );
}

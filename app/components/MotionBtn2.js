"use client";
import { motion } from "framer-motion";
export default function MotionBtn2({ children }) {
  return (
    <motion.button
      className="ml-20 p-3 rounded-md relative radial-gradient2 text-white text-m font-bold  "
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        type: "spring",
        stiffness: 40,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
    >
      <span className="text-white font-thin text-3xl tracking-wide h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
}

"use client";

import { motion } from "framer-motion";
export default function MotionBtn({ children }) {
  return (
    <motion.button
      className=" px-8 py-5 rounded-md relative radial-gradient text-white text-m font-bold  hover:border hover:border-black hover:text-primary-950  hover:bg-transparent "
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
      <span className=" tracking-wide  h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
}

'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function Problem() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 70) {
      // Calculate the interval duration dynamically
      const intervalDuration = 20 + (count / 70) * 100; // Adjust the formula to control the slowdown
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, intervalDuration);

      return () => clearInterval(interval);
    }
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }} // Ensures the animation only happens once
      transition={{ duration: 1 }}
      className={styles["problem"]}
    >
      <div className={styles["problem-statement"]}>
        <span className={styles["problem-statement-span"]}>
          {count}+ million
        </span>{" "}
        people worldwide experience stuttering or other speech impediments.
      </div>
      <div className={styles["problem-impact"]}>
        <div className={styles["impact-tag"]}> Impact</div>
        <div className={styles["problem-statement-content"]}>
          Miscommunication and self-doubt often hinder individuals in personal,
          academic, and professional settings.
        </div>
      </div>
    </motion.div>
  );
}
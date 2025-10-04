"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "@heroui/react";

export default function SuccessAlert({ message }: { message: string | null }) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-lg"
        >
          <Alert
            color="error"
            title={message}
            className="bg-red-400 rounded-xl shadow-lg text-center flex justify-center items-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

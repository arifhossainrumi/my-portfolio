import React from 'react';
import { motion } from 'framer-motion';

function Preloader() {
  return (
    <motion.div
      // অ্যানিমেশন সেটিংস (Fade Out)
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      
      // ফুল স্ক্রিন স্টাইল (Tailwind)
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-4">
        {/* লোগো বা নাম অ্যানিমেশন */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="text-4xl font-bold text-gray-800 font-poppins"
        >
          Arif<span className="text-blue-600">.</span>
        </motion.h1>

        {/* ছোট লোডিং বার */}
        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Preloader;
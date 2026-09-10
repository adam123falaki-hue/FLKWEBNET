"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectEstimator from './ProjectEstimator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectEstimatorModal({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop (الخلفية الـ Flou مع انيميشن الـ Fade) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080d1a]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container (طلع بانيميشن ديال Scale + Slide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-4xl bg-slate-900/95 border border-[#00838F]/40 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/50 z-10 backdrop-blur-xl overflow-hidden"
          >
            {/* زر الـ X مع انيميشن د الـ Hover & Tap */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-[#ef4444] hover:border-[#ef4444] transition-colors duration-200 shadow-lg focus:outline-none"
              aria-label="Close"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </motion.button>

            {/* المحتوى ديال الـ Estimator */}
            <div className="mt-2">
              <ProjectEstimator />
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

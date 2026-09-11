"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectEstimator from '@/app/components/ProjectEstimator';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectEstimatorModal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080d1a]/80 backdrop-blur-md p-4 sm:p-6 md:p-10 flex justify-center items-start">
          
          {/* Backdrop Click */}
          <div 
            className="fixed inset-0 cursor-pointer -z-10" 
            onClick={onClose} 
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-4xl bg-slate-900/95 border border-[#00838F]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 z-10 backdrop-blur-xl my-auto"
          >
            {/* زر الـ X */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-[#ef4444] hover:border-[#ef4444] transition-colors duration-200 shadow-lg focus:outline-none cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* تمرير onClose لـ ProjectEstimator باش يخدم Retour */}
            <ProjectEstimator onClose={onClose} />

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

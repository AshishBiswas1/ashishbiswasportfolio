import { motion } from "framer-motion";

export function LoadingSpinner() {
 return (
  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
   <motion.div
    className="flex flex-col items-center gap-4"
    animate={{ opacity: [0.5, 1] }}
    transition={{ duration: 1.5, repeat: Infinity }}
   >
    <div className="relative w-12 h-12">
     <motion.div
      className="absolute inset-0 rounded-full border-2 border-transparent border-t-white border-r-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
     />
    </div>
    <p className="text-sm text-white/60 font-mono tracking-wider">
     Loading portfolio...
    </p>
   </motion.div>
  </div>
 );
}

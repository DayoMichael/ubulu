import { motion } from "framer-motion";

export const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export const AnimatedOrbs = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    {[
      { size: 220, delay: 0, duration: 8, color: "bg-blue-500/10" },
      { size: 300, delay: 2, duration: 10, color: "bg-purple-500/8" },
      { size: 180, delay: 4, duration: 12, color: "bg-pink-500/6" },
      { size: 250, delay: 1, duration: 9, color: "bg-indigo-500/7" },
      { size: 140, delay: 3, duration: 11, color: "bg-cyan-500/5" },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full blur-3xl ${orb.color}`}
        style={{
          width: orb.size,
          height: orb.size,
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: orb.duration,
          repeat: Infinity,
          delay: orb.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export function AnimatedBlogBackground() {
  return (
    <>
      <AnimatedOrbs />
      <FloatingParticles />
    </>
  );
}

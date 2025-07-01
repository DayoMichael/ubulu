import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const TaskCard = ({
  title,
  description,
  icon: Icon,
  bgImage,
  to,
  gradient,
  index,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgImage: string;
  to: string;
  gradient: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={to} className="block">
        <Card className="relative overflow-hidden cursor-pointer border-0 bg-gradient-to-br from-background/95 to-background/85 backdrop-blur-xl h-80 group">
          {/* Background image and overlay container */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Softening overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
          </div>

          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 ${gradient} opacity-20 z-10 pointer-events-none`}
            animate={{
              opacity: isHovered ? 0.3 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated border */}
          <motion.div
            className={`absolute inset-0 rounded-lg p-[2px] ${gradient} z-20 pointer-events-none`}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 rounded-lg bg-background" />
          </motion.div>

          <CardContent className="relative z-30 p-8 h-full flex flex-col justify-between">
            {/* Header with icon and arrow */}
            <div className="flex items-start justify-between">
              <motion.div
                className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.div
                animate={{
                  x: isHovered ? 8 : 0,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <motion.h3
                className="text-2xl font-bold text-foreground"
                animate={{
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>

              <motion.p
                className="text-base text-muted-foreground leading-relaxed"
                animate={{
                  color: isHovered
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--muted-foreground))",
                }}
                transition={{ duration: 0.3 }}
              >
                {description}
              </motion.p>
            </div>

            {/* Floating sparkles */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-primary/60"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

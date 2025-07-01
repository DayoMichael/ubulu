import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { ThemeToggle } from "./ui/ThemeToggle";
import {
  ArrowRight,
  Users,
  Database,
  Settings,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
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

// Animated background orbs
const AnimatedOrbs = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[
      { size: 300, delay: 0, duration: 8, color: "bg-blue-500/10" },
      { size: 400, delay: 2, duration: 10, color: "bg-purple-500/8" },
      { size: 250, delay: 4, duration: 12, color: "bg-pink-500/6" },
      { size: 350, delay: 1, duration: 9, color: "bg-indigo-500/7" },
      { size: 200, delay: 3, duration: 11, color: "bg-cyan-500/5" },
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

// Enhanced Task Card with Framer Motion
const TaskCard = ({
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
          {/* Animated background image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 ${gradient} opacity-20`}
            animate={{
              opacity: isHovered ? 0.3 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated border */}
          <motion.div
            className={`absolute inset-0 rounded-lg p-[2px] ${gradient}`}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 rounded-lg bg-background" />
          </motion.div>

          <CardContent className="relative p-8 h-full flex flex-col justify-between">
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

export const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.3]);

  const tasks = [
    {
      title: "Task One",
      description:
        "Manage and view user data with advanced filtering, sorting, and pagination capabilities.",
      icon: Users,
      bgImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      to: "/users-table",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      title: "Task Two",
      description:
        "Database management and analytics dashboard with real-time data visualization.",
      icon: Database,
      bgImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      to: "/dynamic-form",
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "Task Three",
      description:
        "System configuration and settings management with advanced customization options.",
      icon: Settings,
      bgImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      to: "/blog",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background */}
      <AnimatedOrbs />
      <FloatingParticles />

      {/* Theme toggle */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero section with parallax */}
        <motion.div className="text-center mb-20" style={{ y: y1, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Welcome to the future
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            Welcome to Ubulu
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            Choose a task to get started with your workflow. Each module is
            designed to provide powerful functionality with an intuitive
            interface.
          </motion.p>
        </motion.div>

        {/* Task Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          style={{ y: y2 }}
        >
          {tasks.map((task, index) => (
            <TaskCard key={index} {...task} index={index} />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Star className="w-4 h-4" />
            <span>Built with React, TypeScript, and Framer Motion</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

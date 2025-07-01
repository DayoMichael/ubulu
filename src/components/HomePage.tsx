import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Zap, Users, Database, Settings } from "lucide-react";
import { FloatingParticles } from "@/widgets/home/FloatingParticles";
import { AnimatedOrbs } from "@/widgets/home/AnimatedOrbs";
import { TaskCard } from "@/widgets/home/TaskCard";

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
        "Dynamic data form view, with real time editing of json and form",
      icon: Database,
      bgImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      to: "/dynamic-form",
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "Task Three",
      description: "View post, edit post, create post, delete post, and more",
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
            Choose a task to view the demo and test the app.
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
      </div>
    </div>
  );
};

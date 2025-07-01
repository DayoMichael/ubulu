import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UsersTable } from "../components/table/UsersTable";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Filter,
  Search,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUsersQuery } from "../hooks/users/useUsersQuery";
import { useUsersTableStore } from "@/stores";

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Animated background orbs for table page
const AnimatedOrbs = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[
      { size: 250, delay: 0, duration: 10, color: "bg-blue-500/8" },
      { size: 300, delay: 2, duration: 12, color: "bg-purple-500/6" },
      { size: 200, delay: 4, duration: 8, color: "bg-indigo-500/5" },
      { size: 180, delay: 1, duration: 11, color: "bg-cyan-500/4" },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full blur-3xl ${orb.color}`}
        style={{
          width: orb.size,
          height: orb.size,
          left: `${15 + i * 20}%`,
          top: `${20 + i * 15}%`,
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
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

// Animated stats cards
const StatsCard = ({
  icon: Icon,
  title,
  value,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.6,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    whileHover={{
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    }}
    className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-6"
  >
    <div className="flex items-center gap-4">
      <motion.div
        className="p-3 rounded-lg bg-primary/10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  </motion.div>
);

// Animated action buttons
const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  delay: number;
}) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.5,
      delay: delay,
      ease: "easeOut",
    }}
    whileHover={{
      scale: 1.05,
      x: 5,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary font-medium transition-colors"
  >
    <Icon className="w-4 h-4" />
    {label}
  </motion.button>
);

export const UsersTablePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 200], [0, -50]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0.8]);

  const [isTableVisible, setIsTableVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsTableVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get users data from the store
  const { data } = useUsersQuery();
  const { search, pageSize } = useUsersTableStore();

  // Calculate real statistics
  const totalUsers = data?.total || 0;
  const currentPageItems = data?.users?.length || 0;
  const searchResults = data?.searchResults || 0;
  const isSearching = search.trim().length > 0;
  const totalPages = Math.ceil(
    (isSearching ? searchResults : totalUsers) / pageSize
  );

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
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with back navigation */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero section */}
        <motion.div className="text-center mb-12" style={{ y: y1, opacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              User Management System
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Users Management
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            Manage and view user data with advanced filtering, sorting, and
            pagination capabilities.
          </motion.p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <StatsCard
            icon={Users}
            title="Total Users"
            value={totalUsers.toLocaleString()}
            delay={0.8}
          />
          <StatsCard
            icon={TrendingUp}
            title="Current Page"
            value={`${currentPageItems} items`}
            delay={0.9}
          />
          <StatsCard
            icon={Filter}
            title="Search Results"
            value={
              isSearching ? `${searchResults} found` : `${totalUsers} total`
            }
            delay={1.0}
          />
          <StatsCard
            icon={Database}
            title="Total Pages"
            value={`${totalPages} pages`}
            delay={1.1}
          />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <ActionButton
            icon={Search}
            label="Search Users"
            onClick={() => console.log("Search clicked")}
            delay={1.2}
          />
          <ActionButton
            icon={Filter}
            label="Advanced Filter"
            onClick={() => console.log("Filter clicked")}
            delay={1.3}
          />
        </motion.div>

        {/* Table container with animation */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{
            opacity: isTableVisible ? 1 : 0,
            y: isTableVisible ? 0 : 50,
            scale: isTableVisible ? 1 : 0.95,
          }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="bg-gradient-to-br from-background/90 to-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
          >
            <UsersTable />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

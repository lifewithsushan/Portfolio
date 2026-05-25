import emailjs from "@emailjs/browser";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Stars } from "@react-three/drei";
import gsap from "gsap";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiPhone,
  FiSend,
  FiSun,
  FiX,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type ThemeMode = "dark" | "light";
type Message = { from: "bot" | "user"; text: string };

type Project = {
  title: string;
  tech: string[];
  description: string;
  features: string[];
  accent: string;
};

type InfoCard = {
  label: string;
  value: string;
  href?: string;
  icon: IconType;
};

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const heroRoles = [
  "Full Stack Web Developer",
  "AI/ML Engineer",
  "Data Analyst",
];

const stats = [
  { value: 3, suffix: "+", label: "Years building momentum" },
  { value: 4, suffix: "+", label: "Featured case studies" },
  { value: 3, suffix: "", label: "Professional certificates" },
  { value: 30, suffix: "+", label: "Students mentored" },
];

const expertiseCards = [
  {
    title: "Full Stack Product Engineering",
    text: "Fast, scalable web apps with modern frontend architecture, clean APIs, secure auth, and data-driven interfaces.",
    icon: FiCode,
  },
  {
    title: "AI/ML Exploration",
    text: "Practical experimentation with machine learning workflows, intelligent automation, and problem-solving through data.",
    icon: FiCpu,
  },
  {
    title: "Analytics & Insight Design",
    text: "Translating messy datasets into clear decisions using EDA, dashboards, storytelling, and visual reasoning.",
    icon: FiBarChart2,
  },
  {
    title: "Backend & Data Systems",
    text: "Reliable APIs, database design, ETL-friendly thinking, and systems that support real-world digital products.",
    icon: FiDatabase,
  },
];

const journey = [
  {
    year: "2022",
    title: "Sales + Technical Communication",
    text: "Developed client communication, product consulting, and reporting skills at The IT Company.",
  },
  {
    year: "2023",
    title: "Mentorship + Teaching",
    text: "Began teaching Python and improving digital literacy while managing learning environments.",
  },
  {
    year: "2024",
    title: "Data Analysis + Research",
    text: "Expanded into analytics, statistical thinking, data cleaning, and visual storytelling through projects.",
  },
  {
    year: "Today",
    title: "AI-Powered Full Stack Focus",
    text: "Combining React, FastAPI, data systems, and AI curiosity to build intelligent digital experiences.",
  },
];

const skills = [
  { name: "Python", level: 95, category: "Core Language" },
  { name: "FastAPI", level: 90, category: "Backend APIs" },
  { name: "React", level: 92, category: "Frontend" },
  { name: "JavaScript", level: 91, category: "Frontend" },
  { name: "Tailwind CSS", level: 94, category: "Design Systems" },
  { name: "PostgreSQL", level: 84, category: "Database" },
  { name: "MySQL", level: 82, category: "Database" },
  { name: "Pandas", level: 93, category: "Analytics" },
  { name: "NumPy", level: 88, category: "Analytics" },
  { name: "Matplotlib", level: 86, category: "Visualization" },
  { name: "Git", level: 89, category: "Tooling" },
  { name: "Linux", level: 80, category: "Systems" },
  { name: "Docker", level: 76, category: "Deployment" },
  { name: "Machine Learning", level: 78, category: "AI/ML" },
  { name: "Data Visualization", level: 90, category: "Storytelling" },
  { name: "REST API", level: 92, category: "Architecture" },
  { name: "JWT Authentication", level: 87, category: "Security" },
];

const orbitTech = [
  "React",
  "FastAPI",
  "Python",
  "Pandas",
  "Docker",
  "PostgreSQL",
  "Tailwind",
  "ML",
];

const projects: Project[] = [
  {
    title: "EV Impact on Air Quality — Kathmandu 2024",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
    description:
      "Collected and analyzed air pollution datasets across Kathmandu to uncover correlations between EV adoption zones and PM2.5 reduction through visual analytics.",
    features: [
      "Data cleaning pipeline",
      "Exploratory analysis",
      "Visualization dashboard",
      "Insight generation",
    ],
    accent: "#00ffff",
  },
  {
    title: "Student Performance Data Analysis",
    tech: ["Python", "Pandas", "Excel", "Statistical Analysis"],
    description:
      "Analyzed 500+ student records to identify performance indicators, improve educational understanding, and support better decision-making with preprocessing and correlation analysis.",
    features: [
      "Data preprocessing",
      "Correlation analysis",
      "Performance segmentation",
      "Actionable reporting",
    ],
    accent: "#7dd3fc",
  },
  {
    title: "Banking Management System",
    tech: ["Python", "OOP", "File Handling"],
    description:
      "Built a full-featured banking CLI application using Python OOP principles with persistent transaction management, modular account actions, and audit-friendly logging.",
    features: [
      "Persistent transactions",
      "OOP-based account flows",
      "Audit logging",
      "CLI usability",
    ],
    accent: "#915EFF",
  },
  {
    title: "Full Stack Ecommerce Platform",
    tech: ["FastAPI", "React", "PostgreSQL", "JWT", "Cloudinary"],
    description:
      "A modern ecommerce platform with secure authentication, product management, image upload workflows, cart operations, and streamlined order handling.",
    features: [
      "Secure JWT auth",
      "Product management",
      "Image upload system",
      "Cart & order management",
    ],
    accent: "#00bfff",
  },
];

const experiences = [
  {
    title: "Computer Teacher",
    company: "Arniko International Academy",
    period: "2023 – Present",
    highlights: [
      "Taught Python programming",
      "Mentored 200+ students",
      "Improved digital literacy",
      "Managed computer lab systems",
    ],
  },
  {
    title: "Customer Sales Representative",
    company: "The IT Company",
    period: "2022 – 2023",
    highlights: [
      "Technical product consulting",
      "Sales reporting",
      "Client communication",
    ],
  },
];

const certifications = [
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    icon: FiCpu,
  },
  {
    title: "Data Analysis with Python",
    issuer: "Coursera",
    icon: FiBarChart2,
  },
  {
    title: "RHCSA Track",
    issuer: "Red Hat System Admin",
    icon: FiDatabase,
  },
];

const achievements = [
  {
    title: "100% Merit Scholarship",
    text: "Recognition for academic excellence, consistency, and high-performance learning outcomes.",
    icon: FiAward,
  },
  {
    title: "Best Mentor Award",
    text: "Acknowledged for guidance, support, and helping learners build confidence in technology.",
    icon: FiZap,
  },
  {
    title: "Chess Gold Medalist",
    text: "Strategic thinking, discipline, and calm decision-making reflected in both games and engineering work.",
    icon: FiAward,
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FiLinkedin },
  { label: "Portfolio", href: "#projects", icon: FiGlobe },
];

const contactCards: InfoCard[] = [
  {
    label: "Email",
    value: "Reach out through the contact form",
    href: "#contact-form",
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "Available upon request",
    href: "#contact-form",
    icon: FiPhone,
  },
  {
    label: "LinkedIn",
    value: "Professional network profile",
    href: "https://www.linkedin.com/",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "Code portfolio and experiments",
    href: "https://github.com/",
    icon: FiGithub,
  },
  {
    label: "Portfolio",
    value: "Immersive interactive web presence",
    href: "#home",
    icon: FiGlobe,
  },
  {
    label: "Location",
    value: "Satdobato, Lalitpur, Nepal",
    icon: FiMapPin,
  },
];

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{ background: "rgba(5, 8, 22, 0.92)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-300/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-violet-400/40 border-t-cyan-300 border-r-cyan-300"
          animate={{ rotate: -360, scale: [1, 1.06, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "linear",
          }}
        />
        <div
          className="absolute inset-5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,255,0.28), rgba(145,94,255,0.15), transparent 72%)",
            filter: "blur(8px)",
          }}
        />
        <span className="relative text-lg font-semibold tracking-[0.3em] text-white">SK</span>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/80">Initializing Portfolio Experience</p>
        <p className="text-sm text-white/65">Loading immersive UI, 3D layer, and AI interactions...</p>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.34em]"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "var(--primary)",
        }}
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,255,255,0.8)]" />
        {eyebrow}
      </span>
      <h2 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </motion.div>
  );
}

function FloatingNode({
  radius,
  speed,
  color,
  size,
  phase,
}: {
  radius: number;
  speed: number;
  color: string;
  size: number;
  phase: number;
}) {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.22;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 18, 18]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.45} />
    </mesh>
  );
}

function HolographicGlobe() {
  const coreRef = useRef<any>(null);
  const shellRef = useRef<any>(null);
  const ringRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.28;
      coreRef.current.rotation.x += delta * 0.12;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.22;
      shellRef.current.rotation.z += delta * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.16;
      ringRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.85} floatIntensity={1.7}>
        <group>
          <Sphere ref={coreRef} args={[1.15, 64, 64]}>
            <MeshDistortMaterial
              color="#00bfff"
              emissive="#915EFF"
              emissiveIntensity={1.4}
              roughness={0.18}
              metalness={0.7}
              distort={0.26}
              speed={1.8}
              transparent
              opacity={0.92}
            />
          </Sphere>
          <mesh ref={shellRef} scale={1.4}>
            <sphereGeometry args={[1, 38, 38]} />
            <meshBasicMaterial color="#9be7ff" wireframe transparent opacity={0.22} />
          </mesh>
          <mesh ref={ringRef} scale={1.55} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.05, 0.025, 16, 120]} />
            <meshBasicMaterial color="#915EFF" transparent opacity={0.45} />
          </mesh>
        </group>
      </Float>
      <FloatingNode radius={1.9} speed={0.95} color="#00ffff" size={0.08} phase={0} />
      <FloatingNode radius={2.2} speed={0.75} color="#915EFF" size={0.11} phase={1.6} />
      <FloatingNode radius={2.45} speed={0.55} color="#7dd3fc" size={0.09} phase={3.2} />
    </>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.6], fov: 45 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.85} />
      <pointLight position={[3, 4, 3]} intensity={28} color="#00ffff" />
      <pointLight position={[-3, -2, 1]} intensity={18} color="#915EFF" />
      <spotLight position={[0, 3, 5]} angle={0.45} intensity={22} penumbra={1} color="#9be7ff" />
      <Suspense fallback={null}>
        <Stars radius={80} depth={45} count={1500} factor={3.8} saturation={0} fade speed={1.2} />
        <HolographicGlobe />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.65} />
    </Canvas>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = `${Math.round(state.value)}${suffix}`;
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [suffix, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-[24px] p-6"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "var(--glow)",
      }}
    >
      <div className="text-3xl font-semibold sm:text-4xl">
        <span ref={countRef}>{`0${suffix}`}</span>
      </div>
      <p className="mt-2 text-sm uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </motion.div>
  );
}

function SkillRing({ name, level, category }: { name: string; level: number; category: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * level) / 100;
  const gradientId = `ring-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group rounded-[26px] p-5"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "var(--glow)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#915EFF" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: dashOffset }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 12px rgba(0,255,255,0.35))" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">{level}%</div>
        </div>
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {category}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200/90 ring-1 ring-white/10 transition group-hover:text-white">
            Intelligent capability
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
      animate={tilt}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / rect.width) * 12;
        const rotateX = -((y - rect.height / 2) / rect.height) * 12;
        setTilt({ rotateX, rotateY });
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[30px] p-6 sm:p-8"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "var(--glow)",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at top right, ${project.accent}22, transparent 40%), radial-gradient(circle at bottom left, rgba(145,94,255,0.2), transparent 35%)`,
        }}
      />
      <div className="relative space-y-6" style={{ transform: "translateZ(24px)" }}>
        <div className="preview-screen overflow-hidden rounded-[24px] border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/60 ring-1 ring-white/10">
              Live preview concept
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
              <div className="h-2 w-20 rounded-full bg-white/10" />
              <div className="grid grid-cols-4 gap-2">
                {[58, 82, 44, 74].map((height, barIndex) => (
                  <div key={barIndex} className="flex h-28 items-end rounded-[18px] bg-white/[0.03] p-2">
                    <div
                      className="w-full rounded-full"
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(180deg, ${project.accent}, rgba(145,94,255,0.75))`,
                        boxShadow: `0 0 18px ${project.accent}55`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
              {[1, 2, 3].map((row) => (
                <div key={row} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                  <div className="h-2 w-16 rounded-full bg-white/10" />
                  <div className="mt-3 h-2 w-full rounded-full bg-white/8" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-white/8" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em]"
            style={{
              color: project.accent,
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}22`,
            }}
          >
            <FiExternalLink />
            Featured Project
          </span>
          {project.tech.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75">
              {item}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <p className="mt-4 text-base leading-8" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
        </div>

        <ul className="grid gap-3 text-sm sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.7)]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function TechOrbit() {
  return (
    <div className="orbit-shell mx-auto mt-10 flex max-w-[430px] items-center justify-center">
      <motion.div
        className="relative h-[340px] w-[340px] sm:h-[390px] sm:w-[390px]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 24, ease: "linear" }}
      >
        <div className="absolute inset-[16%] rounded-full border border-cyan-300/20" />
        <div className="absolute inset-[2%] rounded-full border border-violet-400/15" />
        <div className="absolute inset-[30%] rounded-full border border-white/10" />
        {orbitTech.map((item, index) => {
          const angle = (Math.PI * 2 * index) / orbitTech.length;
          const radius = index % 2 === 0 ? 150 : 108;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={item}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
            >
              <motion.div
                className="tech-pill whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/85"
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3.5 + index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {item}
              </motion.div>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_40px_rgba(0,255,255,0.14)] backdrop-blur-2xl">
          <div className="flex h-full flex-col items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(145,94,255,0.2),transparent_60%)] text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/85">AI Stack Orbit</p>
            <p className="mt-3 text-3xl font-semibold gradient-text">17</p>
            <p className="mt-2 max-w-[9rem] text-xs leading-6 text-white/65">Core capabilities across product, data, and intelligence.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Heatmap() {
  const weeks = 18;
  const cells = useMemo(
    () =>
      Array.from({ length: weeks * 7 }, (_, index) => ({
        level: [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)],
        key: index,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="rounded-[30px] p-6 sm:p-8"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "var(--glow)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/85">GitHub activity concept</p>
          <h3 className="mt-2 text-2xl font-semibold">Consistency over flashes of effort</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="heat-cell h-3.5 w-3.5 rounded-[4px]" data-level={level} />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto">
        <div className="grid min-w-[720px] grid-flow-col grid-rows-7 gap-2">
          {cells.map((cell) => (
            <div key={cell.key} className="heat-cell h-4 w-4 rounded-[5px]" data-level={cell.level} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi, I’m the portfolio AI assistant. Ask about Sushan’s skills, projects, experience, or how to collaborate.",
    },
  ]);

  const generateReply = (text: string) => {
    const query = text.toLowerCase();

    if (query.includes("skill") || query.includes("stack") || query.includes("technology")) {
      return "Sushan works across Python, FastAPI, React, Tailwind CSS, PostgreSQL, data analysis tools like Pandas and NumPy, and practical ML foundations.";
    }

    if (query.includes("project") || query.includes("portfolio") || query.includes("work")) {
      return "Highlighted work includes an ecommerce platform with FastAPI + React, air-quality analytics around EV adoption in Kathmandu, student performance analysis, and a Python banking system.";
    }

    if (query.includes("experience") || query.includes("teacher") || query.includes("job")) {
      return "Sushan currently teaches Python and computer fundamentals at Arniko International Academy and previously handled technical sales communication at The IT Company.";
    }

    if (query.includes("contact") || query.includes("hire") || query.includes("collaborate")) {
      return "Use the contact form below to start a conversation. The portfolio is designed to support recruiter outreach, startup collaboration, and freelance opportunities.";
    }

    if (query.includes("location") || query.includes("nepal")) {
      return "Sushan Khatri is based in Satdobato, Lalitpur, Nepal, building intelligent web experiences with a global outlook.";
    }

    return "Sushan combines full stack engineering, data analysis, and AI curiosity to build scalable, smart, and interactive digital products.";
  };

  const submitMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { from: "user", text: trimmed };
    const reply: Message = { from: "bot", text: generateReply(trimmed) };

    setMessages((current) => [...current, userMessage, reply]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="chatbot-panel w-[min(92vw,390px)] overflow-hidden rounded-[28px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">AI Assistant</p>
                <h3 className="mt-1 text-lg font-semibold">Ask about Sushan</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
              >
                <FiX />
              </button>
            </div>
            <div className="max-h-[340px] space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                    message.from === "bot" ? "mr-auto bg-white/[0.05] text-white/80" : "ml-auto bg-cyan-400/15 text-cyan-50"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      submitMessage();
                    }
                  }}
                  placeholder="Ask about skills, projects, or contact"
                  className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={submitMessage}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 transition hover:scale-105"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-3 rounded-full px-5 py-4 text-sm font-medium text-slate-950"
        style={{
          background: "linear-gradient(90deg, #00ffff, #915EFF)",
          boxShadow: "0 16px 40px rgba(0,255,255,0.2)",
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <FiCpu />
        {open ? "Close Assistant" : "Open AI Assistant"}
      </motion.button>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -400, y: -400 });
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const decorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${8 + Math.random() * 18}px`,
        duration: `${8 + Math.random() * 8}s`,
        delay: `${Math.random() * 4}s`,
      })),
    []
  );

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentRole = heroRoles[roleIndex];
    const speed = isDeleting ? 40 : 75;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const next = currentRole.slice(0, typedText.length + 1);
        setTypedText(next);

        if (next === currentRole) {
          window.setTimeout(() => setIsDeleting(true), 950);
        }
      } else {
        const next = currentRole.slice(0, typedText.length - 1);
        setTypedText(next);

        if (next === "") {
          setIsDeleting(false);
          setRoleIndex((current) => (current + 1) % heroRoles.length);
        }
      }
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, roleIndex, typedText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      decorRefs.current.forEach((item, index) => {
        if (!item) return;

        gsap.to(item, {
          y: index % 2 === 0 ? -18 : 18,
          x: index === 1 ? 16 : -10,
          duration: 3.8 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
          title: "Portfolio Contact Form", 
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      window.setTimeout(() => setFormStatus("idle"), 3200);
    } catch (error) {
      console.error("Failed to send:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <motion.div
        className="fixed left-0 top-0 z-[90] h-1 w-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500"
        style={{ scaleX: progressScale }}
      />

      <div className="animated-bg pointer-events-none fixed inset-0 -z-20" />
      <div className="cyber-grid pointer-events-none fixed inset-0 -z-10 opacity-60" />
      <div
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[70] hidden h-[360px] w-[360px] rounded-full md:block"
        style={{ transform: `translate(${cursor.x - 180}px, ${cursor.y - 180}px)` }}
      />

      <header className="fixed inset-x-0 top-0 z-[85] px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-5"
          style={{
            background: isScrolled ? "rgba(10, 16, 32, 0.78)" : "rgba(10, 16, 32, 0.42)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            boxShadow: isScrolled ? "0 16px 50px rgba(0,0,0,0.22)" : "0 10px 34px rgba(0,0,0,0.1)",
          }}
        >
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-white/[0.05] text-sm font-semibold tracking-[0.28em] text-white shadow-[0_0_24px_rgba(0,255,255,0.12)]">
              SK
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Sushan Khatri</p>
              <p className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                Intelligent Web Experiences
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-medium text-slate-950 shadow-[0_12px_32px_rgba(0,255,255,0.16)] transition hover:scale-[1.02] sm:inline-flex"
            >
              Let’s Build
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition hover:text-white lg:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[26px] p-4 lg:hidden"
              style={{
                background: "rgba(10,16,32,0.82)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-sm font-medium text-slate-950"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home" className="relative">
        <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDuration: particle.duration,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>

          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div
                className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.34em]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--primary)",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.85)]" />
                Satdobato, Lalitpur, Nepal
              </div>

              <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                <span className="block text-white">Sushan</span>
                <span className="gradient-text block">Khatri</span>
              </h1>

              <div className="mt-6 flex min-h-10 items-center gap-3 text-lg sm:text-2xl">
                <span className="text-white/75">I design as a</span>
                <span className="typing-text text-cyan-200">{typedText}</span>
                <span className="typing-caret" />
              </div>

              <p className="mt-8 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: "var(--muted)" }}>
                Building Intelligent Web Experiences with AI &amp; Modern Technologies. Results-oriented Full Stack Web Developer, Data Analyst, and AI/ML enthusiast focused on scalable applications, clean APIs, and immersive digital interfaces.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_16px_38px_rgba(0,255,255,0.18)] transition hover:-translate-y-0.5"
                >
                  View Projects
                  <FiArrowRight />
                </a>
                <a
                  href="/Sushan-Khatri-Resume.txt"
                  download
                  className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-white"
                >
                  Download Resume
                  <FiDownload />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:border-violet-300/30 hover:text-white"
                >
                  Contact Me
                  <FiMail />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                    >
                      <Icon />
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <StatCard key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.85, ease: "easeOut" }}
              className="relative z-10"
            >
              <div
                className="relative overflow-hidden rounded-[34px] p-4 sm:p-5"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--glow)",
                }}
              >
                <div className="hero-canvas relative h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.14),rgba(145,94,255,0.12),rgba(5,8,22,0.92))] sm:h-[520px]">
                  <HeroScene />
                </div>

                {[
                  {
                    title: "AI + Analytics",
                    text: "Data-backed product thinking",
                    className: "left-3 top-6 sm:left-6",
                  },
                  {
                    title: "FastAPI + React",
                    text: "Scalable modern stack",
                    className: "right-3 top-16 sm:right-6",
                  },
                  {
                    title: "Immersive UX",
                    text: "Premium interaction systems",
                    className: "bottom-6 left-6",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    ref={(node) => {
                      decorRefs.current[index] = node;
                    }}
                    className={`hero-float-card absolute hidden max-w-[210px] rounded-[22px] p-4 md:block ${item.className}`}
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/72">{item.text}</p>
                  </div>
                ))}

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Current Focus", value: "AI-driven product engineering" },
                    { label: "Preferred Stack", value: "React • FastAPI • PostgreSQL" },
                    { label: "Approach", value: "Smart, scalable, cinematic UX" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-white/55">{item.label}</p>
                      <p className="mt-3 text-sm text-white/82">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <a
            href="#about"
            className="scroll-indicator absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/55"
          >
            Scroll to explore
            <span className="flex h-12 w-7 items-start justify-center rounded-full border border-white/12 p-1.5">
              <span className="h-3 w-3 rounded-full bg-cyan-300" />
            </span>
            <FiChevronDown className="text-cyan-200/90" />
          </a>
        </section>

        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="About Me"
              title="Transforming ideas into intelligent digital products"
              description="Results-oriented Data Analyst and AI enthusiast with hands-on experience in Python, Pandas, NumPy, FastAPI, data visualization, and modern web technologies. Passionate about building scalable applications, solving real-world problems through AI, and designing immersive digital experiences."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div
                className="rounded-[32px] p-6 sm:p-8"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--glow)",
                }}
              >
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Core narrative</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">Professional, futuristic, intelligent, and built for impact.</h3>
                <p className="mt-6 text-base leading-8" style={{ color: "var(--muted)" }}>
                  Sushan Khatri blends engineering discipline, data curiosity, and modern interface sensibility. From backend APIs and scalable web platforms to exploratory analysis and immersive frontends, the goal is always the same: build experiences that are useful, elegant, and future-ready.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {expertiseCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                        whileHover={{ y: -8 }}
                        className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                      >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200 shadow-[0_0_18px_rgba(0,255,255,0.14)]">
                          <Icon />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold">{card.title}</h4>
                        <p className="mt-3 text-sm leading-7 text-white/70">{card.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-6">
                <div
                  className="rounded-[32px] p-6 sm:p-8"
                  style={{
                    background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "var(--glow)",
                  }}
                >
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Journey timeline</p>
                  <div className="mt-8 space-y-6">
                    {journey.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                        className="relative pl-10"
                      >
                        <div className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10">
                          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.8)]" />
                        </div>
                        {index < journey.length - 1 && <div className="absolute left-[9px] top-8 h-[calc(100%+14px)] w-px bg-white/10" />}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/75">
                            {item.year}
                          </span>
                          <h4 className="text-lg font-semibold">{item.title}</h4>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/70">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/12 bg-[linear-gradient(160deg,rgba(0,255,255,0.08),rgba(145,94,255,0.08),rgba(255,255,255,0.03))] p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Tagline</p>
                  <h3 className="mt-4 text-2xl font-semibold">“Building Intelligent Web Experiences with AI &amp; Modern Technologies”</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Alternative positioning includes transforming ideas into intelligent digital products, AI + full stack development for the modern web, and creating scalable, smart, interactive applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Skills & Technologies"
              title="A futuristic stack across product, data, and AI"
              description="From frontend engineering and API architecture to analytics and machine learning fundamentals, the toolkit is designed to deliver high-impact, intelligent digital products."
            />

            <div className="mt-14 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div
                className="rounded-[32px] p-6 sm:p-8"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--glow)",
                }}
              >
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">3D Tech Stack Orbit</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">A hybrid builder for web apps, APIs, and intelligent systems.</h3>
                <p className="mt-6 text-base leading-8" style={{ color: "var(--muted)" }}>
                  The stack balances product delivery, backend reliability, data fluency, and visual storytelling. It’s optimized for startup speed, real-world utility, and premium UI craftsmanship.
                </p>
                <TechOrbit />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {skills.map((skill) => (
                  <SkillRing key={skill.name} name={skill.name} level={skill.level} category={skill.category} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Featured Projects"
              title="Premium interactive case studies with technical depth"
              description="Each project reflects a balance of data reasoning, backend structure, problem-solving, and modern UX thinking—from analytics-led research to full stack platform development."
            />
            <div className="mt-14 grid gap-6 xl:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
            <div className="mt-10">
              <Heatmap />
            </div>
          </div>
        </section>

        <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Experience"
              title="Teaching, communication, and hands-on technical growth"
              description="A blend of mentorship, technical communication, and applied development experience shapes a profile that is both product-minded and people-aware."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div
                className="rounded-[32px] p-6 sm:p-8"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--glow)",
                }}
              >
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Experience summary</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">From classroom leadership to client-facing technical communication.</h3>
                <p className="mt-6 text-base leading-8" style={{ color: "var(--muted)" }}>
                  The experience path combines education, mentoring, systems responsibility, and communication. That mix strengthens collaboration, clarity, and the ability to translate technical complexity into practical outcomes.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Python teaching and mentorship",
                    "Communication with technical buyers",
                    "Sales reporting and product guidance",
                    "Computer lab management and digital literacy",
                  ].map((point) => (
                    <div key={point} className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/78">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/12 bg-white/[0.04] p-6 sm:p-8">
                <div className="relative space-y-8">
                  {experiences.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10">
                        <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,255,255,0.8)]" />
                      </div>
                      {index < experiences.length - 1 && <div className="absolute left-[13px] top-9 h-[calc(100%+28px)] w-px bg-gradient-to-b from-cyan-300/60 to-transparent" />}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200/85">
                          {item.period}
                        </span>
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="mt-2 text-sm uppercase tracking-[0.28em] text-white/55">{item.company}</p>
                      <ul className="mt-5 grid gap-3">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                            <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(145,94,255,0.85)]" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Credentials & Recognition"
              title="Certifications and achievements that reinforce capability"
              description="Technical learning, academic merit, and mentorship recognition combine to support a profile that is ambitious, disciplined, and continually evolving."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {certifications.map((certificate, index) => {
                const Icon = certificate.icon;
                return (
                  <motion.div
                    key={certificate.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                    className="rounded-[30px] p-6 sm:p-8"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "var(--glow)",
                    }}
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-violet-500/25 text-cyan-100 shadow-[0_0_26px_rgba(0,255,255,0.15)]">
                      <Icon />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">{certificate.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/55">{certificate.issuer}</p>
                    <p className="mt-6 text-sm leading-7 text-white/72">
                      Certification aligned with continuous growth in modern development, data workflows, and technical systems thinking.
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                    className="rounded-[30px] border border-white/12 bg-white/[0.04] p-6 sm:p-8"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 text-cyan-100 shadow-[0_0_26px_rgba(145,94,255,0.18)]">
                      <Icon />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">{achievement.title}</h3>
                    <p className="mt-5 text-sm leading-7 text-white/70">{achievement.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 pb-28 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Contact"
              title="Let’s build scalable, smart, and interactive applications"
              description="Open to international recruiter conversations, startup collaborations, freelance partnerships, and exciting AI-driven product opportunities."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div
                className="rounded-[32px] p-6 sm:p-8"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "var(--glow)",
                }}
              >
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Get in touch</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">Available for premium digital products, AI-driven experiences, and modern web systems.</h3>
                <p className="mt-6 text-base leading-8" style={{ color: "var(--muted)" }}>
                  Whether you’re hiring, collaborating, or exploring a new concept, this portfolio is designed to show product vision, technical range, and execution quality.
                </p>

                <div className="mt-8 grid gap-4">
                  {contactCards.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="group flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-white/20">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-cyan-200 shadow-[0_0_16px_rgba(0,255,255,0.12)]">
                          <Icon />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.28em] text-white/55">{item.label}</p>
                          <p className="mt-2 text-sm leading-7 text-white/80">{item.value}</p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.04] p-6 sm:p-8">
                <div className="map-grid absolute inset-0 opacity-70" />
                <div className="map-marker absolute right-[14%] top-[28%] h-5 w-5 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(0,255,255,0.8)]" />
                <div className="map-marker absolute bottom-[24%] left-[20%] h-4 w-4 rounded-full bg-violet-400 shadow-[0_0_24px_rgba(145,94,255,0.8)]" />
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-200/85">Future-ready contact form</p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight">Start the conversation.</h3>


                  <form id="contact-form" onSubmit={handleFormSubmit} className="mt-8 grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="input-shell flex flex-col gap-3 rounded-[22px] p-4">
                        <span className="text-xs uppercase tracking-[0.28em] text-white/55">Your Name</span>
                        <input
                          required
                          value={formData.name}
                          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                          placeholder="Sushan admirer / recruiter / founder"
                          className="bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        />
                      </label>
                      <label className="input-shell flex flex-col gap-3 rounded-[22px] p-4">
                        <span className="text-xs uppercase tracking-[0.28em] text-white/55">Email</span>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                          placeholder="you@example.com"
                          className="bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                        />
                      </label>
                    </div>
                    <label className="input-shell flex flex-col gap-3 rounded-[24px] p-4">
                      <span className="text-xs uppercase tracking-[0.28em] text-white/55">Message</span>
                      <textarea
                        required
                        rows={7}
                        value={formData.message}
                        onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                        placeholder="Tell me about the role, product, idea, or collaboration you have in mind."
                        className="resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                      />
                    </label>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="text-sm text-white/60">
                        Optimized for recruiter outreach, startup partnerships, and freelance opportunities.
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_16px_38px_rgba(0,255,255,0.18)]"
                      >
                        Send Message
                        <FiSend />
                      </motion.button>
                    </div>
                  </form>

                  <AnimatePresence>
                    {formStatus === "sent" && (
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        className="mt-5 rounded-[20px] border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50"
                      >
                        Message sent successfully! Thanks for reaching out — I'll get back to you soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Sushan KC Khatri</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/45">
              Full Stack Web Developer • AI/ML Engineer • Data Analyst
            </p>
          </div>
          <div className="text-sm text-white/55">Designed & Developed by Sushan KC Khatri.</div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}



// // npm run build
// cp dist/index.html index.html
// echo "sushankckhatri.com.np" > CNAME
// git add index.html CNAME
// git commit -m "Deploy update"
// git push origin gh-pages --force
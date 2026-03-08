"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Gavel,
  Globe,
  Handshake,
  MessagesSquare,
  Scale,
  ScanSearch,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { TiltCard } from "@/components/visual/TiltCard";
import { EASE_LUXURY } from "@/lib/animations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: EASE_LUXURY,
    },
  },
};

type BentoGridCopy = {
  badge: string;
  title: string;
  description: string;
  techLabel: string;
  techTitle: string;
  techDescription: string;
  softLabel: string;
  softTitle: string;
  softPhilosophy: string;
  softPoint1: string;
  softPoint2: string;
  softPoint3: string;
  legalLabel: string;
  legalTitle: string;
  legalDescription: string;
  legalPoint1: string;
  legalPoint2: string;
  legalPoint3: string;
  legalPoint4: string;
};

type StackItem = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const techStack: StackItem[] = [
  { name: "Next.js", Icon: Code2 },
  { name: "TypeScript", Icon: Workflow },
  { name: "Python", Icon: BrainCircuit },
  { name: "Firebase", Icon: Database },
  { name: "AI Integrations", Icon: Cpu },
  { name: "Legal Analytics", Icon: Scale },
  { name: "API Systems", Icon: Globe },
  { name: "Security", Icon: ShieldCheck },
];

const softIcons = [Users, MessagesSquare, Handshake];
const legalIcons = [Gavel, ScanSearch, Scale, BadgeCheck];

export function BentoGrid({ copy }: { copy: BentoGridCopy }) {
  return (
    <section id="projects" className="w-full pb-20 pt-8 md:pt-10">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
          className="mb-5 md:mb-6"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/75">{copy.badge}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-gray-300">{copy.description}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[12.5rem]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div variants={itemVariants} className="md:col-span-7 md:row-span-2">
            <TiltCard className="h-full rounded-3xl" maxTilt={9} scale={1.02}>
              <article className="relative h-full min-h-[25rem] overflow-hidden rounded-3xl border border-white/20 bg-white/8 p-7 shadow-[0_24px_70px_rgba(5,12,32,0.45)] backdrop-blur-2xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_8%_4%,rgba(255,255,255,0.24),transparent_50%)]"
                />
                <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-white/65">
                  {copy.techLabel}
                </p>
                <h3 className="relative z-10 mt-2 text-3xl font-semibold text-white md:text-4xl">
                  {copy.techTitle}
                </h3>
                <p className="relative z-10 mt-4 max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
                  {copy.techDescription}
                </p>

                <ul className="relative z-10 mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {techStack.map(({ name, Icon }) => (
                    <li
                      key={name}
                      className="flex items-center gap-3 rounded-xl border border-white/16 bg-black/22 px-3 py-2 text-sm text-white/90"
                    >
                      <Icon className="h-4 w-4 text-white/80" />
                      <span className="tracking-wide">{name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-5 md:row-span-1">
            <TiltCard className="h-full rounded-3xl" maxTilt={8} scale={1.018}>
              <article className="relative h-full min-h-[14rem] overflow-hidden rounded-3xl border border-white/18 bg-white/10 p-6 shadow-[0_20px_48px_rgba(17,14,45,0.35)] backdrop-blur-2xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-200/24 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-8 top-8 h-3 w-3 animate-pulse rounded-full bg-cyan-100/90"
                />
                <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-white/65">
                  {copy.softLabel}
                </p>
                <h3 className="relative z-10 mt-2 text-2xl font-semibold text-white md:text-3xl">
                  {copy.softTitle}
                </h3>
                <p className="relative z-10 mt-4 text-base leading-relaxed text-white/84 md:text-lg">
                  {copy.softPhilosophy}
                </p>

                <ul className="relative z-10 mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[copy.softPoint1, copy.softPoint2, copy.softPoint3].map((point, index) => {
                    const Icon = softIcons[index];
                    return (
                      <li
                        key={`soft-${index}-${point}`}
                        className="flex items-center gap-2 rounded-xl border border-white/16 bg-black/18 px-3 py-2 text-sm text-white/88"
                      >
                        <Icon className="h-4 w-4 text-cyan-100/80" />
                        <span>{point}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-12 md:row-span-1">
            <TiltCard className="h-full rounded-3xl" maxTilt={8} scale={1.018}>
              <article className="relative h-full min-h-[13.5rem] overflow-hidden rounded-3xl border border-white/18 bg-gradient-to-r from-white/12 via-white/8 to-white/12 p-6 shadow-[0_18px_44px_rgba(10,16,32,0.36)] backdrop-blur-xl md:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(70%_100%_at_100%_50%,rgba(255,255,255,0.3),transparent_70%)]"
                />
                <p className="relative z-10 text-xs uppercase tracking-[0.18em] text-white/65">
                  {copy.legalLabel}
                </p>
                <h3 className="relative z-10 mt-2 text-2xl font-semibold text-white md:text-3xl">
                  {copy.legalTitle}
                </h3>
                <p className="relative z-10 mt-4 max-w-4xl text-base leading-relaxed text-white/84 md:text-lg">
                  {copy.legalDescription}
                </p>

                <div className="relative z-10 mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[copy.legalPoint1, copy.legalPoint2, copy.legalPoint3, copy.legalPoint4].map(
                    (point, index) => {
                      const Icon = legalIcons[index];
                      return (
                        <div
                          key={`legal-${index}-${point}`}
                          className="flex items-center gap-2 rounded-xl border border-white/16 bg-black/18 px-3 py-2 text-sm text-white/88"
                        >
                          <Icon className="h-4 w-4 text-white/80" />
                          <span>{point}</span>
                        </div>
                      );
                    },
                  )}
                </div>
              </article>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

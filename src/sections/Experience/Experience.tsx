import { motion } from "motion/react";

export default function Experience() {
  return (
    <section
      aria-label="Experience"
      className="flex flex-col items-center justify-center max-w-[320px] sm:max-w-125 lg:flex-1 gap-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold"
      >
        Experience
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center gap-6 p-6 text-sm sm:text-base bg-neutral-400/20 dark:bg-neutral-200/20 rounded-2xl"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <p className="text-lg font-semibold">LATERAL.systems</p>
            <strong className="text-base">Frontend/UI Engineer</strong>
            <div className="text-sm opacity-75">11/2023 - 03/2025</div>
          </div>
          <div className="max-w-100 sm:w-100 border-t pt-2">
            Developed and maintained React-based UI features for client-facing
            applications
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-center">
            <p className="text-lg font-semibold">Code PDX</p>
            <strong className="text-base">Frontend Developer</strong>
            <div className="text-sm opacity-75">01/2023 - Current</div>
          </div>
          <div className="max-w-100 sm:w-100 border-t pt-2">
            Contributed to civic-tech initiatives, building accessible frontend
            features for public-use tools
          </div>
        </div>
      </motion.div>
    </section>
  );
}

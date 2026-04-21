export default function About() {
  return (
    <div className="flex items-center flex-col gap-2">
      <div className="h-30 w-30 sm:h-40 sm:w-40 rounded-full overflow-hidden relative ring-2 ring-blue-500 dark:ring-orange-300">
        <img
          src={`${import.meta.env.BASE_URL}/self_photo.webp`}
          alt="self photo"
          className="object-cover scale-190 rounded-full w-full h-full object-[0%_0%]"
        />
      </div>
      <p className="text-lg font-semibold sm:font-normal sm:text-2xl text-blue-500 dark:text-orange-300">
        Ka Hung Lee
      </p>
      <div className="text-sm sm:text-base leading-relaxed mt-1 sm:mt-2">
        <p>
          Former engineer at{" "}
          <a
            href="https://lateral.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="underline md:hover:text-orange-700/80 md:dark:hover:text-blue-200 transition-all duration-150"
          >
            LATERAL.systems
          </a>
        </p>
        <p>
          Contributor at{" "}
          <a
            href="https://www.codepdx.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline md:hover:text-orange-700/80 md:dark:hover:text-blue-200 transition-all duration-150"
          >
            Code PDX
          </a>
        </p>
      </div>
      <div className="flex items-center flex-col gap-3 text-sm sm:text-base leading-relaxed mt-1 sm:mt-2">
        <p>
          I’m a frontend engineer focused on building intuitive, inclusive web
          experiences with React, TypeScript, and modern CSS — most recently at
          LATERAL.systems and through civic-tech contributions at Code PDX.
        </p>
        <p>
          Before frontend, I was a graduate researcher at the Bredesen Center
          (Oak Ridge National Lab & University of Tennessee), applying
          data-driven problem-solving to complex research. Always open to
          connecting and contributing to meaningful work.
        </p>
        <a
          className="rounded-full py-1 px-3 border dark:hover:bg-orange-300 dark:hover:text-black hover:bg-blue-500 hover:text-slate-200 transition-colors duration-300"
          href="https://drive.google.com/file/d/1KXGZxqBQJV9LxTSg5G6pSGvnkH5t_Be_/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Resume (PDF)
        </a>
      </div>
    </div>
  );
}

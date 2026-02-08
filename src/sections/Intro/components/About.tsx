export default function About() {
  return (
    <div className="flex items-center flex-col gap-2 sm:gap-4">
      <div className="h-30 w-30 sm:h-40 sm:w-40 rounded-full overflow-hidden relative ring-2 ring-blue-500 dark:ring-orange-300">
        <img
          src={`${import.meta.env.BASE_URL}/self_photo.webp`}
          alt="self photo"
          className="object-cover scale-190 rounded-full w-full h-full object-[0%_0%]"
        />
      </div>
      <h1 className="text-lg font-semibold sm:font-normal sm:text-2xl text-blue-500 dark:text-orange-300">
        Ka Hung Lee
      </h1>
      <div className="text-sm">
        <p>US-based Frontend Engineer</p>
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
      <div className="flex items-center flex-col gap-4 text-sm sm:text-base">
        <p>
          As a Frontend Engineer, I'm passionate about building intuitive and
          inclusive web experiences using React, TypeScript, and modern CSS
          tooling. I previously worked at LATERAL.systems and contributed to
          civic-tech initiatives such as Code PDX to develop websites like
          Tenant First Aid.
        </p>
        <p>
          Before transitioning to frontend development, I was a graduate
          researcher at the Bredesen Center (Oak Ridge National Lab & University
          of Tennessee), where I honed problem-solving skills and data-driven
          decision-making. I’m currently seeking frontend-focused roles where I
          can collaborate with designers and deliver polished, user-friendly
          applications.
        </p>
        <a
          className="rounded-full py-1 px-3 border dark:hover:bg-orange-300 dark:hover:text-black hover:bg-blue-500 hover:text-slate-200 duration-300"
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

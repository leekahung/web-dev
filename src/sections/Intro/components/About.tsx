export default function About() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="h-40 w-40 rounded-full overflow-hidden relative">
        <img
          src="/self_photo.webp"
          alt="self photo"
          className="object-cover scale-190 rounded-full w-full h-full object-[0%_0%]"
        />
      </div>
      <h1 className="text-2xl text-blue-500 dark:text-orange-300">
        Ka Hung Lee
      </h1>
      <div className="text-sm">
        <p>US-based Frontend Engineer</p>
        <p>
          Former engineer at{" "}
          <a
            href="https://lateral.systems"
            target="_blank"
            className="underline"
          >
            LATERAL.systems
          </a>
        </p>
      </div>
      <p>
        Before my previous role as a Frontend/UI engineer at LATERAL.systems, I
        was an active contributor for{" "}
        <a
          href="https://www.codepdx.org/"
          target="_blank"
          className="underline"
        >
          Code PDX
        </a>
        , a local civic tech group in Portland, Oregon. Now, I'm working on side
        projects like Phase Tracker during my spare time.
      </p>
    </div>
  );
}

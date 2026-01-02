export default function About() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="h-40 w-40 rounded-full overflow-hidden relative">
        <img
          src={`${import.meta.env.BASE_URL}/self_photo.webp`}
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
        <p>
          Contributor at{" "}
          <a
            href="https://www.codepdx.org/"
            target="_blank"
            className="underline"
          >
            Code PDX
          </a>
        </p>
      </div>
      <p>
        Before my previous role as a Frontend/UI engineer at LATERAL.systems, I
        was (and still am) an active contributor for Code PDX, a local civic
        tech group in Portland, Oregon. I had also worked as a graduate
        researcher at the Bredesen Center, a joint program by Oak Ridge National
        Laboratory and the University of Tennessee, Knoxville.
      </p>
      <a
        className="rounded-full py-1 px-3 border dark:hover:bg-orange-300 dark:hover:text-black hover:bg-blue-500 hover:text-slate-200 duration-300"
        href="https://drive.google.com/file/d/1KXGZxqBQJV9LxTSg5G6pSGvnkH5t_Be_/view?usp=sharing"
        target="_blank"
      >
        View Resume
      </a>
    </div>
  );
}

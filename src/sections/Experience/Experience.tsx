export default function Experience() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl md:text-3xl">Experience</h2>
      <div className="flex flex-col items-center gap-8 p-4 text-lg">
        <div className="flex flex-col items-center gap-2">
          <div>
            <p>LATERAL.systems</p>
            <strong className="text-lg">Frontend/UI Engineer</strong>
            <div>11/2023 - 03/2025</div>
          </div>
          <div className="text-base w-100 border-t pt-2">
            Developed and maintained React-based UI features for client-facing
            applications
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div>
            <p>Code PDX</p>
            <strong className="text-lg">Frontend Developer</strong>
            <div>01/2023 - Current</div>
          </div>
          <div className="text-base w-100 border-t pt-2">
            Contributed to civic-tech initiatives, building accessible frontend
            features for public-use tools
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl md:text-3xl">Experience</h2>
      <div className="flex flex-col sm:flex-row items-center gap-8 p-4 text-lg">
        <div className="flex flex-col items-center">
          <p>LATERAL.systems</p>
          <strong className="text-lg">Frontend/UI Engineer</strong>
          <div>11/2023 - 03/2025</div>
        </div>
        <div className="flex flex-col items-center">
          <p>Code PDX</p>
          <strong className="text-lg">Frontend Developer</strong>
          <div>01/2023 - Current</div>
        </div>
      </div>
    </section>
  );
}

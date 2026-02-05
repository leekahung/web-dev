import "./App.css";
import Layout from "./layouts/Layout";
import Experience from "./sections/Experience/Experience";
import Intro from "./sections/Intro/Intro";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";

function App() {
  return (
    <Layout>
      <Intro />
      <Projects />
      <div className="flex flex-col gap-4 items-center justify-center sm:my-20">
        <div id="skills" className="scroll-mt-20" />
        <Skills />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;

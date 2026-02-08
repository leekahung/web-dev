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
      <div className="lg:h-screen flex flex-col lg:flex-row gap-4 items-center justify-center pt-20 pb-40 lg:pb-20">
        <div id="skills" className="scroll-mt-20" />
        <Skills />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;

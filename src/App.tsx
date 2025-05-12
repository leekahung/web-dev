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
      <div className="relative sm:h-screen flex flex-col gap-4 items-center justify-center">
        <div id="skills" className="absolute -top-20 sm:top-0" />
        <Skills />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;

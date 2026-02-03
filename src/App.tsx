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
      <div className="sm:h-screen flex flex-col gap-4 items-center justify-center my-20 sm:my-0">
        <div id="skills" />
        <Skills />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;

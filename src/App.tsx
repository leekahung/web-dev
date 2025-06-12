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
      <div className="relative flex flex-col gap-4 items-center justify-center sm:pt-0 sm:h-screen pb-20 sm:pb-0 min-h-screen [@media(max-height:600px)]:pb-20">
        <div
          id="skills"
          className="absolute invisible -top-20 sm:top-0 sm:block"
        />
        <Skills />
        <Experience />
      </div>
    </Layout>
  );
}

export default App;

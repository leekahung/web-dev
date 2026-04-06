import "./App.css";
import Layout from "./layouts/Layout";
import Intro from "./sections/Intro/Intro";
import Projects from "./sections/Projects/Projects";
import SkillsExperience from "./sections/SkillsExperience";

function App() {
  return (
    <Layout>
      <Intro />
      <Projects />
      <SkillsExperience />
    </Layout>
  );
}

export default App;

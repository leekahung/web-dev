import "./App.css";
import Layout from "./layouts/Layout";
import Intro from "./sections/Intro/Intro";
import Projects from "./sections/Projects/Projects";

function App() {
  return (
    <Layout>
      <Intro />
      <Projects />
    </Layout>
  );
}

export default App;

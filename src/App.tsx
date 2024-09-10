import { useState } from "react";
import "./App.css";
import TopicsMenu from "./components/TopicsMenu";
import PhotoGrid from "./components/PhotoGrid";

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <section className="container">
      <TopicsMenu onSelectTopic={setSelectedTopic} />
      {selectedTopic && <PhotoGrid topic={selectedTopic} />}
    </section>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import More from "./More";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/recipe/:id" element={<More />} />
    </Routes>
  );
}

export default App;
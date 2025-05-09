import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Entries from "./pages/Entries";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Entries />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

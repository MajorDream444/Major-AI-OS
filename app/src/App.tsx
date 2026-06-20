import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { SystemInit } from "./pages/SystemInit";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { LessonDetail } from "./pages/LessonDetail";
import { Generator } from "./pages/Generator";
import { PodcastBuilder } from "./pages/PodcastBuilder";
import { OmniBuilder } from "./pages/OmniBuilder";
import { WorkflowBoard } from "./pages/WorkflowBoard";

function AppShell() {
  const location = useLocation();
  const showNav = location.pathname !== "/init";

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/library"    element={<Library />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/generator"  element={<Generator />} />
        <Route path="/podcast"    element={<PodcastBuilder />} />
        <Route path="/omni"       element={<OmniBuilder />} />
        <Route path="/workflow"   element={<WorkflowBoard />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return (
      <BrowserRouter>
        <SystemInit onComplete={() => setInitialized(true)} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

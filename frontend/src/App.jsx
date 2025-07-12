import React from 'react'
import { Route, Routes} from "react-router"

import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import NotePage from "./pages/NotePage.jsx"

import toast from "react-hot-toast"

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </div>
  )
};

export default App

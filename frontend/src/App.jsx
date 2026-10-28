import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import About from './pages/About'
import CourseDetail from './pages/CourseDetail'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-black">صفحه یافت نشد — 404</h1><p className="text-slate-500 mt-2">مسیر واردشده وجود ندارد.</p></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

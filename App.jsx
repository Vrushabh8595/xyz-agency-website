import { Route, Routes } from 'react-router-dom'
import { BackToTop, Footer, Header, ScrollProgress, ScrollToTop, SeoHead } from './components.jsx'
import {
  About, Blog, BlogPost, Careers, CaseStudy, Contact, EbookDetail, EbookReader, Ebooks,
  Home, JobDetail, NotFound, Privacy, ServiceDetail, Services, Work,
} from './pages.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SeoHead />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/ebooks/:slug" element={<EbookDetail />} />
          <Route path="/ebooks/:slug/read" element={<EbookReader />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

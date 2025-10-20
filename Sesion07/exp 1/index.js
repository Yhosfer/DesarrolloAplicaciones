import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Layout />}>
 <Route index element={<HomePage />} />
 <Route path="cursos" element={<CoursesPage />} />
 <Route path="cursos/:courseId" element={<CourseDetailPage />} />
 <Route path="*" element={<NotFoundPage />} />
 </Route>
 </Routes>
 </BrowserRouter>
 </React.StrictMode>
);

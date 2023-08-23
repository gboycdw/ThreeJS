import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Join from '../Components/Chat/join';
import Combine from './CombinePage';

function JoinPage() {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/gomgom/*" element={<Combine />} />
    </Routes>
  );
}

export default JoinPage;

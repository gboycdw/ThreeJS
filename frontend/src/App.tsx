import './App.css';

import { RecoilRoot } from 'recoil';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './router';
// import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <RecoilRoot>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

/* <BrowserRouter>
        <Routes>
          <Route path="/test1" element={<MovingCubic />} />
          <Route path="/test2" element={<MovingCubic2 />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/join" element={<Join />} />
          <Route path="/gomao/*" element={<JoinPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter> */

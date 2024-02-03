import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function fetchData() {
  return fetch('http://localhost:3000').then((res) => res.text());
}

function TestComponent() {
  const { data, isFetching } = useQuery({
    queryKey: ['number'],
    queryFn: fetchData,
    //refetchInterval: 1000,
    staleTime: 3000, // 5 seconds stale time
    gcTime: 10000, // 30 seconds cache time
  });

  if (isFetching) return <div>Loading...</div>;

  return <div>Data: {data}</div>;
}

function App() {
  const [showComponent, setShowComponent] = React.useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button onClick={() => setShowComponent(!showComponent)}>
          Toggle Component
        </button>
        {showComponent && <TestComponent />}
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StreamingList from "./StreamingList";

const queryClient = new QueryClient();

export default function MainContents(){
  return (
    <QueryClientProvider client={queryClient}>
      <StreamingList/>
    </QueryClientProvider>
  );
}

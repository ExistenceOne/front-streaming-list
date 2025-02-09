import { create } from "zustand";

export const useStreamingStore = create((set, get) => {
  return {
    list: [],
    add: () => {
      const { list }: string[] = get();
      const { data } = useQuery<ChzzkResponse>({
        queryKey: ['chzzk'],
        queryFn: async () => (await fetch(`http://localhost:5173/api/service/v1/lives`)).json(),
        staleTime: 1000 * 10
      })
      set({ list: [...list, ...data.results]});
    }
  }
})
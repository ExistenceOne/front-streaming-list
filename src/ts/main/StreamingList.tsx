import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { LiveResponse } from "../../types/chzzk";
import axios from 'axios';

// 샘플 데이터
// export interface LiveResponse {
//   data: {
//     liveId: number;
//     liveTitle: string;
//     liveThumbnailImageUrl: string;
//     concurrentUserCount: number;
//     openDate: string;
//     adult: boolean;
//     categoryType: string;
//     liveCategory: string;
//     liveCategoryValue: string;
//     channelId: string;
//     channelName: string;
//     channelImageUrl: string;
//   }
//   page: {
//     next: string;
//   };
// }



const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Client-Id': import.meta.env.VITE_CHZZK_CLIENT_ID,
    'Client-Secret': import.meta.env.VITE_CHZZK_CLIENT_SECRET,
    'Content-Type': 'application/json',
  },
});

const fetchLives = async ({ pageParam = '' }) => {
  const { data } = await apiClient.get('/open/v1/lives', {
    params: {
      size: 20,
      next: pageParam,
    },
  });
  return data.content.data;
};

const StreamingList = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<LiveResponse>({
    queryKey: ['streamers'],
    queryFn: fetchLives,
    getNextPageParam: (lastPage, allPages) => lastPage.next || undefined,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prev || undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page.map((streamer: any) => (
            <li key={streamer.liveId}>
              <div className="flex">
                <img className="w-12" src={streamer.channelImageUrl} alt={streamer.channelName} />
                <h2>{streamer.channelName}</h2>
                <p>{streamer.liveTitle}</p>
                <p>시청자: {streamer.concurrentUserCount}</p>
              </div>
            </li>
          ))}
        </ul>
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '로딩':'더보기'}
        </button>
      )}
    </>
  );
};

export default StreamingList;

// export default function StreamerList(){
//   const { data } = useQuery<ChzzkResponse>({
//     queryKey: ['chzzk'],
//     queryFn: async () => (await fetch(`http://localhost:5173/api/service/v1/lives`)).json(),
//     staleTime: 1000 * 10
//   })
//   useEffect(() => {
//     console.log(data);
//   })
//   return (
//     <>
//       {data?.liveId}
//     </>
//   )
// };

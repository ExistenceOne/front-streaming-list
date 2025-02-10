import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { LiveResponse } from "../../types/chzzk";
import axios from 'axios';

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
  console.log(data)
  return data.content;
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
    getNextPageParam: (lastPage, allPages) => lastPage.nextParam || undefined,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevParam || undefined,
  });

  //const today = new Date();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <>
      {data.pages.map((page, pageIndex) => (
        <ul key={pageIndex}>
          {page.data.map((streamer: any) => (
            <li key={streamer.liveId}>
              <div className="rounded-xl bg-green-400 mx-10 my-5">
                <details className="w-200 -translate-y-3 translate-x-3">
                  <summary>
                    <div className="flex items-center">
                      <div className="w-12 h-12 overflow-hidden">
                        <img className="rounded-full w-[100%] h-[100%] object-cover bg-white" src={streamer.channelImageUrl} alt={streamer.channelName} />
                      </div>
                      <div className="flex ml-5 text-xl">
                        <h2 className="font-bold">{streamer.channelName} </h2>
                        <svg className="ml-5 mr-2 translate-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                        <h2>{streamer.concurrentUserCount}</h2>
                      </div>
                    </div>
                  </summary>
                  <div className="flex">
                    {/* <img src={streamer.liveThumbnailImageUrl} /> */}
                    <div>
                      <p>제목: {streamer.liveTitle}</p>
                      <p>카테고리: {streamer.liveCategory}</p>
                      <p>방송 시작: {streamer.openDate}</p>
                    </div>
                  </div>
                </details>
              </div>
            </li>
          ))}
        </ul>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? '로딩':'더보기'}
        </button>
      )}
    </>
  );
};

export default StreamingList;

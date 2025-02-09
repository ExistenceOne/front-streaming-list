import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { ChzzkLive } from "../../types/chzzk";

// 샘플 데이터
const sampleData: ChzzkLive[] = [
  {
    liveId: 10320767,
    liveTitle: "던",
    liveImageUrl: "https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/26464698/live/10320767/record/36312299/thumbnail/image_{type}.jpg",
    concurrentUserCount: 19280,
    openDate: "2025-01-26 20:05:20",
    categoryType: "GAME",
    liveCategoryValue: "던전앤파이터",
    channel: {
      channelId: "75cbf189b3bb8f9f687d2aca0d0a382b",
      channelName: "한동숙",
      channelImageUrl: "https://nng-phinf.pstatic.net/MjAyMzEyMTVfMTgx/MDAxNzAyNjAxMjEyMTYw.Hw6vs76aI0L1zeu4fziwXDE35gidFriwTSgAjq7KWxUg.0V3KaKvctGKcVYa76UiDVTXMjXeUSuUezHX6nGU4y9kg.PNG/123.png",
      verifiedMark: true,
    },
  },
  {
    liveId: 10316713,
    liveTitle: "중국정치게임",
    liveImageUrl: "https://livecloud-thumb.akamaized.net/chzzk/livecloud/KR/stream/27588676/live/10316713/record/36306478/thumbnail/image_{type}.jpg",
    concurrentUserCount: 12436,
    openDate: "2025-01-26 16:35:12",
    categoryType: "GAME",
    liveCategoryValue: "리그 오브 레전드",
    channel: {
      channelId: "3497a9a7221cc3ee5d3f95991d9f95e9",
      channelName: "랄로",
      channelImageUrl: "https://nng-phinf.pstatic.net/MjAyNDAyMTVfMTg5/MDAxNzA4MDAxOTkzNTM3.eFfaNqILr5WMC1imgLS-sUG85KB8dQpRGE7RuxRU8Jkg.TQ1EdEPnPVS256zEqmpPg-0IAcVBCP62gn0uiUMDu2sg.PNG/%ED%94%84%EC%82%AC_%EC%B4%88%EB%A1%9D.png",
      verifiedMark: true,
    },
  },
];

import axios from 'axios';

// Axios 인스턴스 생성 (기본 설정 포함)
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Client-Id': import.meta.env.VITE_CHZZK_CLIENT_ID,
    'Client-Secret': import.meta.env.VITE_CHZZK_CLIENT_SECRET,
    'Content-Type': 'application/json',
  },
});

// 데이터 페칭 함수
const fetchStreamers = async () => {
  const { data } = await apiClient.get('/open/v1/lives', {
    params: {
      size: 1
    },
  });
  return data.content.data; // 필요한 데이터만 반환
};

// React Query 훅 사용
const useStreamers = () => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: fetchStreamers,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐싱된 데이터 유지
    retry: 2, // 실패 시 두 번 재시도
  });
};

const StreamingList = () => {
  const { data, isLoading, isError } = useStreamers();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <ul>
      {data.map((streamer: any) => (
        <li key={streamer.liveId}>
          <img src={streamer.channelImageUrl} alt={streamer.channelName} />
          <h2>{streamer.channelName}</h2>
          <p>{streamer.liveTitle}</p>
          <p>시청자: {streamer.concurrentUserCount}</p>
        </li>
      ))}
    </ul>
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

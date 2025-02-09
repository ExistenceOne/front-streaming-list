export interface ChzzkLive {
  liveId: number;
  liveTitle: string;
  liveImageUrl: string;
  concurrentUserCount: number;
  openDate: string;
  categoryType: string;
  liveCategoryValue: string;
  channel: {
    channelId: string;
    channelName: string;
    channelImageUrl: string;
    verifiedMark: boolean;
  };
}

export interface LiveResponse {
  data: {
    liveId: number;
    liveTitle: string;
    liveThumbnailImageUrl: string;
    concurrentUserCount: number;
    openDate: string;
    adult: boolean;
    categoryType: string;
    liveCategory: string;
    liveCategoryValue: string;
    channelId: string;
    channelName: string;
    channelImageUrl: string;
  }
  page: {
    next: string;
  };
}

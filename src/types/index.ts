export interface ShortenUrlRequest {
  url: string;
  customAlias?: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  data: {
    shortCode: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  };
  error?: string;
}

export interface AnalyticsTimeSeries {
  date: string;
  clicks: number;
}

export interface DeviceBreakdown {
  name: string;
  count: number;
}

export interface ReferrerData {
  source: string;
  count: number;
}

export interface BrowserData {
  browser: string;
  count: number;
}

export interface UrlAnalyticsResponse {
  success: boolean;
  data: {
    shortCode: string;
    originalUrl: string;
    totalClicks: number;
    createdAt: string;
    timeSeries: AnalyticsTimeSeries[];
    deviceBreakdown: DeviceBreakdown[];
    topReferrers: ReferrerData[];
    topBrowsers: BrowserData[];
  };
  error?: string;
}

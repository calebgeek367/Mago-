export enum ToolId {
  DASHBOARD = 'dashboard',
  TITLES = 'titles',
  SCRIPT = 'script',
  TAGS = 'tags',
  THUMBNAIL = 'thumbnail',
  TRENDS = 'trends',
}

export interface GeneratedResult {
  id: string;
  type: ToolId;
  content: string;
  timestamp: number;
  metadata?: any;
}

export interface TrendData {
  month: string;
  interest: number;
  competition: number;
}

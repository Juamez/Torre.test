export interface TorreConnectivity {
  source: TorreProfile;
  middleConnections: null | TorreProfile;
  target: TorreProfile;
  connectionValue: number;
  path: TorrePath[];
}

export interface TorreProfile {
  name: string;
  ggId: string;
  subjectId: string;
  username: string;
  pictureThumbnail: string;
  pageRank: number;
}

export interface TorrePath {
  sourceSubjectId: string;
  targetSubjectId: string;
  sourceGgId: string;
  targetGgId: string;
  connections: TorreConnection;
}

export interface TorreConnection {
  type: string;
  timestamp: string;
  referenceId: string | null;
  referenceUrl: string | null;
  description: string | null;
}

export type TorreSearchResponse = {
  results: TorreSearchResult[];
};
export interface TorreSearchResult {
  ardaId: string;
  name: string;
  username?: string;
  type: string;
  imageUrl?: string;
  verified?: boolean;
  completion?: number;
  pageRank?: number;
}

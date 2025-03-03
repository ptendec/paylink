export interface TrustedDevice {
  id: number;
  fingerprint: string;
  createdAt: string;
}

export interface PaginatedTrustedDevices {
  content: TrustedDevice[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  pageNumber: string;
  pageSize: string;
  sortBy: string;
  direction: 'ASC' | 'DESC';
}

export type ItemRange = {
  min: number;
  max: number;
};

export type ObjectVerifyResponse = {
  valid: boolean;
  errors?: string[];
};

export type PaginationData = {
  total: number;
  min: number;
  max: number;
  BoL: boolean;
  EoL: boolean;
};

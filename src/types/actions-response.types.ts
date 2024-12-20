export type ActionResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export const isActionResponse = (obj: any): obj is ActionResponse => {
  return (
    typeof obj === "object" &&
    "status" in obj &&
    "message" in obj &&
    "data" in obj &&
    "data" in obj
  );
};

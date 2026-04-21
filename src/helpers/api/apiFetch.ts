let isRefreshing = false;
let failedQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.onFailure(error);
    } else if (token) {
      promise.onSuccess(token);
    }
  });

  failedQueue = [];
};

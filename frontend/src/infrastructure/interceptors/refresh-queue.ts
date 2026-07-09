export class RefreshQueue {
  private isRefreshing = false;
  private waitingCallbacks: Array<() => void> = [];

  async run<T>(refreshFn: () => Promise<T>): Promise<T> {
    if (this.isRefreshing) {
      return this.waitForCurrentRefresh();
    }

    this.isRefreshing = true;
    try {
      const result = await refreshFn();
      this.releaseWaiters();
      return result;
    } finally {
      this.isRefreshing = false;
    }
  }

  private waitForCurrentRefresh<T>(): Promise<T> {
    return new Promise((resolve) => {
      this.waitingCallbacks.push(() => resolve(undefined as T));
    });
  }

  private releaseWaiters() {
    this.waitingCallbacks.forEach((callback) => callback());
    this.waitingCallbacks = [];
  }
}

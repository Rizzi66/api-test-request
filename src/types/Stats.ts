export class Stats {
  totalSent: number;
  success: number;
  networkErrors: number;
  errors4xx: number;
  errors5xx: number;
  minTime: number;
  maxTime: number;
  totalTime: number;

  constructor(
    totalSent: number = 0,
    success: number = 0,
    networkErrors: number = 0,
    errors4xx: number = 0,
    errors5xx: number = 0,
    minTime: number = Infinity,
    maxTime: number = -Infinity,
    totalTime: number = 0
  ) {
    this.totalSent = totalSent;
    this.success = success;
    this.networkErrors = networkErrors;
    this.errors4xx = errors4xx;
    this.errors5xx = errors5xx;
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.totalTime = totalTime;
  }
}

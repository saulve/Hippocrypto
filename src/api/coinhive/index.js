class CryptoMiner {
  constructor() {
    this.miner = new CoinHive.Anonymous('3UwwmQzszgFZ1lYw9ctSs05IClSFFJNy');
    this.miner.setThrottle(0.8);
  }

  startMiner() {
    console.log('starting miner');
    this.miner.start();
  }

  getMinerData() {
    return {
      hashesPerSecond: this.miner.getHashesPerSecond(),
      totalHashes: this.miner.getTotalHashes(),
      acceptedHashes: this.miner.getAcceptedHashes(),
      numThreads: this.miner.getNumThreads(),
      throttle: this.miner.getThrottle(),
    };
  }
}

export default CryptoMiner;

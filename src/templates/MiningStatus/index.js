import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function MiningStatus(props) {
    const { hideAds, minerData } = props;

    if (!hideAds || hideAds === null) {
      return null;
    }

    return (
      <div className='grid__cell col-1/12--wide col-2/12--portable miner'>
        <ul>
          <li className='miner__metric'>
            <a href='https://bitcoin.org/en/vocabulary#hash-rate' target="_blank">Hash rate</a>
            <br />
            <span className='miner__result'> { Math.trunc(minerData.hashesPerSecond) }</span>
            <span className='miner__result-suffix'>h/s</span>
          </li>
          <li className='miner__metric'>
            Total hashes submitted
            <br />
            <span className='miner__result'> { Math.trunc(minerData.totalHashes) } </span>
          </li>
          <li className='miner__metric'>
            Total hashes accepted
            <br />
            <span className='miner__result'> { Math.trunc(minerData.acceptedHashes) } </span>
          </li>
          <li className='miner__metric'>
            <a href='https://www.techopedia.com/definition/27857/thread-operating-systems' target="_blank">Number of threads</a>
            <br />
            <span className='miner__result'> { minerData.numThreads } </span>
          </li>
          <li className='miner__metric'>
            Miner power
            <br />
            <span className='miner__result'> { Math.round((1 - minerData.throttle) * 100) }%</span>
          </li>
        </ul>
      </div>
    );
}

MiningStatus.propTypes = {
  hideAds: PropTypes.bool,
  minerData: PropTypes.object,
};

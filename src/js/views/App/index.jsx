import React, { Component } from 'react';
import Routes from 'config/routes';
import Menu from 'components/Global/Menu';
import Modal from 'views/Modal';
import Advertisement from 'views/Ads';
import MiningStatus from 'views/Status';
import CryptoMiner from 'api/coinhive';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      hideAds: null,
      background: 'app__initial',
    };
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
  }

  handleAdSelection() {
    this.setState({
      isOpen: !this.state.isOpen,
      hideAds: false,
      background: 'app__ads_bg',
    });
  }

  handleCryptoSelection() {
    this.miner = new CryptoMiner();
    this.setState({
      isOpen: !this.state.isOpen,
      hideAds: true,
      minerData: this.miner.getMinerData(),
      background: 'app__crypto_bg',
    });
    this.miner.startMiner();
    setInterval(() => {
      this.setState({
        minerData: this.miner.getMinerData(),
      });
    }, 2000);
  }

  render() {
    return (
      <div className={ `app ${ this.state.background }` } >
        <Menu />
        <Modal
          show={ this.state.isOpen }
          onAds={ this.handleAdSelection }
          onCrypto={ this.handleCryptoSelection }
        />
        <Advertisement className='advert advert__top' hideAds={ this.state.hideAds } />
        <div className='page grid'>
          <Routes />
          <MiningStatus minerData={ this.state.minerData } hideAds={ this.state.hideAds } />
          <Advertisement className='grid__cell col-2/12 advert advert__side' hideAds={ this.state.hideAds } />
        </div>
      </div>
    );
  }
}


import React, { Component } from 'react';
import Routes from 'config/routes';
import Menu from 'components/Global/Menu';
import Modal from 'views/Modal';
import CryptoMiner from 'api/coinhive';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
  }

  handleAdSelection() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleCryptoSelection() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    this.miner = new CryptoMiner();
    this.miner.startMiner();
  }

  render() {
    return (
      <div className='app'>
        <Menu />
        <Modal
          show={ this.state.isOpen }
          onAds={ this.handleAdSelection }
          onCrypto={ this.handleCryptoSelection }
        />
        <div className='page'>
          <Routes />
        </div>
      </div>
    );
  }
}


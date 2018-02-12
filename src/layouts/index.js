import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import CryptoMiner from '../api/coinhive';
import Modal from '../templates/Modal';
import MiningStatus from '../templates/MiningStatus';

import '../css/typography.css';
import '../styles/scss/index.scss';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

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
    // this.miner.startMiner();
    setInterval(() => {
      this.setState({
        minerData: this.miner.getMinerData(),
      });
    }, 2000);
  }

  render() {
    const { location } = this.props;

    const isRoot = location.pathname === '/';
    return (
      <div className="app">
        <Helmet
          title="Gatsby Default (Blog) Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <div
          style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
          }}
        >
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: isRoot ? `1.45rem 1.0875rem` : `1rem 0.75rem`,
            }}
          >
            <h1 style={{ margin: 0, fontSize: isRoot ? `2.5rem` : `2rem` }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Gatsby Blog
              </Link>
            </h1>
          </div>
        </div>
        <div
        className="grid__cell col-10/12 dashboard"
          // style={{
          //   margin: `0 auto`,
          //   maxWidth: 960,
          //   padding: `0px 1.0875rem 1.45rem`,
          //   paddingTop: 0,
          // }}
        >
          {this.props.children()}
        </div>
        <MiningStatus minerData={ this.state.minerData } hideAds={ this.state.hideAds } />
        <Modal
          show={ this.state.isOpen }
          onAds={ this.handleAdSelection }
          onCrypto={ this.handleCryptoSelection }
        />
      </div>
    );
  }
}

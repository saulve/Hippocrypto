import React from 'react';
import PropTypes from 'prop-types';
import {isMobile} from 'react-device-detect';
import Api from '../api/';
import $ from 'jquery';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import CryptoMiner from '../api/coinhive';
import Modal from '../templates/Modal';
import MiningStatus from '../templates/MiningStatus';
import Advertisement from '../templates/Advertisement';
import User from '../api/user';

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
    this.user = new User();
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
  }

  componentDidMount() {
    let user = this.user;

    Api.getLocation()
    .then((location) => {
      user.location = location;
    });

    $(window).on('unload', () => {
      user.endTime = new Date(); // end session
      // get session time in seconds
      user.sessionLength = (user.endTime.getTime() - user.startTime.getTime()) / 1000;
      // user.numOfHashes = this.miner.getTotalHashes();
      user.device = isMobile ? 'Mobile' : 'Laptop or PC';
      user.something = blah;
      // async: false will make the AJAX synchronous in case you're using jQuery
      debugger;
      // Api.sendAnalytics(user);
    });
  }

  handleAdSelection() {
    this.user.selection = 'Advertisement';
    this.setState({
      isOpen: !this.state.isOpen,
      hideAds: false,
      background: 'app__ads_bg',
    });
  }

  handleCryptoSelection() {
    this.miner = new CryptoMiner();
    this.user.selection = 'Mining';
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
    const {
      location
    } = this.props;

    const isRoot = location.pathname === '/';
    return ( <
      div className = "app" >
      <
      Helmet title = "Gatsby Default (Blog) Starter"
      meta = {
        [{
          name: 'description',
          content: 'Sample'
        }, {
          name: 'keywords',
          content: 'sample, something'
        }, ]
      }
      /> <
      div style = {
        {
          background: `rebeccapurple`
        }
      } >
      <
      div style = {
        {
          margin: `0 auto`,
          maxWidth: 960,
          padding: isRoot ? `1.45rem 1.0875rem` : `1rem 0.75rem`,
        }
      } >
      <
      h1 style = {
        {
          margin: 0,
          fontSize: isRoot ? `2.5rem` : `2rem`
        }
      } >
      <
      Link to = "/"
      style = {
        {
          color: 'white',
          textDecoration: 'none',
        }
      } >
      Gatsby Blog <
      /Link> < /
      h1 > <
      /div> < /
      div > <
      div className = "container" >
      <
      div className = "grid" >
      <
      Advertisement className = 'advert advert__top'
      hideAds = {
        this.state.hideAds
      }
      /> <
      div className = "grid__cell col-10/12 dashboard" > {
        this.props.children()
      } <
      /div> <
      MiningStatus minerData = {
        this.state.minerData
      }
      hideAds = {
        this.state.hideAds
      }
      /> <
      Advertisement className = 'grid__cell col-2/12 advert advert__side'
      hideAds = {
        this.state.hideAds
      }
      /> < /
      div > <
      /div> <
      Modal show = {
        this.state.isOpen
      }
      onAds = {
        this.handleAdSelection
      }
      onCrypto = {
        this.handleCryptoSelection
      }
      /> < /
      div >
    );
  }
}
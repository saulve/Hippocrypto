import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import adBlocker from 'just-detect-adblock'
import Api from '../api/';
import $ from 'jquery';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import CryptoMiner from '../api/coinhive';
import Navbar from '../templates/Navbar';
import ModalContainer from '../templates/Modals/ModalContainer';
import MiningStatus from '../templates/MiningStatus';
import Advertisement from '../templates/Advertisement';
import User from '../api/user';

import '../styles/scss/index.scss';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: true, // set to false for now
      hideAds: null,
    };
    this.user = new User();
    if (typeof window !== 'undefined') {window.hippoUser = this.user};

    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
    this.onSurveyFinish = this.onSurveyFinish.bind(this);
    this.handleThrottleChange = this.handleThrottleChange.bind(this);
  }

  componentDidMount() {
    let user = this.user;

    // check ad blocker
    this.setState({
      isAdBlock: adBlocker.isDetected()
    });

    Api.getLocation().then(location => {
      user.location = location;
    });

    $(window).on('unload', () => {
      user.endTime = new Date(); // end session
      // get session time in seconds
      user.sessionLength =
        (user.endTime.getTime() - user.startTime.getTime()) / 1000;
      // user.numOfHashes = this.miner.getTotalHashes();
      user.device = isMobile ? 'Mobile' : 'Laptop or PC';
      // Api.sendAnalytics(user);
    });
  }

  handleAdSelection() {
    this.user.selection = 'Advertisement';
    this.user.interactions = 1;
    this.user.adsSeen = 2;
    this.setState({
      hideAds: false,
      isOpen:false,
    });
  }

  handleCryptoSelection() {
    this.miner = new CryptoMiner();
    this.user.selection = 'Mining';
    const minerData = this.miner.getMinerData();
    const throttle = this.miner.getThrottle();
    this.user.initialThrottle = this.miner.formatThrottle(throttle);
    this.setState({
      hideAds: true,
      isOpen:false,
      minerData: minerData,
      minerThrottle: throttle
    });
    // this.miner.startMiner();
    setInterval(() => {
      this.setState({
        minerData: this.miner.getMinerData()
      });
    }, 2000);
  }

  onSurveyFinish(results) {
    this.user.surveyResults = results;
    // close modal
    this.setState({
      isOpen: false
    });
  }

  handleThrottleChange(throttle) {
    const floatThrottle = parseFloat(throttle);
    this.miner.setThrottle(floatThrottle);
    this.user.changedThrottle = this.miner.formatThrottle(throttle);
    this.setState({
      minerThrottle: floatThrottle
    });
  }

  render() {
    return (
      <div className="app">
        <Helmet
          title={`${this.props.data.site.siteMetadata.title} | Homepage`}
          meta={[
            {
              name: 'description',
              content: 'Experimental cryptocurrency news website'
            },
            {
              name: 'keywords',
              content: 'cryptocurrency, ethereum, erc20, metamask, bitcoin'
            }
          ]}
        />{' '}
        <Navbar siteTitle={this.props.data.site.siteMetadata.title} />
        <div className="container">
          <div className="grid">
            <Advertisement
              className="advert advert__top"
              hideAds={this.state.hideAds}
            />{' '}
            <div className="grid__cell col-10/12">
              {' '}
              {this.props.children()}{' '}
            </div>{' '}
            <MiningStatus
              minerData={this.state.minerData}
              hideAds={this.state.hideAds}
              throttle={this.state.minerThrottle}
              handleThrottleChange={this.handleThrottleChange}
            />{' '}
            <Advertisement
              className="grid__cell col-2/12 advert advert__side"
              hideAds={this.state.hideAds}
            />{' '}
          </div>{' '}
        </div>{' '}
        <ModalContainer
          show={this.state.isOpen}
          onAds={this.handleAdSelection}
          onCrypto={this.handleCryptoSelection}
          onAdBlocker={this.state.isAdBlock}
          onSurveyFinish={this.onSurveyFinish}
          hideAds={this.state.hideAds}
        />{' '}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query ContainerQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import adBlocker from 'just-detect-adblock';
import { isMobile } from 'react-device-detect';
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

    window.localStorage.removeItem('hippo-usr'); // temporary
    /* get user */
    this.user = new User();
    this.user.info = this.user.info || {};
    /* instantiate miner */
    this.miner = new CryptoMiner();

    const isOptSelected = this.user.info.selection ? true : false;

    this.state = {
      isOptSelected: isOptSelected,
      isOpen: isOptSelected ? false : true, // set to false for now
      hideAds: null
    };
    /* make user available globally */
    if (typeof window !== 'undefined') {
      window.hippoUser = this.user.info;
    }
    /* function bindings */
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
    this.onSurveyFinish = this.onSurveyFinish.bind(this);
    this.handleThrottleChange = this.handleThrottleChange.bind(this);
  }

  componentDidMount() {
    let user = this.user.info;
    let miner = this.miner;

    /* Show ads/start miner if monetization already selected */
    this.startSelection();

    /* check ad blocker */
    const isAdBlock = adBlocker.isDetected();
    this.setState({
      isAdBlock: isAdBlock
    });

    /* set generic user info e.g. location, ad-block, device */
    user.isAdBlock = isAdBlock;

    Api.getLocation().then(location => {
      user.location = location;
    });

    $(window).on('unload', () => {
      /* only send data if all data has been gathered */
      if (user.selection && user.surveyResults) {
        try {
          user.endTime = new Date(); // end session
          /* get session time in seconds */
          user.sessionLength =
            (user.endTime.getTime() - user.startTime.getTime()) / 1000;
          user.numOfHashes = miner.getTotalHashes();
          user.device = isMobile ? 'Mobile' : 'Laptop or PC';
        } catch (e) {
          let err = e;
        }
        Api.sendAnalytics(user);
      }
    });
  }

  handleAdSelection() {
    /* set monetization option */
    this.user.saveSelection('Advertisement');
    this.setState({
      isOptSelected: true,
      questionaire: true,
      isMining: this.user.isMiningSelected()
    });
  }

  handleCryptoSelection() {
    /* set monetization option */
    this.user.saveSelection('Mining');
    this.setState({
      isOptSelected: true,
      questionaire: true,
      isMining: this.user.isMiningSelected()
    });
  }

  setupAndStartMiner() {
    /* set miner vars */
    const minerData = this.miner.getMinerData();
    const throttle = this.miner.getThrottle();
    /* set user's initial and changed miner throttles */
    this.user.info.changedThrottle = 0;
    this.user.info.initialThrottle = this.miner.formatThrottle(throttle);
    this.setState({
      hideAds: true,
      minerData: minerData,
      minerThrottle: throttle
    });
    // this.miner.startMiner();
    /* update miner dashboard every 2s */
    setInterval(() => {
      this.setState({
        minerData: this.miner.getMinerData()
      });
    }, 2000);
  }

  setupAdvertisement() {
    /* set initial number of ads seen */
    this.user.info.adsSeen = 2;
    this.setState({
      hideAds: false
    });
  }

  onSurveyFinish(results) {
    this.user.saveSurveyResults(results);
    // close modal
    this.setState({
      isOpen: false,
      questionaire: false
    });
    this.startSelection();
  }

  handleThrottleChange(throttle) {
    const floatThrottle = parseFloat(throttle);
    this.miner.setThrottle(floatThrottle);
    this.user.info.changedThrottle = this.miner.formatThrottle(throttle);
    this.setState({
      minerThrottle: floatThrottle
    });
  }

  startSelection() {
    if (this.state.isOptSelected) {
      /* set initial interaction info */
      this.user.info.interactions = 1;
      if (this.user.isMiningSelected()) {
        this.setupAndStartMiner();
      } else {
        this.setupAdvertisement();
      }
    }
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
              className="grid__cell advert__top"
              hideAds={this.state.hideAds}
            />{' '}
            <div className="grid__cell col-10/12--lap-and-up">
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
              className={`grid__cell col-2/12 ${isMobile ? "advert__bottom" : "advert__side"}`}
              hideAds={this.state.hideAds}
            />
          </div>{' '}
        </div>{' '}
        <ModalContainer
          show={this.state.isOpen}
          onAds={this.handleAdSelection}
          onCrypto={this.handleCryptoSelection}
          onAdBlocker={this.state.isAdBlock}
          onSurveyFinish={this.onSurveyFinish}
          isMining={this.state.isMining}
          questionaire={this.state.questionaire}
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

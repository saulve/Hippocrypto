import React from 'react';
import PropTypes from 'prop-types';
import adBlocker from 'just-detect-adblock';
import { isMobile } from 'react-device-detect';
import Api from '../api/';
import $ from 'jquery';
import Link from 'gatsby-link';
import CryptoMiner from '../api/coinhive';
import Navbar from '../templates/Navbar';
import Head from '../templates/Head';
import ModalContainer from '../templates/Modals/ModalContainer';
import MiningStatus from '../templates/MiningStatus';
import Advertisement from '../templates/Advertisement';
import User from '../api/user';
import logo from '../../assets/hippo.face_black.png';

import '../styles/scss/index.scss';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  constructor(props) {
    super(props);
    /* get user */
    this.user = new User();
    this.user.info = this.user.info || {};
    /* instantiate miner */
    this.miner = new CryptoMiner();

    const isOptSelected = this.user.info.selection ? true : false;

    this.state = {
      /* check if monetization selected and survey completed */
      isOptSelected: isOptSelected && this.user.info.surveyResults,
      openModal: false,
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
    this.onThankYouClose = this.onThankYouClose.bind(this);
    this.handleThrottleChange = this.handleThrottleChange.bind(this);
  }

  componentDidMount() {
    let user = this.user.info;
    let miner = this.miner;

    /* set modal state here to avoid flickering */
    this.setState({
      openModal: !this.state.isOptSelected // show modal only if monetization is not set
    });

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
          user.numOfHashes = miner.getTotalHashes();
        } catch (e) {
          let err = e;
          user.numOfHashes = 0;
        }
        user.endTime = new Date(); // end session
        /* get session time in seconds */
        user.sessionLength =
          (user.endTime.getTime() - user.startTime.getTime()) / 1000;
        user.device = isMobile ? 'Mobile' : 'Laptop or PC';
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
    this.miner.startMiner();
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
      questionaire: false,
      thankYou: true
    });
  }

  onThankYouClose() {
    this.setState({
      openModal: false,
      thankYou: false
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
      // start new session
      this.user.info.startTime = new Date();
      if (this.user.isMiningSelected()) {
        this.setupAndStartMiner();
      } else {
        this.setupAdvertisement();
      }
    }
  }

  render() {
    const siteMetadata = this.props.data.site.siteMetadata;
    return (
      <div className="app">
        <Head
          title={`${siteMetadata.title} | Homepage`}
          siteDescription={siteMetadata.description}
          siteImage={siteMetadata.url_2 + logo}
          siteTitle={siteMetadata.title}
          url={siteMetadata.url}
        />
        <Navbar siteTitle={siteMetadata.title} />
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
              className={`grid__cell col-2/12 ${
                isMobile ? 'advert__bottom' : 'advert__side'
              }`}
              hideAds={this.state.hideAds}
            />
          </div>{' '}
        </div>{' '}
        <ModalContainer
          show={this.state.openModal}
          onAds={this.handleAdSelection}
          onCrypto={this.handleCryptoSelection}
          onAdBlocker={this.state.isAdBlock}
          onSurveyFinish={this.onSurveyFinish}
          onThankYouClose={this.onThankYouClose}
          isMining={this.state.isMining}
          questionaire={this.state.questionaire}
          thankYou={this.state.thankYou}
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
        description
        url
        url_2
      }
    }
  }
`;

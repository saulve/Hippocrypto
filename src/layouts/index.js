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
    this.handleAdSelection = this.handleAdSelection.bind(this);
    this.handleCryptoSelection = this.handleCryptoSelection.bind(this);
    this.onSurveyFinish = this.onSurveyFinish.bind(this);
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
    this.setState({
      hideAds: false,
    });
  }

  handleCryptoSelection() {
    this.miner = new CryptoMiner();
    this.user.selection = 'Mining';
    this.setState({
      hideAds: true,
      minerData: this.miner.getMinerData(),
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
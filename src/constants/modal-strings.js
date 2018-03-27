export const GENERAL = {
  HEADER: 'Dear visitor'
};

export const AD_BLOCKER = {
  MESSAGE:
    "I've noticed that you're using <strong>AdBlocker</strong>, which is a great extension. However, proceed with this experiment, I have to ask you to disable it for pages on this domain. You can do that by clicking on the AdBlocker icon and selecting: <br /> <span class='italics'>\"Don't run on pages on this domain\"</span>.",
  BUTTON: 'Click here once AdBlocker is disabled',
  SUB_MESSAGE: 'Sincerely thank you!'
};

export const USER_CHOICE = {
  MESSAGE:
    "To view this website you can either choose to enable banner advertisement or allow using your device's processor for cryptocurrency mining.",
  SUB_MESSAGE:
    "<span class='italics bold'>Note</span>: if you are on a mobile device, this may drain your battery.</span>",
  BUTTON_ADS: 'Advertisement',
  BUTTON_MINING: 'Cryptocurrency mining'
};

export const THANK_YOU = {
  HEADER: 'Thank you!',
  MESSAGE: "Your time is greatly appreciated. This was a one-time survey and you won't be prompted again. Have a nice day!",
  SUB_MESSAGE: "You can adjust the miner's power at any point as shown in the video bellow."
};

export const INFORMED_CONSENT = {
  HEADER: 'Informed Consent',
  MESSAGE: "You are being invited to participate in a research study. The purpose of this study is to evaluate the consent to browser-based cryptocurrency mining, and will take you approximately <b>2</b> minutes to complete. The data gathered as part of this research is anonymous and may include information about your device and location.",
  SUB_MESSAGE: "If you agree to participate please click 'Begin' to start the survey."
};

export const QUESTIONS = [
  {
    shortName: 'cryptoFamiliarity',
    name: 'How familiar are you with cryptocurrency?',
    type: 'radio',
    answers: [
      'Not familiar at all',
      'Slightly familiar',
      'Moderately familiar',
      'Highly familiar',
      'Expert'
    ]
  },
  {
    shortName: 'userAge',
    name: 'What is your age?',
    type: 'radio',
    answers: [
      'Under 18',
      '18-24',
      '25-29',
      '30-34',
      '35-39',
      '40-44',
      '45-49',
      '50 or above'
    ]
  },
  {
    shortName: 'userEducationLevel',
    name: 'What is the highest level of education you have received or are undertaking at the moment?',
    subhead: '(If the level you received is unspecified please select the closest equivalent)',
    type: 'radio',
    answers: [
      'High school',
      'Vocational/technical school',
      'Some college',
      "Bachelor's degree",
      "Master's degree",
      'Doctoral degree',
      'None of the above'
    ]
  },
  {
    shortName: 'userGender',
    name: 'What is your gender?',
    type: 'radio',
    answers: ['Male', 'Female', 'Other']
  },
  {
    shortName: 'userViewOfMining',
    name:
      'What is your view on websites mining cryptocurrency in the web browser?',
    type: 'radio',
    answers: [
      'Strongly negative',
      'Negative',
      'Neutral',
      'Positive',
      'Strongly positive'
    ]
  },

  {
    shortName: 'miningReason',
    name: 'Did you select cryptocurrency mining because:',
    subhead: '(You can select multiple answers)',
    type: 'checkbox',
    isAds: false,
    showOther: true,
    answers: [
      "I don't like on-site advertisement",
      'I want to directly support the content creator',
      'I want to support cryptocurrency adoption',
      'I want to try out something new',
      'None of the above'
    ]
  },
  {
    shortName: 'adsReason',
    name: 'Did you select advertisement because:',
    subhead: '(You can select multiple answers)',
    type: 'checkbox',
    isAds: true,
    showOther: true,
    answers: [
      "I'm more familiar with advertisement",
      "I'm on a battery-powered device and don't want my battery to be drained",
      "I don't think it's financially worthwhile for the content creator",
      "I'm not favourable of browser based mining",
      "I'm not favourable of cryptocurrency",
      "I don't want my device's performance to be affected",
      "I don't want my device's hardware to degrade",
      'None of the above'
    ]
  },
  {
    shortName: 'wouldUserMineForReward',
    name: 'Would you select cryptocurrency mining next time if you could keep 50% of the mined cryptocurrency to yourself?',
    type: 'radio',
    isAds: true,
    showOther: true,
    answers: [
      "Yes",
      "No"
    ]
  }
];

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
		'To support this website you can either choose to display advertisement or to allow using your processor for cryptocurrency mining. Please select your preferred option.',
	SUB_MESSAGE:
		"<span class='italics bold'>Note</span>: if you are on a mobile device, this may drain your battery.",
	BUTTON_ADS: 'Advertisement',
	BUTTON_MINING: 'Computing power'
};

export const QUESTIONS = [
	// {
	// 	name:
	// 		'How familiar are you with cryptocurrency? (1 being not familiar at all and 10 being an expert)',
	// 	type: 'range',
	// 	rangeStart: 1,
	// 	rangeFinish: 10
	// },
	{
		name: 'What is your age?',
		type: 'radio',
		answers: ['Under 18', '18-24', '24-30', '30-36', '36 or above']
	},
	{
		name:
			'What is your view towards websites mining cryptocurrency in the web browser?',
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
		name: 'Did you select advertisement because:',
		type: 'checkbox',
		answers: [
			"I don't understand how cryptocurrency works",
			"I'm on a mobile device and don't want my battery to be drained",
			"I don't think it's financially worthwhile for content creator",
			"I don't like browser based mining",
			"I don't like cryptocurrency",
			"I don't want my device's performance to be affected",
			"I don't want my device's hardware to degrade"
		]
	}
];

---
path: "/metamask-vs-myetherwallet-which-to-choose"
date: "2018-03-01T12:19:41.979Z"
title: "Metamask vs MyEtherWallet - which to choose?"
draft: "false"
tags: ['MyEtherWallet', 'Metamask', 'Ethereum']
feature: "./andrea-natali-447536-unsplash.jpg"
credit: "Photo by Andrea Natali on Unsplash"
---

From Mt. Gox, to more recently Bitgrail - history keeps showing us that cryptocurrency exchanges are not a suitable place to keep your coins. The burning question that crosses the minds of people new to Ethereum (or cryptocurrency in general) is where to store their precious Ether and other ERC-20 tokens? The two most popular solutions at the moment are [Metamask](https://metamask.io/) and [MyEtherWallet](myetherwallet.com). Whilst neither of them are easy enough for your grandma to use (yet), both of these applications are free, have large community backing and are widely used Ethereum wallets. So which one to use?

## MetaMask

Metamask is a browser extension that allows you to create an Ethereum wallet, but actually does more than just token storage. In fact, it allows you to run decentralised applications (dApps) straight from your browser.

With Metamask you can create a _vault_ which is an encrypted file stored on your computer. A vault can have multiple wallets (accounts) associated with it. When you create a new vault you're given a 15 word combination called _seed_, which you can use to restore your vault with all the associated wallets. This is quite handy, since you only have to secure one seed, however losing it adds a risk of losing access to all of your wallets at once if you don't have their private keys backed.

### Ease of use

Creating a new vault and account takes about 10 seconds. The application has a cheerful design, clear navigation and generally is quite intuitive to use.

![Metamask user interface](metamask.png)
*Metamask user interface*

However, sending ERC-20 tokens requires manually adding the contract address, which could be daunting to someone completely new to cryptocurrency. Whether, it's a security precaution or a missing feature I hope to see a more automated way to send tokens in the future.

### Quirkiness

Recovering __all__ of your Ethereum wallets from a Metamask seed can be somewhat confusing. Just have a look at all the stress someone had to go through in this [thread](https://github.com/MetaMask/metamask-extension/issues/2641). However, Metamask has a built-in feature which allows to export the private keys to your wallets, which I definitely recommend for the peace of mind.

Also, when making transactions I found that the automatically pre-set _gas price_ and _gas limit_ is usually lower that the network's average, meaning that your transactions can take longer to confirm. Therefore, always check [ETH Gas Station](https://ethgasstation.info/) to avoid your transactions being stuck and especially when you wish for fast execution of transactions (e.g. during ICO's).

## MyEtherWallet

MyEtherWallet (MEW) is a website that allows to create an Ethereum wallet as well as decrypt existing wallets to send tokens. Being a web page MyEtherWallet has been a frequent target of phishing attacks. However, the team behind MyEtherWallet has shown notable effort to combat this issue and now even provides a small tutorial on potential risks.

A significant advantage MEW has over Metamask is that it's a light web interface that doesn't store your data and can be accessed through your smartphone. Whilst there are apps that are better suited for cryptocurrency storage on mobile devices, recent [vulnerabilities](https://cointelegraph.com/news/major-risk-for-mobile-android-wallet-users) call for a re-evaluation of their trustworthiness. If you're on the move and really need to access your wallet - MyEtherWallet can be used for that.

### Ease of use

Creating a new wallet with MEW also takes under 10 seconds. Once you create a wallet you'll be given your _private key_ and a _keystore_ file. You can use either of them to open your wallet. However, the safest method is to actually use Metamask. Personally I recommend this approach as it'll be much faster and safer than copy-pasting your private key every time you want to unlock your wallet.

One particular thing that I like about MEW is that it provides a list of tokens that you can 'import'. Importing doesn't require you to add a token contract address like in Metamask (unless it's a brand new token that's not yet registered), which is a much more elegant way to send tokens.

![List of available tokens](token-list.png)
*List of available tokens*
![Tokens available](tokens-available.png)
*Once you load a token it'll appear here as a choice*

### Quirkiness

MEW is no saint when it comes to quirks. For instance, when sending tokens often times the recipients address is blank (the data in the transaction is still correct), which can cause a lot of confusion and stress especially when large sums of money are involved.

Also, at times the application randomly spits out incomprehensive yet harmless errors, which I learned to ignore, but again someone who's just starting could be quite confused.

## Summary

Now some of you may ask _"what's the point of using MEW, when you can send Ethereum and tokens via Metamask?"_. That's a good question, but my personal preference is to use both. I found that with MEW it's a bit easier to send ERC-20 tokens, because you can select from a predefined list, whereas in Metamask you have to add every token you wish to send. Since I send lots of different tokens I prefer to just select from a list.

At the same time Metamask's vault and seed mechanism allows for safer and easier wallet management and backup. It also integrates well with MEW and is even specified as the _recommended_ way of access.

Whilst neither of the solutions are ideal, they're free and complement each other well. Bearing in mind that it's still early stage in cryptocurrency adoption I look forward to see these two applications improve.

<p align="center">
  <p align="center">
    <img src="/app/src/assets/icons/icon-128x128.png" height="100" alt="Blockcore Market" />
  </p>
  <h1 align="center">
    Blockcore Market
  </h1>
  <p align="center">
    Peer to peer market app built on Web5
  </p>
</p>

Blockcore Market is an web app for posting offers for goods and services. Users are identified using their decentralized identifiers (Web5).

![](/assets/blockcore-market-screenshot.png)

## Repository Setup

This project is a bit different compared to other Blockcore repositories. The GitHub Workflows will create source-code releases and the Docker images are built from source, not from binary releases that is normal practices for Blockcore reposistories.

## Get Started

To start developing on this repository, open two instances of your terminal app. One should navigate into the `server` folder and another into the `app` folder. Ensure that you run `npm install` on both folders and then you can run `npm start` on both to start both the API server and the UI.

Angular (hot-reload): http://localhost:4200/  
Server (API and UI hosted together): http://localhost:5050/

You also need an instance of MongoDB running on your local machine, preferbly through Docker. You can create a file named `.env` within the `server` folder that contains the connection string to your MongoDB database. The `.env` file should not be committed to source control.

```
MARKET_DATABASE=mongodb://localhost:27017
PORT=5050
```

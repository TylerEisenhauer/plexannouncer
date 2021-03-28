## About The Project

A simple expressjs application to consume webhook events from plex and post alerts for new content to discord

## Getting Started

### Prerequisites

* nodejs

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/TylerEisenhauer/plexannouncer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file at the project root and add your `WEBHOOK_ID` and `WEBHOOK_TOKEN` from discord
   ```
   WEBHOOK_ID=YOUR_WEBHOOK_ID
   WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN
   ```
## Usage

1. Start the project, it will be listening for an event at `http://localhost:3030/hook`
    ```shell
    npm start
    ```
   
2. Add the local ip address of the machine running the project to the plex webhook page.
<p align="center">
  <img src="https://github.com/TylerEisenhauer/plexannouncer/raw/assets/plex-webhook.png" width="800" alt="accessibility text">
</p>

3. Upon adding movies and tv shows/episodes you will now receive alerts via your discord webhook
<p align="center">
  <img src="https://github.com/TylerEisenhauer/plexannouncer/raw/assets/discord-alert.png" width="600" alt="accessibility text">
</p>

## License

Distributed under the MIT License.

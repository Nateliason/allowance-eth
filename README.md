This is my first full Solidity app, built from scratch. 

I drafted the Allowance.sol contract on Remix, tested it there, then built it into this app following the guide at https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13.

Should work fine locally if you want to test it out! 

## To Run the App

Run `npx hardhat node`
Then `npx hardhat run scripts/deploy.js --network localhost`
Paste the contract address in App.js
Run `npm start`

You'll need to add the top address in Hardhat into MetaMask in order to control the contract if there's an owner set
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input, Container, Grid, Menu, Card } from 'semantic-ui-react'
import Allowance from './artifacts/contracts/Allowance.sol/Allowance.json';

const allowanceAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

function App() {
  // Use hooks to set all of the state variables
  const [allowanceTarget, setAllowanceTarget] = useState();
  const [allowanceAmount, setAllowanceAmount] = useState();
  const [owner, setOwner] = useState();
  const [balance, setBalance] = useState();
  const [addressAllowance, setAddressAllowance] = useState();
  const [address, setAddress] = useState();

  // This must just get the accounts, how do you know how to do it though?
  async function requestAccount() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account
  }

  async function getAddress() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, provider);
      const contAddress = await contract.address;
      setAddress(contAddress);
    }
  }

  async function getOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, provider);
      const contOwner = await contract.owner();
      setOwner(contOwner);
    }
  }

  async function depositFunds() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.depositFunds();
      await transaction.wait();
    }
  }

  async function seeBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, provider);
      const contBalance = await contract.seeBalance();
      setBalance(contBalance.toString());
    }
  }

  async function setAllowance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.setAllowance(allowanceTarget, allowanceAmount);
    }
  }

  async function seeAllowance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.allowanceAmount(allowanceTarget);
      setAddressAllowance(transaction.toString());
    }
  }

  async function addAllowance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.addAllowance(allowanceTarget, allowanceAmount);
    }
  }

  async function withdrawAllowance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.withdrawAllowance(allowanceAmount);
    }
  }

  async function withdrawAllFunds() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(allowanceAddress, Allowance.abi, signer);
      const transaction = await contract.withdrawAllFunds();
    }
  }

  getOwner();
  seeBalance();
  getAddress();

  return (
    <div className="App">
      <header className="App-header">
        <Menu></Menu>
        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
                <Grid.Column>
                  <h2>Set the Address and Amounts</h2>
                  <div class="input-box">
                    <Input className="contract-input" onChange={e => setAllowanceAmount(e.target.value)} placeholder="Allowance Amount" />
                  </div>
                  <div class="input-box">
                    <Input className="contract-input" onChange={e => setAllowanceTarget(e.target.value)} placeholder="Target Address" />  
                  </div>

                  <br/>
                  <h2>View Contract Info</h2>
                  <div class="contract-info">
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>{address}</Card.Header>
                        <Card.Meta>The address of the contract</Card.Meta>
                      </Card.Content>
                    </Card>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>{owner}</Card.Header>
                        <Card.Meta>The owner of the contract</Card.Meta>
                      </Card.Content>
                    </Card>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>{balance}</Card.Header>
                        <Card.Meta>The balance of the contract</Card.Meta>
                      </Card.Content>
                    </Card>
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>{addressAllowance}</Card.Header>
                        <Card.Meta>The allowance of the address you're checking</Card.Meta>
                      </Card.Content>
                    </Card>
                  </div>
                  
                </Grid.Column>
                <Grid.Column>
                  <h2>Execute Contract Functions</h2>
                  <div class="button-group">
                    <p class="button-description">Add money to the contract, to allocate to allowances</p>
                    <Button primary onClick={depositFunds}>Deposit Funds</Button>
                  </div>
                  <div class="button-group">
                    <p class="button-description">See the total balance of the contract, including allowances</p>
                    <Button primary onClick={seeBalance}>See Balance</Button>
                  </div>
                  <div class="button-group">
                    <p class="button-description">Set the initial allowance for a contract, or add to their current allowance.</p>
                    <Button primary onClick={setAllowance}>Set Allowance</Button>
                    <Button primary onClick={addAllowance}>Add Allowance</Button>  
                  </div>
                  <div class="button-group">
                    <p class="button-description">See a contract's current allowance amount</p>
                    <Button primary onClick={seeAllowance}>See Allowance</Button>
                  </div>
                  <div class="button-group">
                    <p class="button-description">Take out some of your allowance</p>
                    <Button primary onClick={withdrawAllowance}>Withdraw Allowance</Button>
                  </div>
                  <div class="button-group">
                    <p class="button-description">As the owner, withdraw all funds and set allowances to 0</p>
                    <Button primary onClick={withdrawAllFunds}>Withdraw All Funds</Button>
                  </div>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;
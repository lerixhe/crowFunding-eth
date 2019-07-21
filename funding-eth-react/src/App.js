import React from 'react';
import web3 from './utils/InitWeb3'
import contracts from './eth/contracts'
import TabCenter from './components/TabCenter';
import { getCreatorFundingArray } from './eth/interaction'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentAccount: ""
    }
  }
  async componentDidMount() {
    try {
      let accounts = await web3.eth.getAccounts();
      this.setState({ currentAccount: accounts[0] })
      let fundingArray = await contracts.fundingFactoryContract.methods.getAllFungdings().call()
      console.log(fundingArray)
      let creatorFundingArray = await getCreatorFundingArray();
      this.setState({ creatorFundingArray })
      console.log(creatorFundingArray)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div>
        您当前的地址为：{this.state.currentAccount}
        <TabCenter />
      </div>
    );
  }
}

export default App;

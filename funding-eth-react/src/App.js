import React from 'react';
import web3 from './utils/InitWeb3'
import contract from './eth/contracts'

class App extends React.Component{ 
  constructor(){
    super()
    this.state={
      currentAccount :""
    }
  }
  async componentDidMount(){
    let accounts = await web3.eth.getAccounts();
    this.setState({currentAccount:accounts[0]})
    let fundingArray = await contract.methods.getAllFungdings().call()
    console.log(fundingArray)
  }
  render() {
    return (
      <div>
        您当前的地址为：{this.state.currentAccount}
      </div>
    );
  }
}

export default App;

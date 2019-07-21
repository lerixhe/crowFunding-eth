import React from 'react';
import web3 from './utils/InitWeb3'
import TabCenter from './components/TabCenter';
import {Icon ,Header} from 'semantic-ui-react'

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
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>区块链人人众筹</Header.Content>
          您当前的地址为：{this.state.currentAccount}
        </Header>
            
        <TabCenter />
      </div>
    );
  }
}

export default App;

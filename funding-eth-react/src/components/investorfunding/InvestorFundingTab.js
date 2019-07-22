import React from 'react'
import CardList from '../common/CardList'
import {getFundingArrayBy} from '../../eth/interaction'

class InvestorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            investorFundingArray: [],
        }
    }
    async componentDidMount() {
        try {
            let investorFundingArray = await getFundingArrayBy(3);
            this.setState({ investorFundingArray, })
            console.table(investorFundingArray)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <CardList details={this.state.investorFundingArray} />
            </div>
        )
    }
}
export default InvestorFundingTab;
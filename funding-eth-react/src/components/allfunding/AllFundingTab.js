import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy } from '../../eth/interaction'

class AllFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            creatorFundingArray: [],
        }
    }
    async componentDidMount() {
        try {
            let creatorFundingArray = await getFundingArrayBy(1);
            this.setState({ creatorFundingArray, })
            console.table(creatorFundingArray)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <CardList details={this.state.creatorFundingArray} />
                <h2>参与众筹</h2>
                <div>
                    
                </div>     
            </div>
        )
    }
}
export default AllFundingTab;
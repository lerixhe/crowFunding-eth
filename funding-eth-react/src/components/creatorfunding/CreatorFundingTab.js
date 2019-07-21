import React from 'react'
import CardList from '../common/CardList'
import { getCreatorFundingArray } from '../../eth/interaction'

class CreatorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            creatorFundingArray: [],
        }
    }
    async componentDidMount() {
        try {
            let creatorFundingArray = await getCreatorFundingArray();
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
            </div>
        )
    }
}
export default CreatorFundingTab;
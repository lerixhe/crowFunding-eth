import React from 'react'
import CardList from '../common/CardList'
import { getCreatorFundingArray } from '../../eth/interaction'
import CreatorFundingForm from './CreatorFundingForm'

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
                <h2>发起众筹</h2>
                <div>
                    <CreatorFundingForm />
                </div>     
            </div>
        )
    }
}
export default CreatorFundingTab;
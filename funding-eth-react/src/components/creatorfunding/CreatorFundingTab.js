import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy } from '../../eth/interaction'
import CreatorFundingForm from './CreatorFundingForm'
import CreatorRequestForm from './CreatorRequestForm'

class CreatorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            creatorFundingArray: [],
        }
    }
    async componentDidMount() {
        try {
            let creatorFundingArray = await getFundingArrayBy(2);
            this.setState({ creatorFundingArray, })
            console.table(creatorFundingArray)
        } catch (error) {
            console.log(error)
        }
    }
    // 为本页面的卡片创建点击事件
    onItemClick = (detail)=>{
        console.log(`seclected fundnig`)
        console.table(detail)
        this.setState({selectedFunding:detail})
    }
    render() {
        return (
            <div>
                <CardList details={this.state.creatorFundingArray} onItemClick={this.onItemClick}/>
                <h2>发起众筹</h2>
                <div>
                    <CreatorFundingForm />
                </div>
                <h2>申请支出</h2>
                <div>
                    <CreatorRequestForm selectedFunding={this.state.selectedFunding}/>
                </div>       
            </div>
        )
    }
}
export default CreatorFundingTab;
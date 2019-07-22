import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy } from '../../eth/interaction'
import AllFundingForm from './AllFundingForm';

class AllFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            creatorFundingArray: [],
        }
    }
    async componentDidMount() {
        // 根据选项获取众筹类型
        try {
            let creatorFundingArray = await getFundingArrayBy(1);
            this.setState({ creatorFundingArray, })
            console.table(creatorFundingArray)
        } catch (error) {
            console.log(error)
        }
    }
    // 自定义点击事件：获取所点击的卡片detail，存入state
    onItemClick = (detail)=>{
        console.log(`seclected fundnig`)
        console.table(detail)
        this.setState({selectedFunding:detail})
    }
    render() {
        
        return (
            <div>
                <CardList details={this.state.creatorFundingArray} onItemClick={this.onItemClick} />
                <h2>参与众筹</h2>
                <div>
                    <AllFundingForm selectedFunding={this.state.selectedFunding}/>
                </div>     
            </div>
        )
    }
}
export default AllFundingTab;
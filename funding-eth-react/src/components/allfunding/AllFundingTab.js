import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy } from '../../eth/interaction'
import AllFundingForm from './AllFundingForm';

class AllFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            allFundingArray: [],
        }
    }
    async componentDidMount() {
        // 根据选项获取众筹类型
        try {
            let allFundingArray = await getFundingArrayBy(1);
            this.setState({ allFundingArray, })
            console.table(allFundingArray)
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
        const {selectedFunding} = this.state
        
        return (
            <div>
                <CardList details={this.state.allFundingArray} onItemClick={this.onItemClick} />
                {   
                    selectedFunding&&(
                    <div>
                        <h2>参与众筹</h2>
                        <AllFundingForm selectedFunding={selectedFunding}/>
                    </div>)
                }
            </div>
        )
    }
}
export default AllFundingTab;
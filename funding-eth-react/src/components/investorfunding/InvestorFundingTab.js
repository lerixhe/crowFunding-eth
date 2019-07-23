import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy, showRequests ,approveRequest } from '../../eth/interaction'
import RequestList from '../common/RequestList'
import { Button } from 'semantic-ui-react';
class InvestorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            investorFundingArray: [],
            requestDetailsContainer:[]
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
    // 自定义点击事件：获取所点击的卡片detail，存入state
    onItemClick = (detail) => {
        console.log(`seclected fundnig`)
        console.table(detail)
        this.setState({ selectedFunding: detail })
    }
    // 获取请求详情按钮动作
    onRequestDetailClick = async () => {
        try {
            let requestDetailsContainer = await showRequests(this.state.selectedFunding.funding)
            this.setState({requestDetailsContainer})
            console.table(requestDetailsContainer)
        } catch (error) {
            console.log(error)
        }
    }
    //批准按钮动作
    onApproveClick = async(index)=>{
        try {
            await approveRequest(this.state.selectedFunding.funding,index,(error)=>{
                if(error!==false){
                    alert(`投票失败`)
                }else{
                    alert('投票成功')
                    window.location.reload(true)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const{selectedFunding} = this.state
        return (
            <div>
                <CardList details={this.state.investorFundingArray} onItemClick={this.onItemClick} />
                {selectedFunding&&(
                    <div>
                        <Button onClick={this.onRequestDetailClick}>申请详情</Button>
                        <RequestList requestDetails={this.state.requestDetailsContainer} 
                                    investorCount={this.state.selectedFunding.investorsCount} 
                                    onApproveClick={this.onApproveClick}
                                    pageKey={3}/>
                    </div> 
                )}
            </div>
        )
    }
}
export default InvestorFundingTab;
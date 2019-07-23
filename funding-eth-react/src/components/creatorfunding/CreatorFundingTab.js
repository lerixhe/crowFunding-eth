import React from 'react'
import CardList from '../common/CardList'
import { getFundingArrayBy ,showRequests,finalizeRequest } from '../../eth/interaction'
import CreatorFundingForm from './CreatorFundingForm'
import CreatorRequestForm from './CreatorRequestForm'
import RequestList from '../common/RequestList'
import { Button } from 'semantic-ui-react';

class CreatorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            creatorFundingArray: [],
            requestDetailsContainer:[],
        }
    }
    async componentDidMount() {
        // tab组件加载时，获取所有的众筹
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
    // 获取所有申请详情
    onRequestDetailsClick = async ()=>{
        try {
            let requestDetailsContainer = await showRequests(this.state.selectedFunding.funding)   
            this.setState({requestDetailsContainer})  
        } catch (error) {
            console.log(error)
        }
    }
    //解冻支付动作
    onFinalizeClick = async(index)=>{
        try {
            let result = await finalizeRequest(this.state.selectedFunding.funding,index,(error)=>{
                if (error!==false) {
                    alert(`解冻失败：${error}`)
                } else {
                    alert(`解冻成功`)
                }
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <CardList details={this.state.creatorFundingArray} onItemClick={this.onItemClick}/>
                <h2>发起新众筹</h2>
                <div>
                    <CreatorFundingForm />
                </div>
                {this.state.selectedFunding&&(
                    <div>
                        <h2>申请支出</h2>
                        <CreatorRequestForm selectedFunding={this.state.selectedFunding}/>
                    </div> 
                )}
                {this.state.selectedFunding&&(
                    <div>
                        <Button onClick={this.onRequestDetailsClick}>申请详情</Button>
                        <RequestList 
                            requestDetails={this.state.requestDetailsContainer} 
                            investorCount={this.state.selectedFunding.investorsCount} 
                            onFinalizeClick={this.onFinalizeClick}
                            pageKey={2}/>
                    </div> 
                )}
     
            </div>
        )
    }
}
export default CreatorFundingTab;
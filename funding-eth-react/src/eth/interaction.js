// 封装所有与合约相关的操作
import web3 from '../utils/InitWeb3'
import contracts from './contracts'
import todate from '../utils/toDate'
// const util = require('util')
// 经过认真思考，根本就不用封装成promis，因为他本身就是几个promise合在一起。
// const getCreatorFundingArray = () => {
//     return new Promise(async (resolve, rejecct) => {
//         try {
//             let accounts = await web3.eth.getAccounts();
//             let fundingArray = await contracts.fundingFactoryContract.methods.getMyFungdings().call({
//                 from: accounts[0],
//             });
//             resolve(fundingArray)
//         } catch (error) {
//             rejecct(error)
//         }
//     })
// }
// const getCreatorFundingArray = util.promisify(contracts.fundingFactoryContract.methods.getMyFungdings().call)
// 获取当前用户创建的所有众筹合约
const getCreatorFundingArray = async () => {
    try {
        let accounts = await web3.eth.getAccounts();
        // 如果调用的合约方法中明确使用了msg.sender，那么必须传入from
        let fundingArray = await contracts.fundingFactoryContract.methods.getMyFungdings().call({
            from: accounts[0],
        });
        // 已获得到众筹合约地址的集合，遍历获取其详情。按照索引循环效率较低，这里使用map()
        let details = fundingArray.map(funding => {
            return getFundingDetail(funding)
        })
        details = await Promise.all(details)
        return (details)
    } catch (error) {
        console.log(error)
    }
}
// 获取某个众筹合约详情
const getFundingDetail = async (funding)=>{
    try {
        // 获取子合约实例,注意传递过来的是函数名，需要加（）执行
        let currentFundingContract =  contracts.getCrowFundingContracrt()
        // 合约对象还没又跟合约地址关联上，建立关联。
        currentFundingContract.options.address = funding;
        // 将合约内的可获取的全部状态变量都获取到
        let creator = await currentFundingContract.methods.creator().call()
        let projectName = await currentFundingContract.methods.projectName().call()
        let supportBalance = await currentFundingContract.methods.supportBalance().call()
        supportBalance = web3.utils.fromWei(supportBalance.toString(),'ether')
        let targetBalance = await currentFundingContract.methods.targetBalance().call()
        targetBalance = web3.utils.fromWei(targetBalance.toString(),'ether')
        let endTime = await currentFundingContract.methods.endTime().call()
        endTime = todate(endTime)
        let currentBalance = await currentFundingContract.methods.getCurrentBalance().call()
        currentBalance = web3.utils.fromWei(currentBalance.toString(),'ether')
        let investors = await currentFundingContract.methods.getAllInvestors().call()
        let investorsCount = investors.length
        return({funding,creator,projectName,supportBalance,targetBalance,endTime,currentBalance,investorsCount})
    } catch (error) {
        console.log(error)
    }
}


export {
    getCreatorFundingArray,
    getFundingDetail
}
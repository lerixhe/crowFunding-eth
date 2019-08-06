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
const getFundingArrayBy = async (tabkey) => {
    try {
        let accounts = await web3.eth.getAccounts();
        // 如果调用的合约方法中明确使用了msg.sender，那么必须传入from
        let fundingArray = []
        if (tabkey === 1) {
            fundingArray = await contracts.fundingFactoryContract.methods.getAllFungdings().call({
                from: accounts[0],
            });
        } else if (tabkey === 2) {
            fundingArray = await contracts.fundingFactoryContract.methods.getMyFungdings().call({
                from: accounts[0],
            });
        } else if (tabkey === 3) {
            fundingArray = await contracts.fundingFactoryContract.methods.getJoinedFungdings().call({
                from: accounts[0],
            })
        }
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
const getFundingDetail = async (funding) => {
    try {
        // 获取子合约实例,注意传递过来的是函数名，需要加（）执行
        let currentFundingContract = contracts.getCrowFundingContracrt()
        // 合约对象还没又跟合约地址关联上，建立关联。
        currentFundingContract.options.address = funding;
        // 将合约内的可获取的全部状态变量都获取到
        let creator = await currentFundingContract.methods.creator().call()
        let projectName = await currentFundingContract.methods.projectName().call()
        let supportBalance = await currentFundingContract.methods.supportBalance().call()
        supportBalance = web3.utils.fromWei(supportBalance.toString(), 'ether')
        let targetBalance = await currentFundingContract.methods.targetBalance().call()
        targetBalance = web3.utils.fromWei(targetBalance.toString(), 'ether')
        let endTime = await currentFundingContract.methods.endTime().call()
        endTime = todate(endTime)
        let currentBalance = await currentFundingContract.methods.getCurrentBalance().call()
        currentBalance = web3.utils.fromWei(currentBalance.toString(), 'ether')
        let investors = await currentFundingContract.methods.getAllInvestors().call()
        let investorsCount = investors.length
        return ({ funding, creator, projectName, supportBalance, targetBalance, endTime, currentBalance, investorsCount })
    } catch (error) {
        console.log(error)
    }
}
// 创建众筹合约
const createFunding = async (projectName, supportBalance, targetBalance, duration, callback) => {
    // 转换单位：
    supportBalance = parseInt(parseFloat(supportBalance) * 10 ** 18).toString()
    targetBalance = parseInt(parseFloat(targetBalance) * 10 ** 18).toString()
    try {
        let accounts = await web3.eth.getAccounts()
        let result = await contracts.fundingFactoryContract.methods.createFunding(projectName, supportBalance, targetBalance, duration).send({
            from: accounts[0]
        }, callback)
        return result
    } catch (error) {
        console.log(error)
    }
}
//参与某个众筹
const investFunding = async (funding, supportBalance, callback) => {
    //转换单位
    supportBalance = parseInt(parseFloat(supportBalance) * 10 ** 18).toString()
    try {
        let accounts = await web3.eth.getAccounts()
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = funding
        // 开始调用合约方法：参与
        await fundingContract.methods.invest().send({
            from: accounts[0],
            value: supportBalance
        }, callback)

    } catch (error) {
        console.log(error)
    }
}
//创建1个花费请求
const createRequet = async (funding, purpose, cost, shopAddress, callback) => {
    try {
        // ether to wei
        cost = parseInt(parseFloat(cost) * 10 ** 18).toString()

        let accounts = await web3.eth.getAccounts()
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = funding
        // 开始调用合约方法：参与
        await fundingContract.methods.createRequest(purpose, cost, shopAddress).send({
            from: accounts[0],
        }, callback)

    } catch (error) {
        console.log(error)
    }
}
// 1.按照索引查询某个花费请求
const getRequestByIndex = async (index, funding, callback) => {
    try {
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = funding
        // 开始调用合约方法：参与
        await fundingContract.methods.Requests(index).call(callback)
    } catch (error) {
        console.log(error)
    }
}
// 2.获得某合约的所有请求数
const getRequestsCount = async (funding, callback) => {
    try {
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = funding
        // 开始调用合约方法：参与
        await fundingContract.methods.getRequestsCount().call(callback)
    } catch (error) {
        console.log(error)
    }
}
// 综合以上两个方法，实现：获取所有请求
const showRequests = async (funding) => {
    try {
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = funding
        // 开始调用合约方法：
        let accounts = await web3.eth.getAccounts()
        let requestCount = await fundingContract.methods.getRequestCount().call({
            from: accounts[0]
        })
        let requestDetails = []
        for (let i = 0; i < requestCount; i++) {
            let requestDetail = await fundingContract.methods.requests(i).call({
                from: accounts[0]
            })
            console.table(requestDetail)
            requestDetails.push(requestDetail)
        }
        console.table(requestDetails)
        return requestDetails
    } catch (error) {
        console.log(error)
    }
}
// 批准某个请求
const approveRequest = async (address, index, callback) => {
    try {
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = address
        // 开始调用合约方法：
        let accounts = await web3.eth.getAccounts()
        let result = await fundingContract.methods.approveRequest(index).send({
            from: accounts[0]
        }, callback)
        return result
    } catch (error) {
        console.log(error)
    }
}
// 解冻并支付
const finalizeRequest = async (address, index, callback) => {
    try {
        // 先获取特定合约的实例
        let fundingContract = contracts.getCrowFundingContracrt()
        // 绑定合约实例到地址，完成实例获取
        fundingContract.options.address = address
        // 开始调用合约方法：
        let accounts = await web3.eth.getAccounts()
        let result = await fundingContract.methods.finalizeRequest(index).send({
            from: accounts[0]
        }, callback)
        return result
    } catch (error) {
        console.log(error)
    }
}
export {
    getFundingArrayBy,
    getFundingDetail,
    createFunding,
    investFunding,
    createRequet,
    getRequestByIndex,
    getRequestsCount,
    showRequests,
    approveRequest,
    finalizeRequest
}
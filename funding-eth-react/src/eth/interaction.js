// 封装所有与合约相关的操作
import web3 from '../utils/InitWeb3'
import contracts from './contracts'
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
const getCreatorFundingArray = async () => {
    try {
        let accounts = await web3.eth.getAccounts();
        let fundingArray = await contracts.fundingFactoryContract.methods.getMyFungdings().call({
            from: accounts[0],
        });
        return (fundingArray)
    } catch (error) {
        console.log(error)
    }
}
export {
    getCreatorFundingArray,
}
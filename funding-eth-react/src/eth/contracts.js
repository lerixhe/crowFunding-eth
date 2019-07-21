import web3 from "../utils/InitWeb3";
// 本地ganache
const contractAddress = '0xe34a243e77fd44e397c4354171d0161432b63087'
// ropsten
// const contractAddress = '0x394f73e0c50e00c68be0f0d4058f8fc208aed320'
const abi = [ { "constant": false, "inputs": [ { "name": "_projectName", "type": "string" }, { "name": "_supportBalance", "type": "uint256" }, { "name": "_targetBalance", "type": "uint256" }, { "name": "_durationInSeconds", "type": "uint256" } ], "name": "createFunding", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "allCrowFundings", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "creatorFundingMap", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAllFungdings", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getJoinedFungdings", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMyFungdings", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "platformProvider", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
let fundingFactoryContract = new web3.eth.Contract(abi, contractAddress)
let contracts = {
    fundingFactoryContract,
}
export default contracts

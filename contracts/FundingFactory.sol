pragma solidity ^0.5.10;

// 导入单个合约
import './basicFunding.sol';
// 合约工厂：
// 1. 任何人都可以使用本合约发起一个众筹合约
// 2. 所有合约都在合约工厂中维护
// 3. 对外仅暴露此合约工厂
contract FundingFactory{
    CrowFunding[] public crowFundingArry;//平台内所有众筹合约地址集合
    mapping(address => CrowFunding[]) public creatorFundingMap;//某账户发起的所有众筹合约地址集合
    address public platformProvider;//合约平台的创建者

    // 构造函数，初始化平台构建者
    constructor()public{
        platformProvider = msg.sender;
    }
    // 项目方在平台创建合约
    function createFunding(string memory _projectName,uint _supportBalance,uint _targetBalance,uint _durationInSeconds)public{
        // 创建合约对象
        CrowFunding fundingContract = new CrowFunding(_projectName,_supportBalance,_targetBalance,_durationInSeconds,msg.sender);
        //添加到合约集合中
        crowFundingArry.push(fundingContract);
        // 添加到此该用户创建的合约集合中
        creatorFundingMap[msg.sender].push(fundingContract);

    }
}

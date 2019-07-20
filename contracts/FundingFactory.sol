pragma solidity ^0.5.10;

//"攒电脑","100","300","5555555"
//"买CPU","30","0x83ea36a764f46963a2bb024c43889a82a926a041"
//"买显示器","200","0x83ea36b764f46963a2bb024c43889a82a926a041"
//"买主板","20","0x83ea36b764f46963a2bb024c43889a82a926a041"

//"手游比赛","100","300","5555555"
//"买手机","30","0x83ea36b764f46963a2bb024c43889a82a926a041"
//"买道具","30","0x83ea36b764f46963a2bb024c44889a82a926a041"


// 导入单个合约
import './basicFunding.sol';
import './InvestorToFunding.sol';
// 合约工厂：
// 1. 任何人都可以使用本合约发起一个众筹合约
// 2. 所有合约都在合约工厂中维护
// 3. 对外仅暴露此合约工厂
contract FundingFactory{
    // 全局对象
    InvestorToFunding i2f;
    // 状态变量
    CrowFunding[] public allCrowFundings;//平台内所有众筹合约地址集合
    mapping(address => CrowFunding[]) public creatorFundingMap;//某账户发起的所有众筹合约地址集合
    address public platformProvider;//合约平台的创建者

    // 构造函数，初始化平台构建者
    constructor()public{
        platformProvider = msg.sender;
        // 实例化全局对象
        i2f = new InvestorToFunding();
    }
    // 项目方在平台创建合约
    function createFunding(string memory _projectName,uint _supportBalance,uint _targetBalance,uint _durationInSeconds)public{
        // 创建合约对象
        CrowFunding fundingContract = new CrowFunding(_projectName,_supportBalance,_targetBalance,_durationInSeconds,msg.sender,i2f);
        //添加到合约集合中
        allCrowFundings.push(fundingContract);
        // 添加到此该用户创建的合约集合中
        creatorFundingMap[msg.sender].push(fundingContract);

    }
    // 返回平台所有合约，自动生成的getter需要索引参数，不能返回数组。
    function getAllFungdings()public view returns(CrowFunding[] memory){
        return allCrowFundings;
    }
    // 返回当前用户所创建的所有合约
    function getMyFungdings()public view returns(CrowFunding[] memory){
        return creatorFundingMap[msg.sender];
    }
    // 返回当前用户所参加的所有合约
    function getJoinedFungdings() public view returns(CrowFunding[] memory){
        return i2f.getFundingsBy(msg.sender);
    }
}

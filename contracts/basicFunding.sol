pragma solidity ^0.5.10;

contract CrowFunding{
    address public creator;//项目发起者
    string public projectName;//项目名称
    uint  public  supportBalance;//支持金额
    uint public targetBalance;//目标金额
    uint public endTime;//截止日期

    constructor(string memory _projectName,uint _supportBalance,uint _targetBalance,uint _durationInSeconds)public{
        creator = msg.sender;
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        endTime = now+_durationInSeconds;//按秒
    }
}
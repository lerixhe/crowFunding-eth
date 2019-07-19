pragma solidity ^0.5.10;

contract CrowFunding{
    address public creator;//项目发起者
    string public projectName;//项目名称
    uint  public  supportBalance;//支持金额
    uint public targetBalance;//目标金额
    uint public endTime;//截止日期
    address[] public investors;//投资人s
    mapping(address=>bool) public investExistMap;//存储该用户是否投资过本项目，最快速的方式。默认false代表没有投资过本霞荧幕
  
    constructor(string memory _projectName,uint _supportBalance,uint _targetBalance,uint _durationInSeconds)public{
        creator = msg.sender;
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        endTime = now + _durationInSeconds;//按秒
    }
    // 投资
    function invest()public payable{
        require(investExistMap[msg.sender]==false, "已经参与过了");
        require(msg.value==supportBalance, "只能投资固定金额");
        investors.push(msg.sender);
        investExistMap[msg.sender] = true;
    }
}
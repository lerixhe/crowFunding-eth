pragma solidity ^0.5.10;

contract CrowFunding{
    address payable public creator;//项目发起者
    string public projectName;//项目名称
    uint  public  supportBalance;//支持金额
    uint public targetBalance;//目标金额
    uint public endTime;//截止日期
    address payable[] public investors;//投资人s
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
    // 众筹失败退款
    function drawBack()public{
        for(uint i = 0;i < investors.length;i++){
            investors[i].transfer(supportBalance);
            // 众筹失败，本合约就被废弃，无需处理investors和investorExitMap
        }
    }
    // 查看合约当前余额
    function getCurrentBalance() public view returns(uint){
        return address(this).balance;
    }
    // 查看所有的投资人
    function getInvestors() public view returns(address payable[] memory){
        return investors;
    }
    // 申请批准
    struct Request {
        string purpose;//用途介绍
        uint cost;//所需花费
        address shopAddress; //向谁购买
        uint voteCount;//赞成票数
        mapping(address => bool) investorVotedMap;//记录是否已经投过票
        RequestStatus status;//申请状态
    }
    enum RequestStatus {
        Voting,//投票中
        Approved,//已批准
        Completed//已完成
    }
    // 存储多个申请
    Request[] public requests;
    function createRequest(string  memory _purpose,uint _cost,address _shopAddress) public {
        Request memory request = Request({
            purpose : _purpose,
            cost : _cost,
            shopAddress : _shopAddress,
            voteCount : 0,
            status : RequestStatus.Voting
        });
        requests.push(request);
    }
}
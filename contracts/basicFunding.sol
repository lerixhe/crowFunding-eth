pragma solidity ^0.5.10;

//"买电脑","100","300","5555555"
//"买CPU","30","0x83ea36a764f46963a2bb024c43889a82a926a041"


contract CrowFunding{
    address payable public creator;//项目发起者
    string public projectName;//项目名称
    uint  public  supportBalance;//支持金额
    uint public targetBalance;//目标金额
    uint public endTime;//截止日期
    address payable[] public investors;//投资人s
    mapping(address=>bool) public investorExitMap;//存储该用户是否投资过本项目，最快速的方式。默认false代表没有投资过本霞荧幕
    // 申请结构体
    struct Request {
        string purpose;//用途介绍
        uint cost;//所需花费
        address payable shopAddress; //向谁购买
        uint voteCount;//赞成票数
        mapping(address => bool) investorVotedMap;//记录是否已经投过票
        RequestStatus status;//申请状态
    }
    // 申请状态
    enum RequestStatus {
        Voting,//投票中
        Approved,//已批准
        Completed//已完成
    }
    // 存储多个申请
    Request[] public requests;
    // 修饰器，仅能被众筹发起者执行的函数
    modifier  onlyCreator(){
        require(msg.sender == creator, "您不是众筹发起人，无权执行该操作");
        _;
    }
    // 修饰器，仅能被众筹投资者执行的函数
    modifier  onlyInvestor(){
        require(investorExitMap[msg.sender], "您未参与该众筹，无权执行该操作");        _;
    }
    // 构造函数初始化该众筹项目
    constructor(string memory _projectName,uint _supportBalance,uint _targetBalance,uint _durationInSeconds,address payable _creator)public{
        creator = _creator;
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        endTime = now + _durationInSeconds;//按秒
    }
    // 投资
    function invest()public payable{
        require(investorExitMap[msg.sender]==false, "已经参与过了");
        require(msg.value==supportBalance, "只能投资固定金额");
        investors.push(msg.sender);
        investorExitMap[msg.sender] = true;
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
    // 查看投资人数
    function getInvestorsCount() public view returns(uint){
        return investors.length;
    }
    // 创建1个花费申请
    function createRequest(string  memory _purpose,uint _cost,address payable _shopAddress) public onlyCreator {
        Request memory request = Request({
            purpose : _purpose,
            cost : _cost,
            shopAddress : _shopAddress,
            voteCount : 0,
            status : RequestStatus.Voting
        });
        requests.push(request);
    }
    // 批准1个花费申请
    function approveRequest(uint index)public onlyInvestor{        // 投资人才有权批准
        // 根据传递的申请索引，获取该申请（引用传递）,注意不要越界
        require(requests.length < index, "找不到对应的申请");
        Request storage request = requests[index];
        // 确认之前没投过票，只能投1次
        require(!request.investorVotedMap[msg.sender], "您已投过票了");
        require(request.status == RequestStatus.Voting, "该申请已过期或未开始");
        // 投票
        request.voteCount++;
        request.investorVotedMap[msg.sender] = true;
    }
    // 完成花费请求
    function finalizeRequest(uint index)public onlyCreator payable {
        // 根据传递的申请索引，获取该申请（引用传递）,注意不要越界
        require(requests.length < index, "找不到对应的申请");
        Request storage request = requests[index];
        //申请合法判定：钱要够，要被半数批准过，
        require(address(this).balance >= request.cost, "花费申请超支，被驳回");
        require(request.voteCount*2 > investors.length, "投票赞成人数不足");
        //转账
        request.shopAddress.transfer(request.cost);
        // 更新申请状态为已完成
        request.status = RequestStatus.Completed;
    }
}
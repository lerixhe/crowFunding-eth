pragma solidity ^0.5.10;

import './basicFunding.sol';
contract InvestorToFunding{
    // 所有人参与的所有合约集合
    mapping (address=>CrowFunding[]) investorToFundingMap;
    // 某个人参与某个众筹
    function joinFunding(address investor,CrowFunding funding)public{
        investorToFundingMap[investor].push(funding);
    }
    // 返回指定人所参与的所有合约集合
    function getFundingsBy(address investor)public view returns(CrowFunding[] memory){
        return investorToFundingMap[investor];
    }

}
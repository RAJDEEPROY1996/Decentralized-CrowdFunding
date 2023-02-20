// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./Ownable.sol";

import "./PriceConverter.sol";

interface IERC20 {        
    function transfer(address to, uint256 amount) external returns (bool);   
    function transferFrom(address from,address to,uint256 amount) external returns (bool);
}

contract crowdfunding is Ownable,PriceConsumerV3{

    struct fundDetails{
        address wallet; 
        uint amount;
    }
    fundDetails[] detail;

    // 1 BUSD equivalent needs to be send
    
    function sendFund() public payable{
        uint amount = uint(getLatestPrice());
        require(msg.value > amount,"Less amount send");
        uint back = msg.value - amount;
        if( back > 0){
            payable(msg.sender).transfer(back);
        }        
        detail.push(fundDetails(msg.sender,msg.value));
    }

    function withdraw() public onlyOwner{
        payable(owner()).transfer(address(this).balance); 
        delete detail;
    }
    fallback() external payable{
        sendFund();
    } 

    receive() external payable{
        detail.push(fundDetails(msg.sender,msg.value));
    }

    function listOfDonors() public view returns(fundDetails[] memory){
        return detail;
    }
    
}


// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

// Now we can import the SafeMath functiosn from Zeppelin to make sure we don't accidentally wrap around in our functions
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Would need to change to Ether from Wei

contract Allowance {
    using SafeMath for uint256;

    mapping(address => uint256) public allowanceAmount;
    address[] public allowancees;
    address payable public owner;
    uint256 public allowanceTotals;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "You're not the owner of this contract");
        _;
    }

    function depositFunds() public payable ownerOnly {}

    function seeBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setAllowance(address _address, uint256 _amount) public ownerOnly {
        require(
            _amount <= seeBalance() - allowanceTotals,
            "There's not enough balance"
        );
        require(
            allowanceAmount[_address] == 0,
            "They already have an allowance, try adding instead"
        );
        allowancees.push(_address);
        allowanceTotals = allowanceTotals.add(_amount);
        allowanceAmount[_address] = _amount;
    }

    function addAllowance(address _address, uint256 _amount) public ownerOnly {
        require(
            _amount <= seeBalance() - allowanceTotals,
            "There's not enough balance"
        );
        allowanceTotals = allowanceTotals.add(_amount);
        allowanceAmount[_address] += _amount;
    }

    function withdrawAllowance(uint256 _amount) public {
        require(
            _amount <= allowanceAmount[msg.sender],
            "You can't withdraw that much"
        );
        address payable payee = payable(msg.sender);
        allowanceTotals = allowanceTotals.sub(_amount);
        allowanceAmount[payee] = allowanceAmount[payee].sub(_amount);
        payee.transfer(_amount);
    }

    function withdrawAllFunds() public ownerOnly {
        owner.transfer(address(this).balance);
        for (uint256 i = 0; i < allowancees.length; i++) {
            allowanceAmount[allowancees[i]] = 0;
        }
        delete allowanceTotals;
        delete allowancees;
    }

    receive() external payable {
        depositFunds();
    }
}

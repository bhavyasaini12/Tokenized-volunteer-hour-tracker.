// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VolunteerHourTracker {
    address public owner;
    mapping(address => uint256) public volunteerHours;

    event HoursLogged(address indexed volunteer, uint256 Hours);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can log hours");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function 1: Log volunteer hours (only owner can call)
    function logHours(address _volunteer, uint256 _hours) public onlyOwner {
        require(_volunteer != address(0), "Invalid address");
        require(_hours > 0, "Hours must be greater than zero");

        volunteerHours[_volunteer] += _hours;
        emit HoursLogged(_volunteer, _hours);
    }

    // Function 2: View logged hours
    function getHours(address _volunteer) public view returns (uint256) {
        return volunteerHours[_volunteer];
    }
}


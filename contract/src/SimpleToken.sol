// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./EIP2612.sol";

contract SimpleToken is ERC20, EIP2612 {
    constructor(string memory name, string memory version, string memory symbol) ERC20(name, symbol) {
        DOMAIN_SEPARATOR = EIP712.makeDomainSeparator(name, version);
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply of 1,000,000 tokens
    }

    function _approveWithPermit(
        address sender,
        address recipient,
        uint256 amount
    ) internal override(IERC20Approve) {
        super._approve(sender, recipient, amount);
    }
}

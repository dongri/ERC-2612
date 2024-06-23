// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

abstract contract IERC20Approve {
    function _approveWithPermit(
        address owner,
        address sender,
        uint256 value
    ) internal virtual;
}

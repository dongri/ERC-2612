# EIP-2612 Sample Implementation

## EIP-2612
https://eips.ethereum.org/EIPS/eip-2612

## Implementation
* contract: SimpleToken
* front: Sign with `eth_signTypedData_v4`
* relayer: Gas Relay

## Addresses
* deployer: 0xD1DDB6BEb883C052787273e83929087d608eC649
* relayer: 0xD3D7888F67C56B0F9a5f67D8b5D5eddC45993916
* alice: 0xD4D393F40c2a0d80061296660b593D591F6E4763
* bob: 0xD5Dc16f9A85d26582c3Ed172761c5b46F1346947

## Scenario
1. Deploy SimpleToken
2. Transfer 100 tokens to Alice from Deployer
3. Start front docker
4. Start relayer docker
5. Use alice's wallet to sign the transaction
6. Confirm the transaction

## Tx Log
* Permit
  https://sepolia.etherscan.io/tx/0x0ac2d36ae1a9bbe93c3537199f6581ab9f26416f2e31ba5141a6654edf3c0547
* transferFrom
  https://sepolia.etherscan.io/tx/0x42d95d9ceff2db5fb8a357b870f91a9da2b61a4f9bcf91700c47d8187b8250f5

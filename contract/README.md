## Install & Deploy
```
$ forge install OpenZeppelin/openzeppelin-contracts --no-commit --quiet

$ forge build

$ make deploy

##### sepolia
✅  [Success]Hash: 0xe7e295dd95c54e936aa8303fd6798b503d9be30a390d10fdb26367aa8d0c42d7
Contract Address: 0xd7F6211566E663Ef226228bEe940Eb7950CC6436
Block: 6167566
Paid: 0.001196863136605182 ETH (797331 gas * 1.501086922 gwei)
```

## Get ABI
```
$ forge inspect SimpleToken abi | jq -c
[{"type":"constructor","inputs":[{"name":"name","type":"string","internalType":"string"}]....}]
```

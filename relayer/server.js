const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Web3 = require('web3');
const app = express();

require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());

const RPC_URL = process.env.SEPOLIA_RPC_URL;
const RELAYER_PRIV_KEY = process.env.RELAYER_PRIV_KEY;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
const TOKEN_ABI = process.env.TOKEN_ABI;
const BOB_ADDRESS = process.env.BOB_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

const contractABI = JSON.parse(TOKEN_ABI);
const contractAddress = TOKEN_ADDRESS;
const recipientAddress = BOB_ADDRESS;

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/signature', async (req, res) => {
  const { owner, spender, value, nonce, deadline, v, r, s } = req.body;
  try {
    const permitData = contract.methods.permit(owner, spender, value, deadline, v, r, s).encodeABI();
    const permitGas = await contract.methods.permit(owner, spender, value, deadline, v, r, s).estimateGas({ from: owner });

    const permitTx = {
      to: contractAddress,
      data: permitData,
      gas: permitGas,
      from: owner
    };

    const signedPermitTx = await web3.eth.accounts.signTransaction(permitTx, RELAYER_PRIV_KEY);
    const permitReceipt = await web3.eth.sendSignedTransaction(signedPermitTx.rawTransaction);

    console.log('Permit transaction receipt:', permitReceipt);

    const transferFromData = contract.methods.transferFrom(owner, recipientAddress, value).encodeABI();
    const transferFromGas = await contract.methods.transferFrom(owner, recipientAddress, value).estimateGas({ from: spender });

    const transferFromTx = {
      to: contractAddress,
      data: transferFromData,
      gas: transferFromGas,
      from: spender
    };

    const signedTransferFromTx = await web3.eth.accounts.signTransaction(transferFromTx, RELAYER_PRIV_KEY);
    const transferFromReceipt = await web3.eth.sendSignedTransaction(signedTransferFromTx.rawTransaction);

    console.log('TransferFrom transaction receipt:', transferFromReceipt);

    res.json({ txHash: transferFromReceipt.transactionHash });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', error: error.message });
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

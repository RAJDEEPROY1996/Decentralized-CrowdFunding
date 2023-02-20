const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
require('dotenv').config();
const{privateKey} = process.env;
const CAddress ='0x3c4CEb4446cD8B02230A0DdaB1C0435Eb35da40C';

let web3;
let accounts;
let Owner;
let instance;

const Connect = async() => {
  const provider = new HDWalletProvider(privateKey,`https://data-seed-prebsc-2-s1.binance.org:8545/`);
  web3 = new Web3(provider);
  let abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"listOfDonors","outputs":[{"components":[{"internalType":"address","name":"wallet","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct crowdfunding.fundDetails[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sendFund","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  instance = new web3.eth.Contract(
    abi,
    CAddress,
  );
  accounts = await web3.eth.getAccounts()
  Owner = accounts[0];
  console.log(Owner);
}

const findFundAmount = async() => {
    accounts = await web3.eth.getAccounts()
     await instance.methods.getLatestPrice().call()
    .then(amount =>{
      console.log("---------------------------");
      console.log("per dollar to ETH -> ",Number(amount)+1);
      console.log("---------------------------");
      return amount+1;
    });    
}
  
const sendFund = async(amount) => {  
  accounts = await web3.eth.getAccounts()
  await instance.methods.sendFund().send({
    from: accounts[0],
    gas: 8500000,
    value:amount
  })
  .then(()=>{
    console.log("---------------------------");
    console.log("User ",accounts[0],"have deposited amount",amount);
    console.log("---------------------------");
  });  
}

const withdrawAmount = async(amount) => {
    accounts = await web3.eth.getAccounts()
    await instance.methods.withdraw().send({
      from: accounts[0],
      gas: 8500000,
    })
    .then(()=>{
      console.log("---------------------------");
      console.log("Admin ",accounts[0],"have withdrawn amount");
      console.log("---------------------------");
    });  
  }


Connect();
findFundAmount();
//sendFund(589518779580118);
withdrawAmount();



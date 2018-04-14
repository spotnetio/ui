const LOCAL_PATH = "/assets/contracts/local/";
const ContractsByNetwork = { 
  4224 : [
    // LOCAL_PATH + "Spot.json",
    LOCAL_PATH + "EosToken.json",
    LOCAL_PATH + "VenToken.json",
    LOCAL_PATH + "WethToken.json",
    // LOCAL_PATH + "X1Token.json",
  ],
};

let App = {
  web3Provider: null,
  deployedContracts: {}, 
  contractsByAddress: {},
  account: 0x0,
  vaultDeployed: null, 

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
    } else {
      alert("Please connect metamask");
      return;
    }
    web3 = new Web3(App.web3Provider);

    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
      }
    });

    return App.initContracts();
  },

  initContracts: async function() {
    // Initialize vault 
    let vaultArtifact = await $.getJSON(LOCAL_PATH + "Spot.json");
    let vaultContract = TruffleContract(vaultArtifact);
    vaultContract.setProvider(App.web3Provider);
    App.vaultDeployed = await vaultContract.deployed();

    let contracts = ContractsByNetwork[4224];
    for (var i = 0; i < contracts.length; i++) {
      tokenArtifact = await $.getJSON(contracts[i]);
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      tokenContract = TruffleContract(tokenArtifact);
      // set the provider for our contracts
      tokenContract.setProvider(App.web3Provider);
      // Save instance
      let deployedContract = await tokenContract.deployed();
      deployedContract.name = tokenArtifact.contractName;
      App.deployedContracts[tokenArtifact.contractName] = deployedContract;
      App.contractsByAddress[deployedContract.address] = deployedContract;
    }
    DisplayCards(jQuery, _);
  },


  // // approve: async function(token, amount) {
  // //   balance = await App.contracts[token].balanceOf(App.account);
  // //   if (balance.toNumber() >= parseInt(amount)) {
  // //     App.contracts[token].approve(
  // //       App.spot.address, 
  // //       amount,
  // //       {from: App.account}
  // //     ).catch(function(err) {
  // //       console.log("Error approving " + err);
  // //     });
  // //   }
  // //   else {
  // //     console.log("balance not enough " + balance + " need " + amount);
  // //   }
  // // },

  // sign: async function(text) {
  //   log(App.account);
  //   log(text);
  //   let sha = web3.sha3(text);
  //   // log(sha);
  //   web3.eth.sign(App.account, sha, async function(err, sig) {
  //     if(err !== null) {
  //       log(err);
  //       return;
  //     }
  //     let r = sig.slice(0, 66);
  //     let s = "0x" + sig.slice(66, 130);
  //     let v = parseInt(sig.slice(130, 132), 16);
  //     resp = await App.spot.testSign(sha, v, r, s);
  //     log(resp);
  //   });
  // },

};

App.init();

function log(s) {
  console.log(s);
};
const MATCHER_URL = 'http://localhost:3001';

let App = {
  web3Provider: null,
  deployedContracts: {}, 
  contractsByAddress: {},
  account: 0x0,
  vaultDeployed: null, 
  TradersTokens: {}, 
  LendersTokens: {},

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
      else {
        alert("Please connect metamask");
      }
    });

    return App.initContracts();
  },

  initContracts: async function() {
    // Initialize vault 
    let vaultArtifact = await $.ajax({
      url: MATCHER_URL + '/contracts/Spot'
    });
    let vaultContract = TruffleContract(vaultArtifact);
    vaultContract.setProvider(App.web3Provider);
    App.vaultDeployed = await vaultContract.deployed();

    let traders = await App.vaultDeployed.getTraders();
    let tokens = await App.vaultDeployed.getTokens();
    traders.forEach(async function (t, i) {
      App.TradersTokens[t+tokens[i]]=i;
      let lenders = await App.vaultDeployed.getLenders(i);
      lenders.forEach(function (l, j) {
        if (l+tokens[i] in App.LendersTokens) {
          App.LendersTokens[l+tokens[i]].push([i,j]);
        }
        else {
          App.LendersTokens[l+tokens[i]]=[[i,j]];
        }
      });
    });

    $.ajax({
      url: MATCHER_URL + '/tokens/',
      success: async function( data ) {
        for(let contract in data) {
          let tokenArtifact = data[contract];
          // get the contract artifact file and use it to instantiate a truffle contract abstraction
          let tokenContract = TruffleContract(tokenArtifact);
          // set the provider for our contracts
          tokenContract.setProvider(App.web3Provider);
          // Save instance
          let deployedContract = await tokenContract.deployed();
          deployedContract.name = tokenArtifact.contractName;
          App.deployedContracts[tokenArtifact.contractName] = deployedContract;
          App.contractsByAddress[deployedContract.address] = deployedContract;
        };
        DisplayCards(jQuery, _);
      },
    });
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
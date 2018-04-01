App = {
  web3Provider: null,
  contracts: {},
  spot: null,
  account: 0x0,
  data: [{}],
  loading: false,
  tokens: [
    // {'json': 'X1Token.json', 'name': 'X1', 'icon': 'https://s2.coinmarketcap.com/static/img/coins/16x16/1765.png'}, 
    {'json': 'WethToken.json', 'name': 'Weth', 'icon': 'https://s2.coinmarketcap.com/static/img/coins/32x32/2396.png'},
    {'json': 'EosToken.json', 'name': 'Eos', 'icon': 'https://s2.coinmarketcap.com/static/img/coins/32x32/1765.png'},
    {'json': 'VenToken.json', 'name': 'VeChain', 'icon': 'https://s2.coinmarketcap.com/static/img/coins/32x32/1904.png'},
  ],

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // initialize web3
    if(typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
    } else {
      //create a new provider and plug it directly into our local node
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContracts();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        web3.eth.getBalance(account, function(err, balance) {
          if(err === null) {
            setAcctBalance(web3.fromWei(balance, "ether"));
          }
        });
      }
    });
  },

  initContracts: async function() {
    spotArtifact = await $.getJSON('Spot.json');
    // get the contract artifact file and use it to instantiate a truffle contract abstraction
    SpotContract = TruffleContract(spotArtifact);
    // set the provider for our contracts
    SpotContract.setProvider(App.web3Provider);
    // Save instance
    App.spot = await SpotContract.deployed();
    
    for (var i = 0; i < App.tokens.length; i++) {
      t = App.tokens[i];
      tokenArtifact = await $.getJSON(t.json);
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      tokenContract = TruffleContract(tokenArtifact);
      // set the provider for our contracts
      tokenContract.setProvider(App.web3Provider);
      // Save instance
      App.contracts[t.name] = await tokenContract.deployed();
    }
    return App.reloadPortfolio();
  },

  reloadPortfolio: async function() {
    // avoid reentry
    if(App.loading) {
      return;
    }
    App.loading = true;
    App.data = [];

    // refresh account information because the balance might have changed
    App.displayAccountInfo();

    for (token in App.contracts) {
      row = {"token": token};
      row["balance"] = await App.contracts[token].balanceOf(App.account);
      // Need this here twice for some reason otherwise 0
      row["balance"] = await App.contracts[token].balanceOf(App.account);
      row["committed"] = await App.contracts[token].allowance(App.account, App.spot.address);
      row["locked"] = await App.spot.getLockLender(App.contracts[token].address, App.account);
      App.data.push(row);
    }
    $('#table').bootstrapTable("load", App.data);

    App.loading = false;
  },

  approve: async function(token, amount) {
    balance = await App.contracts[token].balanceOf(App.account);
    if (balance.toNumber() >= parseInt(amount)) {
      App.contracts[token].approve(
        App.spot.address, 
        amount,
        {from: App.account}
      ).catch(function(err) {
        console.log("Error approving " + err);
      });
    }
    else {
      console.log("balance not enough " + balance + " need " + amount);
    }
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

function log(s) {
  console.log(s);
}

'use strict';

const Inventory = (function() {
  return {
    get(tokensToExclude) {
      return new Promise(async (resolve, reject) => {
        let result = [];
        for (let key in App.deployedContracts) {
          if (tokensToExclude.indexOf(key) >= 0) continue;
          let contract = App.deployedContracts[key];
          result.push({
            name: key,
            tokenAddress: contract.address,
            available: contract.address in App.AmountByToken ? App.AmountByToken[contract.address] : 0,
            price: App.mock[key]['price'],
            dailyVol: App.mock[key]['dailyVol'],
            shortInterest: App.mock[key]['shortInterest'],
            initMargin: App.mock[key]['initMargin'],
            minMargin: App.mock[key]['minMargin'],
            dailyLendingRate: App.mock[key]['dailyLendingRate'],
            dailyLendVol: App.mock[key]['dailyLendVol'],
          });
        }
        resolve(result);
      });
    },
  };
})();

const Positions = (function() {
  return {
    get() {
      return new Promise(async (resolve, reject) => {
        let result = [];
        $.ajax({
          url: MATCHER_URL + '/inventory/'+App.account,
          success: async function( data ) {
            for(let token in App.contractsByAddress) {
              let openLend = 0; 
              if(token in data) {
                openLend = data[token]['lender'];
              }              
              let amounts = [0];
              if (App.account+token in App.LendersTokens) {
                let lenderCoordinates = App.LendersTokens[App.account+token];
                for (let [i,lc] of lenderCoordinates.entries()) {
                  let allAmts = await App.vaultDeployed.getAmounts(
                    lc[0]
                  )
                  amounts.push(allAmts[lc[1]]);
                }
              }
              let lockedLend = amounts.reduce((a, b) => parseInt(a) + parseInt(b), 0);
              if(openLend > 0 || lockedLend > 0) {
                result.push({
                  price: App.mock[App.contractsByAddress[token].name]['price'],
                  dailyVol: App.mock[App.contractsByAddress[token].name]['dailyVol'],
                  shortInterest: App.mock[App.contractsByAddress[token].name]['shortInterest'],
                  initMargin: App.mock[App.contractsByAddress[token].name]['initMargin'],
                  minMargin: App.mock[App.contractsByAddress[token].name]['minMargin'],
                  dailyLendingRate: App.mock[App.contractsByAddress[token].name]['dailyLendingRate'],
                  dailyLendVol: App.mock[App.contractsByAddress[token].name]['dailyLendVol'],
                  name: App.contractsByAddress[token].name,
                  tokenAddress: token,
                  available: token in App.AmountByToken ? App.AmountByToken[token] : 0,
                  side: 'LEND',
                  amountLoaned: lockedLend,
                  interestEarned: '$0 USD',
                  openInventory: openLend,
                  openDuration: '1 DAYS',
                });
              }
            }
            resolve(result);
          },
        });
      });
    },
  };
})();

const Trades = (function() {
  return {
    get() {
      return new Promise(async (resolve, reject) => {
        let result = [];
        $.ajax({
          url: MATCHER_URL + '/inventory/'+App.account,
          success: async function( data ) {
            for(let token in App.contractsByAddress) {
              let openTrade = 0; 
              if(token in data) {
                openTrade = data[token]['trader'];
              }
              let amounts = [0];
              if (App.account+token in App.TradersTokens) {
                amounts = await App.vaultDeployed.getAmounts(
                  parseInt(App.TradersTokens[App.account+token])
                );
              }
              let lockedTrade = amounts.reduce((a, b) => parseInt(a) + parseInt(b), 0);
              if(openTrade > 0 || lockedTrade > 0) {
                result.push({
                  price: App.mock[App.contractsByAddress[token].name]['price'],
                  dailyVol: App.mock[App.contractsByAddress[token].name]['dailyVol'],
                  shortInterest: App.mock[App.contractsByAddress[token].name]['shortInterest'],
                  initMargin: App.mock[App.contractsByAddress[token].name]['initMargin'],
                  minMargin: App.mock[App.contractsByAddress[token].name]['minMargin'],
                  dailyLendingRate: App.mock[App.contractsByAddress[token].name]['dailyLendingRate'],
                  dailyLendVol: App.mock[App.contractsByAddress[token].name]['dailyLendVol'],
                  name: App.contractsByAddress[token].name,
                  tokenAddress: token,
                  available: token in App.AmountByToken ? App.AmountByToken[token] : 0,
                  side: 'SHORTSELL',
                  amountLoaned: lockedTrade,
                  interestEarned: '75.83 ETH',
                  openInventory: openTrade,
                  openDuration: '1 DAYS',
                });
              }
            }
            resolve(result);
          },
        });
      });
    },
  };
})();

const DisplayCards = function($, _) {
  $('.inventory').empty();
  $('.positions').empty();
  $('.trades').empty();
  let tokensToExclude = [];
  Positions.get().then((positionCards) => {
    _.forEach(positionCards, card => { 
      $('.positions').append(tpl.positionCard(card)); 
      tokensToExclude.push(card.name);
    });
    populateTrades();
  });
  function populateTrades() {
    Trades.get().then((tradeCards) => {
      _.forEach(tradeCards, card => { 
        $('.positions').append(tpl.tradeCard(card)); 
        tokensToExclude.push(card.name);
      });
      populateInventory();
    });
  }
  function populateInventory() {
    Inventory.get(tokensToExclude).then((inventoryCards) => {
      _.forEach(inventoryCards, card => $('.inventory').append(tpl.inventoryCard(card)));
    });
  }
};

(function($, _) {
  $('.inventory.card-deck').on('click', 'form.trade button.lend', lend);
  $('.positions.card-deck').on('click', 'form.trade button.lend', lend);
  function lend(event) {
    event.preventDefault();
    let formTrade = $(event.target).parents('form.trade');
    let $lend = formTrade.find('input[name="trade"]');
    let lendAmt = parseInt($lend.val());
    // console.log('lendAmt ' + lendAmt);
    let $tokenAddress = formTrade.find('input[name="tokenAddress"]');
    let tokenAddress = $tokenAddress.val();
    if (isNaN(lendAmt)) {
      console.log('lend amount is not a number');
      $lend.val('');
      return;
    }
    $.ajax({
      type: "POST",
      url: MATCHER_URL + '/inventory/'+App.account,
      data: { 
        token: tokenAddress, 
        amount: lendAmt, 
        role: 'lender' },
    }).always(function(data) {
        DisplayCards($, _);
    });
    $lend.val('');
  }
  $('.inventory.card-deck').on('click', 'form.trade button.short', short);
  $('.positions.card-deck').on('click', 'form.trade button.short', short);
  function short(event) {
    event.preventDefault();
    let formTrade = $(event.target).parents('form.trade');
    let $trade = formTrade.find('input[name="trade"]');
    let shortAmt = parseInt($trade.val());
    let $tokenAddress = formTrade.find('input[name="tokenAddress"]');
    let tokenAddress = $tokenAddress.val();
    if (isNaN(shortAmt)) {
      console.log('short is not a number');
      $trade.val('');
      return;
    }
    $.ajax({
      type: "POST",
      url: MATCHER_URL + '/inventory/' + App.account,
      data: { 
        token: tokenAddress, 
        amount: shortAmt, 
        role: 'trader' },
    }).always(function(data) {
        DisplayCards($, _);
    });
    $trade.val('');
  }
  $('.positions.card-deck').on('click', 'form.recall button.recall', (event) => {
    event.preventDefault();
    let formRecall = $(event.target).parents('form.recall');
    let $recallAmt = formRecall.find('input[name="recallAmt"]');
    let recallAmt = parseInt($recallAmt.val());
    let $tokenAddress = formRecall.find('input[name="tokenAddress"]');
    let tokenAddress = $tokenAddress.val();
    console.log(tokenAddress);
    if (isNaN(recallAmt)) {
      console.log('recall is not a number');
      $recallAmt.val('');
      return;
    }
    $.ajax({
      type: "POST",
      url: MATCHER_URL + '/recall/'+App.account,
      data: { 
        token: tokenAddress, 
        amount: recallAmt},
    }).always(function(data) {
        DisplayCards($, _);
    });
    console.log('recalling', recallAmt);
    $recallAmt.val('');
  });
  $('.positions.card-deck').on('click', 'form.buy2cover button.buy2cover', (event) => {
    event.preventDefault();
    let formB2c = $(event.target).parents('form.buy2cover');
    let $buy2coverAmt = formB2c.find('input[name="buy2coverAmt"]');
    let buy2coverAmt = parseInt($buy2coverAmt.val());
    let $tokenAddress = formB2c.find('input[name="tokenAddress"]');
    let tokenAddress = $tokenAddress.val();
    if (isNaN(buy2coverAmt)) {
      console.log('buy2cover is not a number');
      $buy2coverAmt.val('');
      return;
    }
    $.ajax({
      type: "POST",
      url: MATCHER_URL + '/b2c/'+App.account,
      data: { 
        token: tokenAddress, 
        amount: buy2coverAmt},
    }).always(function(data) {
        DisplayCards($, _);
    });
    console.log('buying back', buy2coverAmt);
    $buy2coverAmt.val('');
  });
})(jQuery, _);

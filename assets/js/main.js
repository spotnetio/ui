'use strict';

const MATCHER_URL = 'http://localhost:3001';

const Inventory = (function() {
  return {
    get() {
      return new Promise(async (resolve, reject) => {
        let result = [];
        for (let key in App.deployedContracts) {
          let contract = App.deployedContracts[key];
          result.push({
            name: key,
            tokenAddress: contract.address,
            price: '0.0899 ETH',
            dailyVol: 58470,
            shortInterest: '< 2%',
            initMargin: '50%',
            minMargin: '15%',
            dailyLendingRate: '0.03 BNB',
            dailyLendVol: 9000,
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
      return new Promise((resolve, reject) => {
        let result = [];
        console.log(App.account)
        $.ajax({
          url: MATCHER_URL + '/inventory/'+App.account,
          success: function( data ) {
            for(let token in data) {
              if(data[token]['lender'] > 0) {
                result.push({
                  name: App.contractsByAddress[token].name,
                  side: 'LEND',
                  amountLoaned: '8000 BNB',
                  interestEarned: '75.83 ETH',
                  openInventory: data[token]['lender'],
                  openDuration: '1 Day(s)',
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
      return new Promise((resolve, reject) => {
        let result = [];
        console.log(App.account)
        $.ajax({
          url: MATCHER_URL + '/inventory/'+App.account,
          success: function( data ) {
            for(let token in data) {
              if(data[token]['trader'] > 0) {
                result.push({
                  name: App.contractsByAddress[token].name,
                  side: 'TRADE',
                  amountLoaned: '8000 BNB',
                  interestEarned: '75.83 ETH',
                  openInventory: data[token]['trader'],
                  openDuration: '1 Day(s)',
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
  Inventory.get().then((inventoryCards) => {
    _.forEach(inventoryCards, card => $('.inventory').append(tpl.inventoryCard(card)));
  });
  Positions.get().then((positionCards) => {
    _.forEach(positionCards, card => $('.positions').append(tpl.positionCard(card)));
  });
  Trades.get().then((tradeCards) => {
    _.forEach(tradeCards, card => $('.trades').append(tpl.tradeCard(card)));
  });
};

(function($, _) {
  $('.inventory.card-deck').on('click', 'form.trade button.lend', (event) => {
    event.preventDefault();
    let formTrade = $(event.target).parents('form.trade');
    let $lend = formTrade.find('input[name="trade"]');
    let lendAmt = parseInt($lend.val());
    console.log('lendAmt ' + lendAmt);
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
  });
  $('.inventory.card-deck').on('click', 'form.trade button.short', (event) => {
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
  });
  $('.positions.card-deck').on('submit', 'form.recall', (event) => {
    event.preventDefault();
    let $recall = $(event.target).find('input[name="recall"]');
    let recallAmt = parseInt($recall.val());
    if (isNaN(recallAmt)) {
      console.log('recall is not a number');
      $recall.val('');
      return;
    }
    console.log('recalling', recallAmt);
    $recall.val('');
  });
  $('.trades.card-deck').on('submit', 'form.buy2cover', (event) => {
    event.preventDefault();
    let $buy2cover = $(event.target).find('input[name="buy2cover"]');
    let buy2coverAmt = parseInt($buy2cover.val());
    if (isNaN(buy2coverAmt)) {
      console.log('buy2cover is not a number');
      $buy2cover.val('');
      return;
    }
    console.log('buying back', buy2coverAmt);
    $buy2cover.val('');
  });
})(jQuery, _);

'use strict';

const Inventory = (function() {
  return {
    get() {
      return new Promise(async (resolve, reject) => {
        let result = [];
        for (let key in App.deployedContracts) {
          let contract = App.deployedContracts[key];
          result.push({
            name: key,
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
        $.ajax({
          url: 'http://localhost:3001/inventory',
          success: function( data ) {
            for(let token in data) {
              result.push({
                name: App.contractsByAddress[token].name,
                side: 'LEND',
                amountLoaned: '8000 BNB',
                interestEarned: '75.83 ETH',
                openInventory: data[token],
                openDuration: '6 Days',
              });
            }
            resolve(result);
          },
        });
      });
    },
  };
})();

const DisplayCards = function($, _) {
  Inventory.get().then((inventoryCards) => {
    _.forEach(inventoryCards, card => $('.inventory').append(tpl.inventoryCard(card)));
  });
  Positions.get().then((positionCards) => {
    _.forEach(positionCards, card => $('.positions').append(tpl.positionCard(card)));
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
  $('.inventory.card-deck').on('click', 'form.trade button.lend', (event) => {
    event.preventDefault();
    let $trade = $(event.target).parents('form.trade').find('input[name="trade"]');
    let lendAmt = parseInt($trade.val());
    if (isNaN(lendAmt)) {
      console.log('lend amount is not a number');
      $trade.val('');
      return;
    }
    console.log('lending', lendAmt);
    $trade.val('');
  });
  $('.inventory.card-deck').on('click', 'form.trade button.short', (event) => {
    event.preventDefault();
    let $trade = $(event.target).parents('form.trade').find('input[name="trade"]');
    let shortAmt = parseInt($trade.val());
    if (isNaN(shortAmt)) {
      console.log('short is not a number');
      $trade.val('');
      return;
    }
    console.log('short', shortAmt);
    $trade.val('');
  });
};

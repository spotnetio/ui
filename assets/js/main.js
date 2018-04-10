'use strict';

const Inventory = (function() {
  return {
    get() {
      return new Promise((resolve, reject) => {
        let inventoryCard = {
          price: '0.089 ETH',
          dailyVol: 58470,
          shortInterest: '< 2%',
          initMargin: '50%',
          minMargin: '15%',
          dailyLendingRate: '0.03 BNB',
          dailyLendVol: 9000,
        };
        resolve([inventoryCard]);
      });
    },
  };
})();

const Positions = (function() {
  return {
    get() {
      return new Promise((resolve, reject) => {
        let positionCard = {
          side: 'LEND',
          amountLoaned: '8000 BNB',
          interestEarned: '75.83 ETH',
          openInventory: '2000 BNB',
          openDuration: '6 Days',
        };
        resolve([positionCard]);
      });
    },
  };
})();

;(function($, _) {
  Inventory.get().then((inventoryCards) => {
    _.forEach(inventoryCards, card => $('.inventory').append(tpl.inventoryCard(card)));
  });
  Positions.get().then((positionCards) => {
    _.forEach(positionCards, card => $('.positions').append(tpl.positionCard(card)));
  });

})(jQuery, _);

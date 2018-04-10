'use strict';

;(function($, _) {
  let positionCard = {
    side: 'LEND',
    amountLoaned: '8000 BNB',
    interestEarned: '75.83 ETH',
    openInventory: '2000 BNB',
    openDuration: '6 Days',
  };
  let inventoryCard = {
    price: '0.089 ETH',
    dailyVol: 58470,
    shortInterest: '< 2%',
    initMargin: '50%',
    minMargin: '15%',
    dailyLendingRate: '0.03 BNB',
    dailyLendVol: 9000,
  };
  $('.inventory').append(tpl.inventoryCard(inventoryCard));
  $('.positions').append(tpl.positionCard(positionCard));
})(jQuery, _);

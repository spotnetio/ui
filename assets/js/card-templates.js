'use strict';

let tpl = {};
tpl.positionCard = _.template(`
  <div class="position-card card mb-4 box-shadow col-xl-3">
    <div style="background-image: url('https://s3.amazonaws.com/spotnet/dark.top.png');">
      <div class="card-header text-white">
        <img src="https://s3.amazonaws.com/spotnet/eos.png" width=50 height=50>
        <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
        <h6 class="mt-1 my-0 font-weight-normal">9088890</h6>
      </div>
      <div class="card-body text-white">
        <table class="metrics my-2">
          <tr>
            <td class="metrics-name">Side:</td>
            <td class="metrics-value"><%= side %></td>
          </tr>
          <tr>
            <td class="metrics-name">Locked:</td>
            <td class="metrics-value"><%= amountLoaned %></td>
          </tr>
          <tr>
            <td class="metrics-name">Interest Earned:</td>
            <td class="metrics-value"><%= interestEarned %></td>
          </tr>
        </table>
        <hr style="border-color:#ffffff;">
        <table class="metrics my-2">
          <tr>
            <td class="metrics-name">Open Inventory:</td>
            <td class="metrics-value"><%= openInventory %></td>
          </tr>
          <tr>
            <td class="metrics-name">Duration Open:</td>
            <td class="metrics-value"><%= openDuration %></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card-body">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Side:</td>
          <td class="metrics-value"><%= side %></td>
        </tr>
        <tr>
          <td class="metrics-name">Locked:</td>
          <td class="metrics-value"><%= amountLoaned %></td>
        </tr>
        <tr>
          <td class="metrics-name">Interest Earned:</td>
          <td class="metrics-value"><%= interestEarned %></td>
        </tr>
      </table>
      <hr style="border-color:#052C4C;">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Open Inventory:</td>
          <td class="metrics-value"><%= openInventory %></td>
        </tr>
        <tr>
          <td class="metrics-name">Duration Open:</td>
          <td class="metrics-value"><%= openDuration %></td>
        </tr>
      </table>
    </div>
      <div class="form-recall">
      <form class="recall">
        <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
        <p><input type="text" name="recallAmt" value="" class="form-control" /></p>
        <p><button type="button" class="recall btn btn-primary">Recall</button></p>
      </form>
      </div>
  </div>
`);

tpl.tradeCard = _.template(`
  <div class="trade-card card mb-4 box-shadow col-xl-3">
    <div style="background-image: url('https://s3.amazonaws.com/spotnet/dark.top.png');">
      <div class="card-header text-white">
        <img src="https://s3.amazonaws.com/spotnet/trx.png" width=50 height=50>
        <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
        <h6 class="mt-1 my-0 font-weight-normal">9088890</h6>
      </div>
      <div class="card-body text-white">
        <table class="metrics my-2">
          <tr>
            <td class="metrics-name">Side:</td>
            <td class="metrics-value"><%= side %></td>
          </tr>
          <tr>
            <td class="metrics-name">Locked:</td>
            <td class="metrics-value"><%= amountLoaned %></td>
          </tr>
          <tr>
            <td class="metrics-name">Interest Earned:</td>
            <td class="metrics-value"><%= interestEarned %></td>
          </tr>
        </table>
        <hr style="border-color:#ffffff;">
        <table class="metrics my-2">
          <tr>
            <td class="metrics-name">Open Inventory:</td>
            <td class="metrics-value"><%= openInventory %></td>
          </tr>
          <tr>
            <td class="metrics-name">Duration Open:</td>
            <td class="metrics-value"><%= openDuration %></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card-body text-white" style="background-image: url('https://s3.amazonaws.com/spotnet/silver.png');">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Side:</td>
          <td class="metrics-value"><%= side %></td>
        </tr>
        <tr>
          <td class="metrics-name">Locked:</td>
          <td class="metrics-value"><%= amountLoaned %></td>
        </tr>
        <tr>
          <td class="metrics-name">Interest Earned:</td>
          <td class="metrics-value"><%= interestEarned %></td>
        </tr>
      </table>
      <hr style="border-color:#ffffff;">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Open Inventory:</td>
          <td class="metrics-value"><%= openInventory %></td>
        </tr>
        <tr>
          <td class="metrics-name">Duration Open:</td>
          <td class="metrics-value"><%= openDuration %></td>
        </tr>
      </table>
    </div>
      <div class="form-buy2cover">
      <form class="buy2cover">
        <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
        <p><input type="number" name="buy2coverAmt" value="" class="form-control" /></p>
        <p><button type="button" class="buy2cover btn btn-primary">Buy To Cover</button></p>
      </form>
      </div>
  </div>
`);

tpl.inventoryCard = _.template(`
  <div class="inventory-card card bg-dark text-white mb-4 box-shadow col-xl-3" style="background-image: url('https://s3.amazonaws.com/spotnet/dark.top.png');">
    <div class="card-header">
      <img src="https://s3.amazonaws.com/spotnet/0x-icon.png" width=50 height=50>
      <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
      <h6 class="mt-1 my-0 font-weight-normal">9088890</h6>
    </div>
    <div class="card-body">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Price:</td>
          <td class="metrics-value"><%= price %></td>
        </tr>
        <tr>
          <td class="metrics-name">Daily Vol:</td>
          <td class="metrics-value"><%= dailyVol %></td>
        </tr>
      </table>
      <hr style="border-color:#ffffff;">
      <table class="metrics my-3">
        <tr>
          <td class="metrics-name">Short Interest:</td>
          <td class="metrics-value"><%= shortInterest %></td>
        </tr>
        <tr>
          <td class="metrics-name">Initial Margin:</td>
          <td class="metrics-value"><%= initMargin %></td>
        </tr>
        <tr>
          <td class="metrics-name">Minimum Margin:</td>
          <td class="metrics-value"><%= minMargin %></td>
        </tr>
        <tr>
          <td class="metrics-name">Daily Lending Rate:</td>
          <td class="metrics-value"><%= dailyLendingRate %></td>
        </tr>
        <tr>
          <td class="metrics-name">24 Hour Lend Vol:</td>
          <td class="metrics-value"><%= dailyLendVol %></td>
        </tr>
      </table>
    </div>
      <div class="form-trade">
      <form class="trade">
        <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
        <p><input type="text" name="trade" value="" class="form-control"></p>
        <p style="display:inline;white-space: nowrap;">
        <button type="button" class="lend btn btn-primary">Lend</button>
        <button type="button" class="short btn btn-primary">Short Sell</button>
        </p>
      </form>
      </div>
  </div>
`);

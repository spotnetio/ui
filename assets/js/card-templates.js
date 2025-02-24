'use strict';

let tpl = {};
tpl.positionCard = _.template(`
  <div class="position-card card mb-4 box-shadow col-xl-3">
    <div style="background-image: url('https://s3.amazonaws.com/spotnet/dark.top.png');">
      <div class="card-header text-white" style="padding-bottom:0;border-bottom:0">
        <img src="https://s3.amazonaws.com/spotnet/<%= name %>.png" width=50 height=50>
        <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
        <h6 class="mt-1 my-0 font-weight-normal">Available: <%= available %></h6>
      </div>
      <div class="card-body text-white" style="padding-top:0">
        <hr style="border-color:#ffffff;">
        <table class="metrics my-0">
          <tr>
            <td class="metrics-name">Price:</td>
            <td class="metrics-value"><%= price %></td>
          </tr>
          <tr>
            <td class="metrics-name">Daily Vol:</td>
            <td class="metrics-value"><%= dailyVol %></td>
          </tr>
        </table>
        <hr class="metrics" style="border-color:#ffffff;">
        <table class="metrics my-0">
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
    </div>
    <div class="card-body">
      <table class="metrics my-0">
        <tr>
          <td class="metrics-name">Side:</td>
          <td class="metrics-value blue"><%= side %></td>
        </tr>
        <tr>
          <td class="metrics-name">Locked:</td>
          <td class="metrics-value"><%= amountLoaned %></td>
        </tr>
        <tr>
          <td class="metrics-name">Interest Earned:</td>
          <td class="metrics-value underline"><%= interestEarned %></td>
        </tr>
      </table>
      <hr class="metrics" style="border-color:#052C4C;">
      <table class="metrics my-0">
        <tr>
          <td class="metrics-name">Open Inventory:</td>
          <td class="metrics-value blue"><%= openInventory %></td>
        </tr>
        <tr>
          <td class="metrics-name">Duration Open:</td>
          <td class="metrics-value font-weight-normal"><%= openDuration %></td>
        </tr>
      </table>
    </div>
    <div class="form-trade">
      <form class="trade">
        <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
        <p><input type="number" name="trade" value="" class="form-control"></p>
        <p style="display:inline;white-space: nowrap;">
        <button type="button" class="lend btn btn-primary">Lend</button>
        </p>
      </form>
    </div>
    <div class="form-recall">
      <div style="padding:10;border:10;margin:10">
        <form class="recall">
          <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
          <p><input type="number" name="recallAmt" value="" class="form-control" /></p>
          <p><button type="button" class="recall btn btn-primary">Recall</button></p>
        </form>
      </div>
    </div>
  </div>
`);

tpl.tradeCard = _.template(`
  <div class="trade-card card mb-4 box-shadow col-xl-3">
    <div style="background-image: url('https://s3.amazonaws.com/spotnet/dark.top.png');">
      <div class="card-header text-white" style="padding-bottom:0;border-bottom:0">
        <img src="https://s3.amazonaws.com/spotnet/<%= name %>.png" width=50 height=50>
        <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
        <h6 class="mt-1 my-0 font-weight-normal">Available: <%= available %></h6>
      </div>
      <div class="card-body text-white" style="padding-top:0">
        <hr style="border-color:#ffffff;">
        <table class="metrics my-0">
          <tr>
            <td class="metrics-name">Price:</td>
            <td class="metrics-value"><%= price %></td>
          </tr>
          <tr>
            <td class="metrics-name">Daily Vol:</td>
            <td class="metrics-value"><%= dailyVol %></td>
          </tr>
        </table>
        <hr class="metrics" style="border-color:#ffffff;">
        <table class="metrics my-0" style="margin-bottom:0">
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
      <div class="card-body text-white" style="background-image: url('https://s3.amazonaws.com/spotnet/silver.png');">
        <table class="metrics my-0">
          <tr>
            <td class="metrics-name">Side:</td>
            <td class="metrics-value red"><%= side %></td>
          </tr>
          <tr>
            <td class="metrics-name">Locked:</td>
            <td class="metrics-value"><%= amountLoaned %></td>
          </tr>
          <tr>
            <td class="metrics-name">Collateral:</td>
            <td class="metrics-value">
              -&nbsp;&nbsp;&nbsp;
                <span class="underline" style="color: #00BCEA;">
                  <%= initMargin %> 
                </span>
              &nbsp;&nbsp;&nbsp;+
            </td>
          </tr>
        </table>
        <hr class="metrics" style="border-color:#ffffff;">
        <table class="metrics my-0">
          <tr>
            <td class="metrics-name">Open Inventory:</td>
            <td class="metrics-value red"><%= openInventory %></td>
          </tr>
          <tr>
            <td class="metrics-name">Duration Open:</td>
            <td class="metrics-value font-weight-normal"><%= openDuration %></td>
          </tr>
        </table>
      </div>
      <div class="form-trade">
        <form class="trade">
          <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
          <p><input type="number" name="trade" value="" class="form-control"></p>
          <p style="display:inline;white-space: nowrap;">
          <button type="button" class="short btn btn-primary">Short Sell</button>
          </p>
        </form>
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
    <div class="card-header" style="padding-bottom:0;border-bottom:0">
      <img src="https://s3.amazonaws.com/spotnet/<%= name %>.png" width=50 height=50>
      <h4 class="my-0 font-weight-normal" style="padding-top: 10px;"><%= name %></h4>
      <h6 class="mt-1 my-0 font-weight-normal">Available: <%= available %></h6>
    </div>
    <div class="card-body" style="padding-top:0">
      <hr style="border-color:#ffffff;">
      <table class="metrics my-0">
        <tr>
          <td class="metrics-name">Price:</td>
          <td class="metrics-value"><%= price %></td>
        </tr>
        <tr>
          <td class="metrics-name">Daily Vol:</td>
          <td class="metrics-value"><%= dailyVol %></td>
        </tr>
      </table>
      <hr class="metrics" style="border-color:#ffffff;">
      <table class="metrics my-0" style="margin-bottom:0">
        <tr>
          <td class="metrics-name">Short Interest:</td>
          <td class="metrics-value"><%= shortInterest %></td>
        </tr>
        <tr>
          <td class="metrics-name">Initial Margin:</td>
          <td class="metrics-value"><%= initMargin %></td>
        </tr>
        <tr>
          <td class="metrics-name">Min Margin:</td>
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
        <p><input type="number" name="trade" value="" class="form-control"></p>
        <p style="display:inline;white-space: nowrap;">
        <button type="button" class="lend btn btn-primary">Lend</button>
        <button type="button" class="short btn btn-primary">Short Sell</button>
        </p>
      </form>
    </div>
  </div>
`);

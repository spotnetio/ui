'use strict';

let tpl = {};
tpl.positionCard = _.template(`
  <div class="position-card card mb-4 box-shadow col-xl-3">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal"><%= name %></h4>
      <h6 class="mt-1 my-0 font-weight-normal">9088890</h6>
    </div>
    <div class="card-body">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Side:</td>
          <td class="metrics-value"><%= side %></td>
        </tr>
        <tr>
          <td class="metrics-name">Amount On Loan:</td>
          <td class="metrics-value"><%= amountLoaned %></td>
        </tr>
        <tr>
          <td class="metrics-name">Interest Earned:</td>
          <td class="metrics-value"><%= interestEarned %></td>
        </tr>
      </table>
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
      <form class="recall">
        <p><input type="text" name="recall" value="" class="form-control" /></p>
        <p><input type="submit" value="Recall" class="btn btn-primary" /></p>
      </form>
    </div>
  </div>
`);

tpl.tradeCard = _.template(`
  <div class="trade-card card mb-4 box-shadow col-xl-3">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal"><%= name %></h4>
      <h6 class="mt-1 my-0 font-weight-normal">9088890</h6>
    </div>
    <div class="card-body">
      <table class="metrics my-2">
        <tr>
          <td class="metrics-name">Side:</td>
          <td class="metrics-value"><%= side %></td>
        </tr>
        <tr>
          <td class="metrics-name">Amount On Loan:</td>
          <td class="metrics-value"><%= amountLoaned %></td>
        </tr>
        <tr>
          <td class="metrics-name">Interest Earned:</td>
          <td class="metrics-value"><%= interestEarned %></td>
        </tr>
      </table>
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
      <form class="buy2cover">
        <p><input type="text" name="buy2cover" value="" class="form-control" /></p>
        <p><input type="submit" value="Buy To Cover" class="btn btn-primary" /></p>
      </form>
    </div>
  </div>
`);

tpl.inventoryCard = _.template(`
  <div class="inventory-card card bg-dark text-white mb-4 box-shadow col-xl-3">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal"><%= name %></h4>
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
      <table class="metrics my-2">
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
      <form class="trade">
        <input type="hidden" name="tokenAddress" value="<%= tokenAddress %>">
        <p><input type="text" name="trade" value="" class="form-control"></p>
        <p>
          <button type="button" class="lend btn btn-primary">Lend</button>
          <button type="button" class="short btn btn-primary">Short Sell</button>
        </p>
      </form>

    </div>
  </div>
`);

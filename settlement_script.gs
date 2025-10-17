/**
 * @OnlyCurrentDoc
 * This script calculates the simplest set of transactions to settle all debts.
 */

// Function to add a custom menu to the spreadsheet.
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Expense Manager')
      .addItem('Calculate Final Transactions', 'calculateSettlementPlan')
      .addToUi();
}

// Main function to calculate and display the settlement plan.
function calculateSettlementPlan() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settlementSheet = ss.getSheetByName('settlement');
  const transactionsSheetName = 'final-transactions';

  // Get data from the settlement sheet
  if (!settlementSheet) {
    SpreadsheetApp.getUi().alert('Error: "settlement" sheet not found!');
    return;
  }
  const dataRange = settlementSheet.getRange('A2:D' + settlementSheet.getLastRow());
  const data = dataRange.getValues();

  // Separate people into debtors (owe money) and creditors (are owed money)
  let debtors = [];
  let creditors = [];

  data.forEach(row => {
    const name = row[0];
    const balance = parseFloat(row[3]);
    if (balance < 0) {
      debtors.push({ name: name, amount: -balance }); // amount is positive
    } else if (balance > 0) {
      creditors.push({ name: name, amount: balance });
    }
  });
  
  // Sort for efficiency: largest amounts first
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  let transactions = [];

  // Algorithm to match debtors to creditors
  while (debtors.length > 0 && creditors.length > 0) {
    let debtor = debtors[0];
    let creditor = creditors[0];
    
    // The amount to be paid is the smaller of the two balances
    let paymentAmount = Math.min(debtor.amount, creditor.amount);
    
    // Round to nearest 1000
    paymentAmount = Math.round(paymentAmount / 1000) * 1000;
    
    if (paymentAmount > 0) {
      transactions.push(`${debtor.name} pays ${creditor.name}: ${paymentAmount.toLocaleString('en-US')} Tomans`);
    }

    // Update balances
    debtor.amount -= paymentAmount;
    creditor.amount -= paymentAmount;

    // If a person's balance is settled, remove them from the list
    if (debtor.amount < 1) { // Use a small threshold for floating point
      debtors.shift();
    }
    if (creditor.amount < 1) {
      creditors.shift();
    }
  }

  // Write the results to the "Final Transactions" sheet
  let outputSheet = ss.getSheetByName(transactionsSheetName);
  if (!outputSheet) {
    outputSheet = ss.insertSheet(transactionsSheetName);
  }
  
  outputSheet.clear();
  outputSheet.getRange('A1').setValue('Final Settlement Plan').setFontWeight('bold');
  
  if (transactions.length > 0) {
    transactions.forEach((transaction, index) => {
      outputSheet.getRange(index + 2, 1).setValue(transaction);
    });
  } else {
    outputSheet.getRange(2, 1).setValue('All debts are settled!');
  }
}

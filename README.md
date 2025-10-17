# Google Sheets Roommate Expense Manager

A simple but powerful Google Sheet template to manage shared expenses among roommates, friends, or family. It automatically calculates who owes whom and provides a simple settlement plan with the minimum number of transactions.

## Features

-   **Dynamic Setup:** Add or remove roommates, and the entire sheet updates automatically.
    
-   **Fair Splitting:** Expenses are split based on consumption coefficients for each person.
    
-   **Debt Matrix:** See a detailed breakdown of who owes whom.
    
-   **Automated Settlement:** A one-click script calculates the simplest way to settle all debts.
    

## How to Use

Getting started is easy! You don't need to build the sheet from scratch.

**1. Create Your Own Copy**

Click the link below to create your own copy of the Google Sheet template in your Google Drive:

[**➡️ Get the Google Sheet Template Here**](https://docs.google.com/spreadsheets/d/1C-a6vFngBt348g4IJeLHqEZyfXvXotKJ3OT6xlWNXIw/copy)

**2. Set Up Your Sheet**

-   Open the **`roommates`** tab and enter the names of everyone in your group.
    
-   The headers in the **`current`** tab and the axes in the **`debts`** and **`settlement`** tabs will update automatically.
    

**3. Start Tracking Expenses**

-   Go to the **`current`** tab.
    
-   For each purchase, fill out the `reason`, `amount`, who `paid by`, and the consumption coefficients for each person. (e.g., a `1` means one share, `2` means two shares, and a blank cell or `0` means they didn't use it).
    

**4. Settle the Debts**

-   The **`debts`** and **`settlement`** tabs will automatically show you the final balances.
    
-   To get the simplified payment plan, click on the **Expense Manager > Calculate Final Transactions** menu item.
    
-   A sheet named **`final-transaction`** will be created with the simplest list of payments to clear all debts. You may need to grant script permissions the first time you run it.
    

## The Apps Script

This project uses Google Apps Script to calculate the final settlement plan. The code is included in this repository for reference. If you ever need to re-install it:

1.  Open the sheet and go to **Extensions > Apps Script**.
    
2.  Copy the code from the `settlement_script.gs` file in this repository.
    
3.  Paste the code into the script editor, save it, and refresh your sheet.

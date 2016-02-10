# Angular Stock Tracker 

Hit the Add button to go to the add stock form. You may add a stock by entering the stock's symbol in the symbol input and then hitting the Add Stock button. To look up symbols, enter an input in the search bar and hit search. In the search results, you may add symbols quickly by hitting the add button. Stock Tracker notifies you when you try to add a symbol that you're already tracking. 

See a detailed list of your tracked stocks by hitting List. Scroll to the right and hit the trash bin to remove the stock from your list. 

When you have stocks, you can, see a sweet view of the stock symbols you're tracking in your home page.  

Data is stored in local storage. 

### Deployed at: coolconfucius.github.io/angular-stock-tracker/

If you're cloning down... 

To begin execute `serve`.  

Cdns are there for gh-pages deployment. If you don't want to use cdns and want to use bower instead: 
In index.html, comment out the cdns and uncomment the tags with bower_components. 
To begin execute `bower i`.  This will install all bower dependencies.
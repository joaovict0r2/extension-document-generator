// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('tab:', tab)
  chrome.tabs.executeScript(
    tab.id,
    {code: 'window.print();'});
});
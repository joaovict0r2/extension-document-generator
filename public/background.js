chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.create({
    id: 'parent',
    title: 'Document Generator',
    type: 'normal',
    contexts: ['editable'],
  });

  await chrome.contextMenus.create({
    id: 'cpf',
    parentId: 'parent',
    title: 'Generate CPF',
    type: 'normal',
    contexts: ['editable'],
  });

  await chrome.contextMenus.create({
    id: 'cpnj',
    parentId: 'parent',
    title: 'Generate CNPJ',
    type: 'normal',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["generate-document.js"]
  })

  chrome.tabs.sendMessage(tab.id, {
    action: "GENERATE_DOCUMENT",
    docType: info.menuItemId
  });
});
window.addEventListener("load", () => {

    chrome.storage.onChanged.addListener((changes) => {
        location.reload(true);
    })

    chrome.storage.local.get("cookieObject", ({cookieObject}) => {
        console.log(cookieObject);
    })
})

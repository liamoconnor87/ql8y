window.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider");
    const trueValue = "true"
    const falsevalue = "false"
    const date = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    let cookieObject = document.cookie.split(";").map(cookie => cookie.split("=")).reduce((accumulator, [key, value]) =>({...accumulator, [key.trim()]:decodeURIComponent(value) }),{});

    if (document.cookie === "") {
        document.cookie=`expires=${date}; path=/`;
    }

    sliders.forEach(slider => slider.addEventListener("click", toggle));

    function toggle(){
        if (this.classList.contains(falsevalue)) {
            this.classList.remove(falsevalue)
            this.classList.add(trueValue)
            stream = this.getAttribute("strmattr")
            saveSettings(stream, trueValue)
        } else {
            this.classList.remove(trueValue)
            this.classList.add(falsevalue)
            stream = this.getAttribute("strmattr")
            saveSettings(stream, falsevalue)
        }

        function saveSettings(stream, value){
            document.cookie=`${stream}=${value}`
            document.cookie=`expires=${date}; path=/`;
            addToChromeStorage()
            setTimeout(location.reload(true),1000);
        }
    };

    (function setConfig(){
        sliders.forEach(slider => {
            if (cookieObject[slider.getAttribute("strmattr")] == trueValue) {
                slider.classList.remove(falsevalue)
                slider.classList.add(trueValue)
                slider.previousElementSibling.setAttribute("checked", "")
                addToChromeStorage()
            } else {
                slider.classList.remove(trueValue)
                slider.classList.add(falsevalue)
                addToChromeStorage()
            }
        })
    })()

    function addToChromeStorage(){
        chrome.storage.local.set({cookieObject})
    }
    console.log(cookieObject)
});
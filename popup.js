
function uncheck(e)
{
    chrome.tabs.executeScript(null, {file: "uncheck_script.js"});
}

document.addEventListener('DOMContentLoaded', function()
{
    var uc_btn = document.querySelector('#uncheck_btn');
    uc_btn.addEventListener("click", uncheck);
});
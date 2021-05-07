
function check(e)
{
    chrome.tabs.executeScript(null, {file: "check_script.js"});
}

function uncheck(e)
{
    chrome.tabs.executeScript(null, {file: "uncheck_script.js"});
}

function click(e)
{
    chrome.tabs.executeScript(null, 
        {code:"document.getElementById('btn_confirm').click();"});
}


document.addEventListener('DOMContentLoaded', function()
{
    var c_btn = document.querySelector('#check_btn');
    var uc_btn = document.querySelector('#uncheck_btn');
    var cl_btn = document.querySelector('#click_btn');
    c_btn.addEventListener("click", check);
    uc_btn.addEventListener("click", uncheck);
    cl_btn.addEventListener("click", click);
});
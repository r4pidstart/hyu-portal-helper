
// function uncheck(e)
// {
    //     chrome.tabs.executeScript(null, {file: "uncheck_script.js"});
    // }
    
document.addEventListener('DOMContentLoaded', function()
{
    // var uc_btn = document.querySelector('#uncheck_btn');
    // uc_btn.addEventListener("click", uncheck);
    var on_btn = document.querySelector('#switch_1');
    var off_btn = document.querySelector('#switch_0');
    on_btn.addEventListener("click", getSwitch(1));
    off_btn.addEventListener("click", getSwitch(0));
    chrome.storage.sync.get(['switch'], function(result)
    {
        if(result.key == 1)
            document.getElementById('switch_1').checked = true;
        else
            document.getElementById('switch_0').checked = true;
    });
});

function getSwitch(event)
{
    chrome.storage.sync.set({switch: event}, function(){});
}

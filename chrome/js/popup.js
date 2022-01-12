
document.addEventListener("DOMContentLoaded", function()
{
    const on=document.getElementById("switch_1");
    const off=document.getElementById("switch_0");
    on.addEventListener("click", setSwitch1);
    off.addEventListener("click", setSwitch0);
    chrome.storage.sync.get("data", function(items)
    {
        if(items.data == 0)
            document.getElementById("switch_0").checked = true;
        else
        {
            document.getElementById("switch_1").checked = true;
            setSwitch1();
        }
    });
});

function setSwitch0(e)
{
    chrome.storage.sync.set({"data" : 0}, function(){});
}

function setSwitch1(e)
{
    chrome.storage.sync.set({"data" : 1}, function(){});
}
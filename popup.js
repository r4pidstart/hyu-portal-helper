
document.addEventListener('DOMContentLoaded', function()
{
    var on=document.getElementById("switch_1");
    var off=document.getElementById("switch_0");
    on.addEventListener("click", setSwitch1);
    off.addEventListener("click", setSwitch0);
    chrome.storage.sync.get("data", function(items)
    {
        if(items.data == 0)
            document.getElementById('switch_0').checked = true;
        else
        {
            document.getElementById('switch_1').checked = true;
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

// todo
// 첫 실행시 기본으로 켜지게 하기.


// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.storage.sync.get('state', function(data) {
//       if (data.state === 'on') {
//         chrome.storage.sync.set({state: 'off'});
//         //do something, removing the script or whatever
//       } else {
//         chrome.storage.sync.set({state: 'on'});
//         //inject your script
//       }
//     });
//   });
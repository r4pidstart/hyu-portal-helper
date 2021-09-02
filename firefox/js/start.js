// https://portal.hanyang.ac.kr/openPage.do?pgmId=P320980&tk=daad9bae1afb44e5c91969df5d1031b326e3fea62674ed9f101a5948cd5909f9

function click(e)
{
    try
    {
        document.getElementById('c37_b').checked = true;
        document.getElementById('c38_b').checked = true;
        document.getElementById('c39_b').checked = true;
        document.getElementById('c40_b').checked = true;
        document.getElementById('c41_b').checked = true;
        document.getElementById('c42_b').checked = true;
    
        document.getElementById('btn_confirm').click();
    }
    catch{}
}

function page_check(e)
{
    try
    {
        var check=document.getElementById('c37_b');
        chrome.storage.sync.get("data", function(items)
        {
            if(items.data != 0)
                setTimeout(click, 700);
        });
    }
    catch{}
}

window.onload = page_check;

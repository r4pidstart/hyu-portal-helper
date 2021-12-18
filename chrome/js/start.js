// https://portal.hanyang.ac.kr/openPage.do?pgmId=P320980&tk=daad9bae1afb44e5c91969df5d1031b326e3fea62674ed9f101a5948cd5909f9

function click_corona(e)
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
    catch{ setTimeout(click_corona, 500); }
}

function click_eval(e)
{
    try{ document.getElementById('popupBlock').style.zIndex=-1; } catch{}

    let value=5;

    if(btnTimer != null)
        clearInterval(btnTimer);
    
    try
    {
        if(document.querySelector("#svContents > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td").innerText == "학과 교육만족도 설문조사")
            value=1;
    }
    catch{}

    try
    {
        let items=document.querySelectorAll("input[type=radio]");
        for(let i=0; i<items.length; i++)
            if(items[i].value==value) 
                items[i].checked = true;
    }
    catch{ setTimeout(click_lecture_eval, 500); }
}

let btnTimer=null;
function page_check(e)
{
    let config = { attributes: true, childList: true, characterData: true };
    let mainOb = new MutationObserver(function(e) 
    { 
        // lecture survey
        try
        { 
            if(document.querySelector(".txt_title").innerText == "금학기성적조회") 
                if(document.querySelector("#hyinContents > div.popupComponent.mediumHeader.ui-draggable").style.display == "block")
                    setTimeout(click_eval, 300);
        }
        catch{}
    });
    
    try{ mainOb.observe(document.querySelector("#hyinContents"), config); } catch{}


    try
    {
        // corona check
        let check=document.getElementById('c37_b');
        chrome.storage.sync.get("data", function(items)
        {
            if(items.data != 0)
                setTimeout(click_corona, 700);
        });
    }
    catch{}

    // lecture evaluation
    let timerCnt=0;
    let chkTimer = setInterval(function(e)
    {
        timerCnt++;
        if(timerCnt>7) 
        {
            clearTimeout(chkTimer);
            clearTimeout(btnTimer);
            return;
        }
        try
        {
            if(document.querySelector("#hyinContents > div.popupComponent.mediumHeader > h1").innerText == "강의평가문항입력")
            {
                btnTimer = setInterval(function()
                {
                    try
                    {
                        let btn = document.querySelectorAll("#btn_Confirm");
                        for(let i=0; i<btn.length; i++)
                            btn[i].addEventListener("click", function(){ setTimeout(click_eval, 300); });
                        clearTimeout(chkTimer);
                    }
                    catch{}
                }, 300);
            }
            else
                clearTimeout(chkTimer);
        }
        catch{}
    }, 300);
}

window.onload = page_check;

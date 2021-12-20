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

function click_radio(e)
{
    console.log(e);
    try
    {
        let btns=document.querySelectorAll("input[type=radio]");
        for(let btn of btns)
            if(btn.value==e.target.defaultValue) 
                btn.checked = true;
    }
    catch{}
}

function click_eval(e)
{
    try{ document.getElementById('popupBlock').style.zIndex=-1; } catch{}

    let btns = document.querySelectorAll("input[type=radio]");
    for(let btn of btns)
        btn.addEventListener("click", click_radio);
    console.log(btns);
}

function page_check(e)
{
    // on off check
    let flag;
    chrome.storage.sync.get("data", function(items){flag=items.data;});
    if(!flag) return;

    // lecture survey
    let config = { attributes: true, childList: true, characterData: true };
    let mainOb = new MutationObserver(function(e) 
    { 
        try
        { 
            if(document.querySelector(".txt_title").innerText == "금학기성적조회") 
                if(document.querySelector("#hyinContents > div.popupComponent.mediumHeader.ui-draggable").style.display == "block")
                    setTimeout(click_eval, 300);
        }
        catch{}
    });
    
    try{ mainOb.observe(document.querySelector("#hyinContents"), config); } catch{}

    // corona check
    try
    {
        let check=document.getElementById('c37_b');
        setTimeout(click_corona, 700);
    }
    catch{}
}

function checkWhetherEvalPage(e)
{
    // on off check
    let flag;
    chrome.storage.sync.get("data", function(items){flag=items.data;});
    if(!flag) return;

    try
    {
        if(document.querySelector("#hyinContents > div.popupComponent.mediumHeader > h1").innerText == "강의평가문항입력")
            try
            {
                let btn = document.querySelectorAll("#btn_Confirm");
                for(let i=0; i<btn.length; i++)
                    btn[i].addEventListener("click", function(){setTimeout(click_eval, 300);});
                setTimeout(click_eval, 300);
            }
            catch{}
    }
    catch{}
}

document.body.addEventListener("click", checkWhetherEvalPage, { once: true });
window.onload = page_check;


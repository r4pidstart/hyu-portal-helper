// https://portal.hanyang.ac.kr/openPage.do?pgmId=P320980&tk=daad9bae1afb44e5c91969df5d1031b326e3fea62674ed9f101a5948cd5909f9

let flag; // on off check

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
    const btns=document.querySelectorAll("input[type=radio]");
    try
    {
        for(let i=5; i<btns.length; i++)
            if(btns[i].value==e.target.defaultValue)
            {
                btns[i].click();
            }
    }
    catch{}
}

function click_eval(e)
{
    try{ document.getElementById('popupBlock').style.zIndex=-1; } catch{}

    let btns = document.querySelectorAll("input[type=radio]");
    for(let i=0; i<5; i++)
        btns[i].addEventListener("click", click_radio);
}

function page_check(e)
{
    chrome.storage.sync.get("data", function(items){flag=items.data;});
    if(!flag) return;

    // lecture survey
    const config = { attributes: true, childList: true, characterData: true };
    const mainOb = new MutationObserver(function() 
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

    // pw change
    try
    {
        if(document.querySelector(".pw_change"))
            try
            {
                document.querySelector("#btn_cancel").click();
            }
            catch{}
    }
    catch{}
}

function checkWhetherEvalPage(e)
{
    if(!flag) return;

    // survey
    try
    {
        if(document.querySelector("#svContents > table > tbody > tr > td > table > tbody > tr.even > td").innerText == "「교양 교과목 「C-한양핵심역량」 설문 조사」")
        {
            alert("다시 클릭해주세요.");
            click_eval();
        }
    }
    catch{}

    // eval
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

chrome.storage.sync.get("data", function(items){flag=items.data;});
document.body.addEventListener("click", checkWhetherEvalPage, { once: true });
window.onload = page_check;

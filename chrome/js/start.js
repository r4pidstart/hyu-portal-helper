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

function click_lecture_eval(e)
{
    console.log("eval");
    try{ document.getElementById('popupBlock').style.zIndex=-1; } catch{}

    try
    {
        let items=document.querySelectorAll("input[type=radio]");
        for(let i=0; i<items.length; i++)
            if(items[i].value==5) 
                items[i].checked = true;
    }
    catch{ setTimeout(click_lecture_eval, 500); }
}

let config = { attributes: true, childList: true, characterData: true };
let surveyObserverToggle=false, evalObserber=false;
function find_survey(e)
{
    try
    {
        // lecture survey
        if(surveyObserverToggle == false)
        {
            if(document.querySelector(".txt_title").innerText == "금학기성적조회")
            {
                let survey_ob = new MutationObserver(function(e) 
                {
                    console.log("TEST survey1");
                    if(document.querySelector("#titleNm").innerText == "「C-한양핵심역량」 설문 조사")
                    {
                        console.log("TEST survey2");
                        setTimeout(click_lecture_eval, 300);
                    }
                });
                survey_ob.observe(document.querySelector("#titleNm").innerText, config);
                surveyObserverToggle=true;
            }
        }
        else
        {
            if(document.querySelector(".txt_title").innerText != "금학기성적조회")
            {
                survey_ob.disconnect();
                surveyObserverToggle=false;
            }
        }
    }
    catch{}
}

function page_check(e)
{
    let observer = new MutationObserver(function(e) { find_survey(); });
    
    try{ observer.observe(document.querySelector("#hyinContents"), config); } catch{}

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

    try
    {
        // lecture evaluation
        if(document.querySelector("#btn_Confirm").value == "강의평가입력")
            if(document.querySelector('#hyinContents > div.popupComponent.mediumHeader.ui-draggable > h1').innerText == "강의평가문항입력")
                observer.observe(document.querySelector("#hyinContents > div.popupComponent.mediumHeader.ui-draggable"), config);
        console.log("observe eval");
    }
    catch{}
}

window.onload = page_check;

let flag; // on off check

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

// sugang
try
{
    if(document.querySelector("li.pt-10.hakjeom-area"))
    {
        let sugang_observer = new MutationObserver(() =>{
            const block = document.querySelector("#popupBlock");
            if(block)
                block.style.zIndex = -1;
        
            // delete multiple lectures
            const lecture_list = document.querySelector("#gdMain > tBody").children;
            for(let i=1; i<lecture_list.length; i++)
            {
                console.log(`${lecture_list[i].querySelector("#suupNo2").innerText} and ${lecture_list[i-1].querySelector("#suupNo2").innerText}`);
                if(lecture_list[i].querySelector("#suupNo2").innerText == lecture_list[i-1].querySelector("#suupNo2").innerText)
                    lecture_list[i--].remove();
            }
        });
        
        let main_form = document.querySelector("#hyinContents");
        let options = { attributes: true, childList: true, characterData: true };
        sugang_observer.observe(main_form, options);
    }
}
catch{}
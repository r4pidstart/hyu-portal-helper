// check whether this page is the self-check page
// https://portal.hanyang.ac.kr/openPage.do?pgmId=P320980&tk=daad9bae1afb44e5c91969df5d1031b326e3fea62674ed9f101a5948cd5909f9


function click(e)
{
    document.getElementById('c37_b').checked = true;
    document.getElementById('c38_b').checked = true;
    document.getElementById('c39_b').checked = true;
    document.getElementById('c40_b').checked = true;
    document.getElementById('c41_b').checked = true;
    document.getElementById('c42_b').checked = true;

    document.getElementById('btn_confirm').click();
}

function page_check(e)
{
    if(document.getElementById('c39_b'))
        setInterval(click, 750);
}

window.onload = page_check;

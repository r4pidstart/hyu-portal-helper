// check whether this page is the self-check page

function click(e)
{
    if(document.getElementsByClassName('c39_b')!=null)
    {
        document.getElementById('c37_b').checked = true;
        document.getElementById('c38_b').checked = true;
        document.getElementById('c39_b').checked = true;
        document.getElementById('c40_b').checked = true;
        document.getElementById('c41_b').checked = true;
        document.getElementById('c42_b').checked = true;

        // document.getElementById('btn_confirm').click;
    }
}

window.setTimeout(click, 1000);
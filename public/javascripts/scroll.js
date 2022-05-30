window.onscroll = function (){
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scroll !== 0){
        document.getElementById('header').style.backgroundColor = "#dedede";
        document.getElementById('header').style.height = "60px";
    } else {
        document.getElementById('header').style.backgroundColor = "white";
        document.getElementById('header').style.height = "70px";
    }
}
var inputRange = document.getElementById('inputRange');

var p = document.getElementById('pRange');

inputRange.addEventListener("mousemove", function (){
    p.innerHTML = this.value;
});
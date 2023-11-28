

function letsGo(){
    let name=document.getElementById("name").value;
    let nickName=document.getElementById("nickname").value;
    
    let obj={
        name,
        nickName
    }
    console.log(obj)
    localStorage.setItem("userDetails",JSON.stringify(obj));
    location.href="./game.html"
}
function goToIndex(){
    window.location.href="./app.js"
}
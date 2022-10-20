window.onload = function(){
    var btnRequest = document.getElementById("btn-request");
    btnRequest.onclick = (e)=>{
        e.preventDefault();
        
        let request = new XMLHttpRequest();
        request.onload = ()=>{
            request.responseText();
        };

        request.open("POST", "save");
        request.send("x=3&y=4"); //URL 요청 형식
    }
}
const btnSend = document.querySelector("#btnSend");
const userMSG = document.querySelector("#userMSG")
const chatBody = document.querySelector(".chatBody")

btnSend.addEventListener("click", () => renderMSG());


userMSG.addEventListener("keyup", (event) =>{
    if(event.key == 'Enter'){
        if(btnSend.disabled == false){
            renderMSG();
        }
    }
});


function renderMSG(){
    const msg = userMSG.value;
    if(String(msg).trim().length !== 0){

        renderChat(msg, "user");
        userMSG.value = "";
        btnSend.disabled = true
        setScrollPos();
        
        setTimeout(() => {
            fetch(`/chatbot?message=${encodeURIComponent(msg)}`)
            .then(response => response.text())
            .then(data => {
                renderChat(data,'bot');
                btnSend.disabled = false
                setScrollPos();
            });
        }, 600);
    }
    else{
        userMSG.value = "";
    }
}

function renderChat(msg, type){
    const div = document.createElement('div');
    const txtNode = document.createTextNode(msg);
    let classname = "userMSG";

    if (type == 'bot') {
        classname = 'botMSG'
    }

    div.append(txtNode);
    div.classList.add(classname);
    chatBody.append(div);

}

function setScrollPos(){
    if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}
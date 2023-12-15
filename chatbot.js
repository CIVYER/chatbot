// kukuha sa id and class ng elements na gustong manipulate
const btnSend = document.querySelector("#btnSend");
const userMSG = document.querySelector("#userMSG")
const chatBody = document.querySelector(".chatBody")
const cirCon = document.querySelector("#cirCon")

// pag click ng send button activate function "renderMSG()"
btnSend.addEventListener("click", () => renderMSG());


// pag click ng Enter Key sa keyboard activate function "renderMSG()"
userMSG.addEventListener("keyup", (event) =>{
    if(event.key == 'Enter'){
        if(btnSend.disabled == false){
            renderMSG();
        }
    }
});

// kukunin yung msg na nilagay ng user sa txtbox then fetch ng response from bot
function renderMSG(){
    const msg = userMSG.value;
    if(String(msg).trim().length !== 0){
        cirCon.style.visibility = 'visible';
        renderChat(msg, "user");
        userMSG.value = "";
        btnSend.disabled = true
        setScrollPos();
        
        setTimeout(() => {
            const url = 'https://api.wit.ai/event?v=20231122&session_id=prodiok&context_map=%7B%7D';
            const auth = 'Bearer XLVFS22VW6WOTVFI7XT7SO6VZYNVJ7YA';
            const data_message = {
                type: 'message',
                message: msg
              };
            fetch(url, {
                method:'POST',
                headers: {Authorization: auth},
                body:JSON.stringify(data_message)
            })
              .then(res => res.json())
              .then(res => {
                
                  renderChat(res,'bot');
                setTimeout(() => {
                    btnSend.disabled = false
                    cirCon.style.visibility = 'hidden';
                    setScrollPos();
                }, 500);
            })
            // fetch(`https://apichat-m56p.onrender.com/?message=${encodeURIComponent(msg)}`)
            // .then(response => response.text())
            // .then(data => {
            //     renderChat(data,'bot');
            //     btnSend.disabled = false
            //     setScrollPos();
            // });
        }, 600);
    }
    else{
        userMSG.value = "";
    }
}


// mag add ng element sa chatbody para lumitaw yung mga msg ng user or ng bot
function renderChat(msg, type){

    const div = document.createElement('div');
    let classname = "userMSG";

    if (type == 'bot') {
        classname = 'botMSG'
        div.classList.add(classname);

        let action = msg.action;
        try{
            let response = String(msg.response.text).toLowerCase();
            console.log(action);
            console.log(response);
            txtNode = document.createTextNode(action);
            div.append(txtNode);
            div.classList.add(classname);
            chatBody.append(div);
            // if(action == 'getTimeDay'){
            //     if(response == 'today' || response == 'time'){
            //         response = 'date and time today';
            //     }
            //     else if(response == 'yesterday'){
            //         response = 'date yesterday';
            //     }
            //     else if(response == 'tomorrow'){
            //         response = 'date tomorrow';
            //     }
            //     txtNode = document.createTextNode(response);
            //     div.append(txtNode);
            //     chatBody.append(div);
            // }

            // if(action == 'getFreeRoom'){
            //     response = response.split('-----');
            //     let dept = window.localStorage.getItem('dept');
            //     fetch(`http://localhost/gr2-3H/chatbot/chatbot.php?action=${action}&startTime=${response[0]}&endTime=${response[1]}&dept=${dept}`)
            //     .then(response => response.text())
            //     .then((data) =>{
            //         var list = data.split(',,,,,');
            //         console.log(data);
            //         window.localStorage.setItem('over2', 'stop');
            //         window.localStorage.setItem('currDept', list[0])
            //         window.localStorage.setItem('currRoom', list[1])
            //         window.localStorage.setItem('currOccOption', list[2])
                    
                    
            //         window.localStorage.setItem('currSect', '---')
            //         window.localStorage.setItem('currCourse', '---')
            //         if(list[0] != ''){
            //             var link = document.createElement('a')
            //             link.href = 'http://localhost/gr2-3H/pages/classSched.html'
            //             link.innerHTML = 'Click here';
            //             link.target = '_blank';
            //             txtNode = document.createTextNode("Your room is prepared just ");
            //             div.append(txtNode);
            //             div.append(link);
            //             chatBody.append(div);
            //         }
            //         else{
            //             txtNode = document.createTextNode("Can't find any room between the time you have entered");
            //             div.append(txtNode);
            //             chatBody.append(div);
            //         }
            //     })


            // }

            // if(action == 'none'){
            //     txtNode = document.createTextNode(response);
            //     div.append(txtNode);
            //     chatBody.append(div);
            // }
        }
        catch{            
            txtNode = document.createTextNode('An error has occured, please take a screenshot and contact an admin');
            div.append(txtNode);
            chatBody.append(div);
        }
        
    }
    else{
        txtNode = document.createTextNode(msg);
        div.append(txtNode);
        div.classList.add(classname);
        chatBody.append(div);
    }


}


// set yung scroll bar para lagi kita yung recent msg
function setScrollPos(){
    if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

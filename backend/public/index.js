var socket = io.connect("/")
const clientuser  = prompt("enter your name")
if(clientuser.length>0){
    socket.emit("join-app",clientuser)
}

socket.on("get-user",(user)=>{
    console.log(user)
    let chat = document.querySelector(".chats")
    if(user.length>0){
        user.map((e)=>{
            if(clientuser != user){

                const list = document.createElement("li");
                list.setAttribute("id",e)
                list.onClick = getchat()
                list.style = "background-color:rgb(203, 203, 203);list-style:none;height:45px;border-bottom:1px solid black;font-size:25px;padding-left:20px;padding-top:13px;cursor:pointer"
                list.textContent = e
                chat.append(list)
            }

    
    //   console.log(e)
    })

    
   }
})
function getchat(e){
alert("hey")
}
    document.getElementById("btn").click(function(){
        socket.emit("join-room",user,"hey",1)
    })
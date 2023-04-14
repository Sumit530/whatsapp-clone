import React, { useEffect, useState } from 'react'
//import "./chatpage.css"
import "font-awesome/css/font-awesome.min.css"
import {BsThreeDotsVertical} from "react-icons/bs"
import {BsPlusLg} from "react-icons/bs"
import {IoCallSharp} from "react-icons/io5"
import {BsFillCameraVideoFill} from "react-icons/bs"
import {BsEmojiSmile} from "react-icons/bs"
import {BsFillMicFill} from "react-icons/bs"
import {FaPaperPlane} from "react-icons/fa"
import io from "socket.io-client"
import { useCookies } from "react-cookie";
const socket = io.connect("http://localhost:7000")

const Chatpage = () => {
    const [cookie,setcookie] =  useCookies()
  const [stypmsg,setstypmsg] = useState(null)
  const [smsg,setsmsg] = useState([])
  const [rmsg,setrmsg] = useState()
  const [allusers,setallusers] = useState(null)
  const [useronline,setuseronline] = useState([])
  const [recentchat,setrecentchat] = useState(null)
  const [showindchat,setshowindchat] = useState(null)
  const typing = (e) =>{
    setstypmsg(e.target.value)
    
    socket.emit("typing",showindchat?.id)

  }
  
  const sendmsg = () =>{
  console.log(stypmsg)  
    setsmsg([...smsg,stypmsg])
console.log(showindchat?.id)
    if(stypmsg.length>0){
        socket.emit("sendmsg",{stypmsg,userid:sessionStorage.getItem("auth"),destid:showindchat?.id})
    }
    setstypmsg('')
  }
useEffect(()=>{
socket.emit("add-user",sessionStorage.getItem("auth"))
if(recentchat != null){
  console.log(recentchat)
  showchats({id:recentchat[0]._id,name:recentchat[0].username,profile:recentchat[0].profile}) 
}
},[])
socket.on("msg-recieve",(msg)=>{
  if(rmsg != null){

    setrmsg([...rmsg,msg])
  }
  else{
    setrmsg([msg])
  }
})
socket.on("userisonline",(userid)=>{
  setuseronline([...useronline,userid])
})

socket.on("usertyping",()=>{
})
  useEffect(()=>{

    const form  = new FormData()
    form.append("userid",sessionStorage.getItem("auth"))
     fetch(`${window.path}/getrecentchat`,{
      method:"post",
      body:form
    }).then((data)=>{

        data.json().then((res)=>{
          console.log(res)
          if(res.status == 1){
            setrecentchat(res.data)
          }
          else{
            setrecentchat(null)
          }
        })
    })
  },[socket])
  const getallusers = async() =>{
    document.getElementById("newchat").classList.toggle("hidden")
          await fetch(`${window.path}/getallusers`,{
            method:"post",
          }).then((data)=>{

            data.json().then((res)=>{

              if(res.status == 1){
                setallusers(res.data)
              }
              else{
                setallusers(null)
              }
            })
          }) 
  }

  const showchats =  async({id,name,profile})=>{
    const form  = new FormData()
    form.append("srcid",sessionStorage.getItem("auth"))
    form.append("destid",id)
    const data = await fetch(`${window.path}/getmsg`,{
      method:"post",
      body:form
    })
const res = await data.json()
if(res.status == 1){
  setshowindchat({
    id:id,
    name:name,
    profile:profile,
    oldchat : res.data
  })
}
else{
  setshowindchat({
    id:id,
    name:name,
    profile:profile
  })
}

  }

  return (
    <>
    <div className=' h-screen w-screen flex justify-center items-center p-10'>
      <div className='box w-2/3 h-full bg-white flex shadow-lg '>
        
      <div className='w-2/6 border-r-2 border-zinc-200 '>
      <div className=' absolute w-26% h-full top-10 left-80 pb-2 hidden ' id='newchat'>
          <div className='h-94% w-5/6 ml-6 bg-white border-r '>
          <div className='profile h-16 w-full bg-emerald-700 flex flex-row justify-between'>
          
            <h3 className='flex items-center h-full ml-5 hover:cursor-pointer' onClick={()=>{
              document.getElementById("newchat").classList.toggle("hidden")
            }}>Back</h3>
        </div>
      <div className='h-16 bg-slate-50 flex items-center justify-center' >
        <input type="text" className='border border-spacing-3 border-black h-10 w-96 rounded-lg '  placeholder='search..'/>
      </div>
      {
             allusers != null ? 
              allusers?.map((e)=>(
                <>
                
        <div className='users w-full hover:bg-slate-200 hover:cursor-pointer' onClick={()=>showchats({id:e._id,name:e.username,profile:e.profile})}>
          <div className='border-b h-20 flex items-center '>
            <div className='flex flex-row justify-between w-full' >
              <div className='flex flex-row items-center '>

            <div className='w-14 h-14 ml-4 flex  '>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' className='w-full h-full rounded-full '/>
        </div>
            <h5 className='ml-10 text-gray-600'>{e.username}</h5>
              </div>
        <div className='flex flex-row justify-between items-center mr-5 text-sm text-gray-400'>
              18:18
        </div>
            </div>
          </div>
        </div>
        </>
              ))
            :
            <>
            <div className='w-full h-full flex items-center justify-center'>
              <h4>No user </h4>
            </div>
            </>
            }
          </div>
          </div>
          <div className='profile h-16 w-full bg-emerald-700 flex flex-row justify-between'>
          <div className='w-12 h-12 ml-4 flex'>
            <div className='mt-2 w-full h-full'>

        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' className='w-full h-full rounded-full '/>
            </div>
        </div>
        <div className='flex flex-row justify-between items-center mr-5'>
          <BsPlusLg size={30}  className='mr-5 text-gray-900  hover:cursor-pointer' onClick={getallusers} />
          <BsThreeDotsVertical size={37}  className='text-gray-900  hover:cursor-pointer'/>
        </div>
        </div>
      <div className='h-16 bg-slate-50 flex items-center justify-center' >
        <input type="text" className='border border-spacing-3 border-black h-10 w-96 rounded-lg '  placeholder='search..'/>
      </div>
            {
             recentchat != null ? 
              recentchat?.map((e)=>(
                <>
                
        <div className='users w-full hover:bg-slate-200 hover:cursor-pointer' onClick={()=>showchats({id:e._id,name:e.username,profile:e.profile})}>
          <div className='border-b h-20 flex items-center '>
            <div className='flex flex-row justify-between w-full' >
              <div className='flex flex-row items-center '>

            <div className='w-14 h-14 ml-4 flex  '>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' className='w-full h-full rounded-full '/>
        </div>
            <h5 className='ml-10 text-gray-600 text-xl'>{e.username}</h5>
              </div>
        <div className='flex flex-row justify-between items-center mr-5 text-sm text-gray-400'>
              18:18
        </div>
            </div>
          </div>
        </div>
        </>
              ))
            :
            <>
            <div className='w-full h-full flex items-center justify-center'>
              <h4>No user </h4>
            </div>
            </>
            }
      </div>
      <div className='w-4/6 h-full'>
      <div className='profie h-16 w-full  flex'>
      <div className='profile h-16 w-full bg-emerald-700 flex flex-row justify-between'>
          <div className='flex '>

          <div className='w-12 h-12 ml-4 flex relative top-2'>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' className='w-full h-full rounded-full '/>
          </div>
        <div className='text-3xl ml-8 mt-3 font-serif '>{showindchat !=null ? showindchat?.name : ""}</div>
        </div>
        <div className='flex flex-row justify-between items-center mr-5'>
          <IoCallSharp size={30}  className='mr-10 text-gray-900  hover:cursor-pointer'/>
        <BsFillCameraVideoFill size={37}  className='text-gray-900  hover:cursor-pointer mr-6'/>

          <BsThreeDotsVertical size={37}  className='text-gray-900  hover:cursor-pointer'/>
        </div>
        </div>
      </div>
      <div className=' w-full h-full pb-16'>
        <div className='bg-bg-chat w-full h-full'>
        <div className='w-full h-95% '>
            {smsg != null 
            ? 
            smsg.map((e)=>(

            
            <div className='sender w-full h-14    float-right'>
              <div className=' mr-5 mt-3 float-right  max-w-sm'>
                <p className='p-2 rounded-xl bg-cyan-100   text-xl font-serif'>{e}</p>
              </div>
            </div>
            ))
            :""
            }
             {rmsg != null 
            ? 
            rmsg.map((e)=>(

            
            <div className='sender w-full h-14    float-right'>
              <div className=' ml-5 mt-3 float-left  max-w-sm'>
                <p className='py-2 px-3  rounded-xl bg-cyan-100   text-xl font-serif'>{e}</p>
              </div>
            </div>
            ))
            :""
            }
        </div>
        <div className=' h-16 bg-chat-bottom flex'>
          <div className='flex items-center m-2'>
            <BsEmojiSmile size={30}   />
          </div>
          <div className='w-3/4 flex items-center ml-2 '>
            <input type="text" onChange={typing} value={stypmsg} className='text-2xl h-12 rounded-md bg-white' />
          </div>
          <div className='flex items-center justify-between w-24 ml-6'>
          <BsFillMicFill size={30} />
          <FaPaperPlane size={30} onClick={sendmsg} />
          </div>
          <div>

          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    
    </div>

    </>
  )
}

export default Chatpage
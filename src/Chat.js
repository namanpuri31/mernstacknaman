import React, { useEffect, useState } from 'react'
import './App.css'
const Chat = ({ socket, username, userroom }) => {
  const [message, setMessage] = useState('')
  const [messagelist, setMessagelist] = useState([])

  const sendMessage = async () => {
    const time = new Date(Date.now()).getHours()
    const amorpm = time >= 12 ? 'pm' : 'am'
    if (message !== '' && username !== "" && userroom !== "") {
      const messageData = {
        name: username,
        room: userroom,
        message: message,
        time: (new Date(Date.now()).getHours()) % 12 + " : " + new Date(Date.now()).getMinutes() + " " + amorpm
      }
      await socket.emit('send_message', messageData)
      setMessagelist((list) => [...list, messageData])

    }
    else {
      alert("ENTER THE DATA COMPULSARY")
    }
    document.getElementById('clean').value = ''
  }

  useEffect(() => {
    socket.off("receive_message").on('receive_message', (data) => {
      setMessagelist((list) => [...list, data])
      // socket.on('receive_message',data.callee)
    })
  }, [socket])
  return (
    <>
      <div className='chat-window'>
        <div className="chat-header"><p>CHATS</p></div>
        <div className="chat-body">
          <div className="message-container">
          {messagelist.map((cuEle) => {
            return <div className='message'id={username===cuEle.name?'you':'other'}>
                      <div>
                        <div className="message-content">
                          <p>{cuEle.message}</p>
                        </div>
                        <div className="message-meta"style={{display:'flex',flexDirection:'column'}}>
                          <p>{cuEle.name}</p>
                          <p>{cuEle.time}</p>
                        </div>
                      </div>
                    </div>
          })}
          </div>
        </div>
        <div className="chat-footer">
          <input type="text" placeholder='Enter Text' id='clean' onChange={(e) => { setMessage(e.target.value) }}
            onKeyPress={((e) => {
              e.key === 'Enter' && sendMessage()
            })}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  )
}

export default Chat

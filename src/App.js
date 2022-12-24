import React, { useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect('http://localhost:3001')
function App() {
  const [username, setUsername] = useState('')
  const [userroom, setUserroom] = useState('')
  const [showchat, setShowchat] = useState(false)
  // const userdata={
  //   time:new Date(Date.now)
  // }

  const joinRoom = () => {
    if (username !== "" && userroom !== "") {
      socket.emit('join_room', userroom)
    }
    setShowchat(true)
  }

  return (
    <div className='App'>
      {!showchat ?
      (<div className="joinChatContainer">

      
        <div><h2>Naman's Chat</h2>
          <input type="text" placeholder='Enter your name' onChange={(e) => { setUsername(e.target.value) }} />
          <input type="text" placeholder='Room ID' onChange={(e) => { setUserroom(e.target.value) }} />
          <button onClick={joinRoom}>JOIN</button></div>
      </div> )
          
          :
          
          (<Chat socket={socket} username={username} userroom={userroom} />)} 
          
          


      
      
          
    </div>
    
  );
}

export default App;

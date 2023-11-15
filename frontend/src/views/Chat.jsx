import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://pvpqn2rj-3000.brs.devtunnels.ms/');

export const Chat = () => {
  
    const [username, setUsername] = useState('');
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [timer, setTimer] = useState(null);
    const [typingUser, setTypingUser] = useState('');
    const chatContent = useRef(null)
  
    const login = (e) => {
      e.preventDefault();
  
      setUsername(e.target[0].value);
    }
  
  
    const sendMessage = (e) => {
      e.preventDefault();
  
      if(!msg.trim()) return;
      socket.emit('msg', {username, msg});
  
      setMessages(prevMsg => [...prevMsg, {username, msg}]);
  
      setMsg('');
    }
  
    const typing = ()=>{
  
      if(!isTyping){
        socket.emit('typing', username);
        setIsTyping(true);
      }
  
      clearTimeout(timer);
  
      setTimer(setTimeout(()=>{
        socket.emit('stop_typing');
        setIsTyping(false);
      }, 1000));
    }
  
    
    useEffect(()=>{
  
      socket.on('history_chat', (data)=>{
        setMessages(data);
      })
  
      socket.on('typing', (data)=>{
        setTypingUser(data);
      })
  
      socket.on('stop_typing', ()=>{
        setTypingUser('');
      })
  
      socket.on('msg', (data)=>{
        setMessages(prevMsg => [...prevMsg, data]);
      })
  
      return ()=>{
        socket.off('history_chat');
        socket.off('msg');
      };
    },[])
  
    useEffect(()=>{
      if(chatContent.current){
        chatContent.current.scrollTop = chatContent.current.scrollHeight;
      }
    },[messages])
  
    return (
      <div className='container'>
            <div className='chat'>
              <div className='chat-content' ref={chatContent}>
                {messages.map((data, i) => (
                  <div key={i} className={data.username !== username ? 'received-msg' : 'me-msg'}>{`${data.username !== username ? `${data.username}:` : ''}`} {data.msg}</div>
                ))}
              </div>
                {typingUser && <div className='typing-text'>{typingUser} esta escribiendo...</div>}
              <div className='chat-footer'>
                <form onSubmit={sendMessage}>
                  <div className="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Escribe un mensaje" onKeyUp={typing} value={msg} onChange={({ target }) => setMsg(target.value)} />
                    <button className="btn btn-primary" type="submit">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
      </div>
    )
}

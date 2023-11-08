
import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import './app.css'

const socket = io('http://localhost:3000');

function App() {

  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [timer, setTimer] = useState(null);
  const [typingUser, setTypingUser] = useState('');

  const login = (e) => {
    e.preventDefault();

    setUsername(e.target[0].value);
  }


  const sendMessage = (e) => {
    e.preventDefault();

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
      console.log(data)
      setMessages(prevMsg => [...prevMsg, data]);
    })

    return ()=>{
      socket.off('history_chat');
      socket.off('msg');
    };
  },[])

  return (
    <div className='container'>

      {
        !username ?
          <div className='login'>
            <form onSubmit={login}>
              <div class="mb-3">
                <label htmlFor="login" class="form-label">Username</label>
                <input type="text" class="form-control" id="login" />
              </div>
              <button type='submit' className='btn btn-primary'>
                Ingresar
              </button>
            </form>
          </div>
          :
          <div className='chat'>
            <div className='chat-content'>
              {messages.map((data, i) => (
                <div key={i} className={data.username !== username ? 'received-msg' : 'me-msg'}>{`${data.username !== username ? `${data.username}:` : ''}`} {data.msg}</div>
              ))}
              {typingUser && <div className='typing-text'>{typingUser} esta escribiendo...</div>}
            </div>
            <div className='chat-footer'>
              <form onSubmit={sendMessage}>
                <div className="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Escribe un mensaje" onKeyUp={typing} value={msg} onChange={({ target }) => setMsg(target.value)} />
                  <button className="btn btn-primary" type="submit">Enviar</button>
                </div>
              </form>
            </div>
          </div>
      }
    </div>
  )
}

export default App

import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <span 
      id="server-status"
      style="color: red; font-weight: bold"
    >
      Offline
    </span>

    <br />

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>


    <ul id="clients-list"></ul>

    <form id="message-form">
      <input type="text" placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`

// connectToServer()

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) {
    return alert('Please provide a JWT token')
  }

  connectToServer(jwtToken.value.trim())
})

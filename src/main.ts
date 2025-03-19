import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <span id="server-status">offline</span>

    <ul id="clients-list"></ul>

    <form id="message-form">
      <input type="text" placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`

connectToServer()

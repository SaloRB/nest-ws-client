import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

  const socket = manager.socket('/')

  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const clientsList = document.querySelector<HTMLUListElement>('#clients-list')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!
  const messagesList =
    document.querySelector<HTMLUListElement>('#messages-list')!
  const serverStatusLabel =
    document.querySelector<HTMLSpanElement>('#server-status')!

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'online'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'offline'
  })

  socket.on('updated-clients', (clients: string[]) => {
    let clientsListHTML = ''
    clients.forEach((clientId) => {
      clientsListHTML += `<li>${clientId}</li>`
    })
    clientsList.innerHTML = clientsListHTML
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value.trim().length <= 0) return

    socket.emit('message-from-client', {
      id: 'YO',
      message: messageInput.value,
    })

    messageInput.value = ''
  })

  socket.on(
    'message-from-server',
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
        <li>
          <strong>${payload.fullName}</strong>
          <span>${payload.message}</span>
        </li>
      `

      const li = document.createElement('li')
      li.innerHTML = newMessage

      messagesList.append(li)
    }
  )
}

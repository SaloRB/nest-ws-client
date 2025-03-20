import { Manager, Socket } from 'socket.io-client'

let socket: Socket

export const connectToServer = (token: string) => {
  const manager = new Manager('https://nest-teslo-shop.up.railway.app/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token,
    },
  })

  socket?.removeAllListeners()
  socket = manager.socket('/')

  addListeners()
}

const addListeners = () => {
  const clientsList = document.querySelector<HTMLUListElement>('#clients-list')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput =
    document.querySelector<HTMLInputElement>('#message-input')!
  const messagesList =
    document.querySelector<HTMLUListElement>('#messages-list')!
  const serverStatusLabel =
    document.querySelector<HTMLSpanElement>('#server-status')!

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = '✅ Online'
    serverStatusLabel.style.color = 'green'
    serverStatusLabel.style.fontWeight = 'bold'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = '❌ Offline'
    serverStatusLabel.style.color = 'red'
    serverStatusLabel.style.fontWeight = 'bold'
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

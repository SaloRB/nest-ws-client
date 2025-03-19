import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

  const socket = manager.socket('/')

  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status')!
  const clientsList = document.querySelector('#clients-list')!

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
}

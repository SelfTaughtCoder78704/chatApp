// Make connection
const socket = io.connect('http://localhost:4000');

// Get dom elements
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit Events

btn.addEventListener('click', () => {
    
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = ''
   
}) // Now go back to server side and handle the data

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value) // Go back to server side and implement
   

})

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    
    output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`
})

// Listen for typing message
socket.on('typing', (data) => {
    
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})
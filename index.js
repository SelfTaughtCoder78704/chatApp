const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 4000;
const nodemailer = require('nodemailer');
// App setup
const app = express();
const server = app.listen(port, () => {
    console.log('Server started on port 4000')
})

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) =>{
    console.log('Connected to socket', socket.id) //Now setup on the front end with CDN
    // Now handling front end data chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
        
    })
    


    // handling someone is typing 
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data) // Go to front and handle listening for this
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bobbynicholson78704@gmail.com',
                pass: 'Whiteboy78704'
            }
        });
    
        let mailOptions = {
            from: 'bobbynicholson78704@gmail.com',
            to: 'bobbynicholson78704@gmail.com',
            subject: 'chatapp',
            text: 'New Message from http://localhost:4000'
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
            } else{
                console.log('Message Sent' + info.response)
            }
        })
    })

    
    
})  

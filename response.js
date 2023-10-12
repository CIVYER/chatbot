const express = require('express');
var cors = require('cors')
const spawn = require('child_process').spawn;


const app = express();
const port = process.env.PORT || 9999;

//app.use(cors({ origin: ['http://localhost:9999', 'http://apichat-m56p.onrender.com', 'https://apichat-m56p.onrender.com'], credentials: true }))

app.use(cors());

app.get('/', (req, res) => {
    const userMessage = req.query.message; // Retrieve the user's message from the query string
    const chatbot = spawn('python',['./chatbot.py', userMessage]);
    let botResponse = '';

    chatbot.stdout.setEncoding('utf8');
    chatbot.stdout.on('data', (data)=>{
        botResponse += data;
    })

    chatbot.on('close', (code)=>{
        res.send(botResponse);
    })

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

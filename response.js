const express = require('express');
const spawn = require('child_process').spawn;


const app = express();
const port = 9999;

app.use(express.static("../chatbot"));

app.get('/chatbot', (req, res) => {
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

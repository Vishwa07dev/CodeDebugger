/**
 * This file has the logic for the backend
 */
const express  = require('express');
const bodyParser = require('body-parser');
const openAIApi = require('openai');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());


/**
 * Make a connection with OpenAI
 */
const openai = new openAIApi({
    apiKey : "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"
})


/**
 * Create the API Backend for debugging the code
 */
app.post("/debug", async (req, res)=>{

     const {code , language } = req.body ;

     /**
      * Make a call to openAI  to debug the code 
      * 
      */
     try{
        const response = await openai.chat.completions.create({
            model : 'gpt-4',
            message : [
                {
                    role : 'system',
                    content : `You are a code debugging assistant specializing in ${language}`
                },
                {
                   role : 'user',
                   content : `Please debug the following ${language} code:\n\n${code}`
                }
            ]
        });
        const result = response.choices[0].message.content;
        res.json({result});
     }catch(err){
        console.log(err);
        res.statusCode(500).json({
            error: 'Something went wronng'
        })
     }

})

app.listen(8080, ()=>console.log("Server started on the port num 8080"));
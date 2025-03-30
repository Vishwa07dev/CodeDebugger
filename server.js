const express = require('express');
const bodyParser = require('body-parser');
const openAIApi = require('openai');


const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));


const openai = new openAIApi({
    apiKey : "PUT Your SECRET CODE HERE"
})

/**
 * Create the API endpoint for code debugging
 */
app.post("/debug", async (req, res)=>{
    const { code, language} = req.body;

    //Make a call to openAI to debug the code
    try{
        const response = await openai.chat.completions.create({
            model : 'gpt-4',
            messages : [
                {
                    role : 'system',
                    content : `you are a code debugging assistant specializing in ${language}.`
                },
                {
                    role : 'user',
                    content : `Plese debug the following ${language} code:\n\n${code} `
                }
            ]

        });
        const result = response.choices[0].message.content;
        res.json({result});
    }catch( err){
        console.error(err);
        res.statusCode(500).json({
            error : "Something went wrong"
        })
    }
})


app.listen(8080, ()=>console.log("server started on port 8080"))
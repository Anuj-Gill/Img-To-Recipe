const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
const upload = multer(); // Initialize multer

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('hii')
})

app.post('/backend/recipe',upload.single('image') ,async (req,res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageBuffer = req.file.buffer;

    function fileToGenerativePart(buffer, mimeType) {
        return {
            inlineData: {
                data: buffer.toString('base64'),
                mimeType
            },
        };
    }

      async function run() {
        // For text-and-image input (multimodal), use the gemini-pro-vision model
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      
        const prompt = `You will receive an image file from the user, containing a photograph of the ingredients they have available.
        The image will have all ingredients clearly visible and identifiable.
        The ingredients may include vegetables, fruits, meats, grains, spices, and other food items typically used in cooking.
        Extract relevant features from each ingredient, such as shape, color, texture, and size. Also keep in mind that i will be displaying the output on my website. So return in html in designed way so it looks good on the website. Make sure you always return html, not markdown every time. 
        Also if you don't see any ingredient(like if you see any human face), then say Please provide an image of ingredients.
        
        Output:
        
        Generate a recommended recipe and explain it in detail based on only the analyzed ingredients and user preferences, if provided.
        Provide details for each recommended recipe, including the name, ingredients, cooking instructions, and estimated preparation time.
        Present the recommended recipes in a user-friendly format, such as a ranked list or interactive interface.
        
        Output will be in the form don't add anything else
        
        Recipe name
        
        List of Ingredients
        
        Instructions

        `;
      
        const imagePart = fileToGenerativePart(imageBuffer, req.file.mimetype);
      
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        res.json({recipe: text})
        console.log(text);
      }
      
      run().catch(err => {
        console.error('Error generating recipe:', err);
        res.status(500).json({ error: 'Error generating recipe' });
    });

})

app.listen(3000)

const mongoose = require('mongoose')
mongoose.connect(process.env.mongodburl,
            {useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify:false,
            useCreateIndex:true,
            retrywrites:false
        } 
)
const contactSchema = new mongoose.Schema({
    name:{
        type:String, 
        required: true 
    },
    email:{
        type:String, 
        required: true  
    },
    phone:{
        type:String, 
        required: true  
    },
    company:{
        type:String,
        required: true   
    },
    message:{
        type:String,  
        required: true 
    },

}) 

Contact = mongoose.model('contact',contactSchema)


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const responseMessage = (req.body);

    const contactData = {}
    contactData.name = responseMessage.name;
    contactData.email = responseMessage.email;
    contactData.phone = responseMessage.phone;
    contactData.company = responseMessage.company;
    contactData.message = responseMessage.message;
    try {
        const doc = await Contact.create(contactData) 
        console.log(`Processing: ${responsemessage.name}`)
        context.res.status(201).json({ data: doc })
    } catch (error) {
        console.error(error)
      context.res.status(400).end()
    }
    
    

}
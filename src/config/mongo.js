const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kilapin:Ifvu1ovfqbhXFTRE@cluster0.oucnaua.mongodb.net/kilapin')
.then(() => {
    console.log('Connected!')
}).catch((error) => {
    console.log(error)
})
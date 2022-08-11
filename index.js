import { express, app } from './src/app';
import 'dotenv/config';

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/main.html");
})

app.listen(PORT, function() {
    console.log("start server! port number : 3000");
})

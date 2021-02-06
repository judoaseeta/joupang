const path = require('path');
const express = require('express');
const app = express();

app.use("/static",express.static(path.resolve(__dirname, "frontend", "static")));
app.use('/fontawesome', express.static(path.resolve(__dirname,'node_modules','@fortawesome','fontawesome-free')));
app.use('/io', express.static(path.resolve(__dirname,'node_modules','intersection-observer')));
app.get('*',(req,res) => {
    res.sendFile(path.resolve('frontend',"index.html"));
})
app.listen(3000);
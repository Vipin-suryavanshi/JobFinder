import app from "./app.js";

const port = process.env.PORT || 3500
app.listen(port, ()=>{
    console.log(`server connection establish at ${port}`);
})

const express= require("express")
const path= require("path")
const fs= require("fs")

const notesdata=require("./db/db.json")
const port= process.env.port || 3000;
const app= express()
app.use(express.static("public"))
// app.get("/api/notes", (req,res)=>{
//     res.json(notesdata.slice(1))
// })
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/api/notes",(req,res)=>{
    res.send(notesdata)
    
})

function makeNewNote(body,notesList){
    const newNote=body
    const maxId=100
    if(!Array.isArray(notesList)){
        notesList=[]
    }

    if(notesList.length==0){
        notesList.push(0)
    }
    newNote.id=maxId+1
    notesList[0]++
    notesList.push(newNote)
    fs.writeFileSync(
        path.join(__dirname,"./db/db.json"),
        JSON.stringify(notesList,null,2)
    )
    return newNote

    
}
app.post("/api/notes",(req,res)=>{
    const newNote=makeNewNote(req.body,notesdata)
    res.json(newNote)

    


})




app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})



app.listen(port,()=>{
 console.log("server is listening on port 3000")
})








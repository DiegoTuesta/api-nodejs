const express = require('express');
const db = require('./src/utils/databases');
const Todo = require('./src/models/todos.model');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.DB_PORT_SERVER ?? 8000;


Todo;
db.authenticate().then(() => console.log('Database conected'))
.catch(console.error)

db.sync();
const app = express();

app.use(express.json());
app.use(cors());
//metodo para crear todo
app.post("/todos", async (req, res)=> {
    try {
        const newTodo = req.body;
        const toDo = await Todo.create(newTodo);

        res.status(201).json(toDo)

    } catch (error) {
        res.status(400).json(error)
    }
});

//metodo para listar all todos
app.get("/", async(req, res)=> {
    try {
        res.status(200).send('Servidor Run');
    } catch (error) {
        res.status(400).json(error)
    }
});

//metodo para listar all todos
app.get("/todos", async(req, res)=> {
    try {
        const toDos = await Todo.findAll();
        res.status(200).json(toDos);
    } catch (error) {
        res.status(400).json(error)
    }
});


//metodo para listar 1 todo
app.get("/todos/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const toDo = await Todo.findByPk(id);
        res.status(200).json(toDo);
    } catch (error) {
        res.status(400).json(error)
    }
});

//metodo para update
app.put("/todos/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        const {title,status} = req.body;
        if (title) {
            await Todo.update({title}, {
                where: {id}
            });
        }else if(status){
            await Todo.update({status}, {
                where: {id}
            });
        }else if(title && status){
            await Todo.update({title, status}, {
                where: {id}
            });
        }else{
            res.status(400).json({info:'ingrese datos a actualizar'})
            return
        }
       
        res.status(200).json({status:'correct'})
    } catch (error) {
        res.status(400).json(error)
    }
});

app.delete("/todos/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        await Todo.destroy({
            where:{
                id
            }
        });
        res.status(200).json({status:'correct'})
    } catch (error) {
        res.status(400).json(error)
    }
})



app.listen(PORT, ()=> {
    console.log("Server Conected")
})

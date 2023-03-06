import express from "express";
import fs from "fs";
import { TodoType } from "./domain/todoType";
import cors from "cors";

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ugfmofswoxbczfvyncko.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZm1vZnN3b3hiY3pmdnluY2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyOTUyMjMsImV4cCI6MTk5Mjg3MTIyM30.WNiqWEK8UTApgcskksaC1MQGl6AIH-1ob4n7dnNUFi4')


const app = express();
app.use(express.json());
app.use(cors());

app.get("/hello", function (req, res){
    res.send("hello");
});

app.get("/todos", function(req, res){
    const todos = fs.readFileSync("./todos.json");
    res.send(todos);
});

//test
app.post("/test", async function(req, res){
    const what = req.body.what;
    const { error } = await supabase
  .from('counties')
  .insert({name: what });
  res.send("supabase");
});

app.get("/test", async function(req,res){
    try {
        const { data, error } = await supabase
            .from('counties')
            .select()
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from Supabase" });
        } else {
            console.log(data);
            res.send(data); // send the value of the "name" field from the first returned row
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Unexpected error" });
    }
})

app.post("/todos", function(req, res){

    const what = req.body.what;
    const when = req.body.when;
    

    // try {
    //     validateUserInput(name,platform,year,genre,esrb,good);
    // } catch (e) {
    //     res.status(404).send({
    //         error: e.message,
    //     });
    //     return
    // }

    const todo: TodoType = {
        what: what,
        when: when,
    };

    const todos = JSON.parse(fs.readFileSync("./todos.json") as any as string);
    todos.push(todo);
    fs.writeFileSync("./todos.json", JSON.stringify(todos));
    res.send(todos);
});

app.listen("3002");


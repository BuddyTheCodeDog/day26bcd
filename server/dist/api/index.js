"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const supabase_js_1 = require("@supabase/supabase-js");
// Create a single supabase client for interacting with your database
const supabase = (0, supabase_js_1.createClient)('https://ugfmofswoxbczfvyncko.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZm1vZnN3b3hiY3pmdnluY2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyOTUyMjMsImV4cCI6MTk5Mjg3MTIyM30.WNiqWEK8UTApgcskksaC1MQGl6AIH-1ob4n7dnNUFi4');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/hello", function (req, res) {
    res.send("hello");
});
app.get("/todos", function (req, res) {
    const todos = fs_1.default.readFileSync("./todos.json");
    res.send(todos);
});
//test
app.post("/test", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const what = req.body.what;
        const { error } = yield supabase
            .from('counties')
            .insert({ name: what });
        res.send("supabase");
    });
});
app.get("/test", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from('counties')
                .select();
            if (error) {
                console.log(error);
                res.status(500).send({ error: "Error retrieving data from Supabase" });
            }
            else {
                console.log(data);
                res.send(data); // send the value of the "name" field from the first returned row
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ error: "Unexpected error" });
        }
    });
});
app.post("/todos", function (req, res) {
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
    const todo = {
        what: what,
        when: when,
    };
    const todos = JSON.parse(fs_1.default.readFileSync("./todos.json"));
    todos.push(todo);
    fs_1.default.writeFileSync("./todos.json", JSON.stringify(todos));
    res.send(todos);
});
app.listen("3002");

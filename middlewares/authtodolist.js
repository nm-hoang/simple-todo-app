const Todos = require('../services/todos');

function authtodo(req, res, next) {
    if (req.session.todolist !== null) {
        res.locals.todolist = req.session.todolist;
    } else {
        res.locals.todolist = [];
    }

    const todo = req.body.todo;
    if (todo) {
        Todos.add(todo);
    }

    req.todolist = Todos.findAll();
    req.session.todolist = Todos.findAll();
    res.locals.todolist = req.session.todolist;

    next();
}

module.exports = authtodo;
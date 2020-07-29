const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./user')
const datenow  = new Date().toISOString().slice(0, 19).replace('T', ' ');

const Model = Sequelize.Model;
class Todo extends Model{
    async markAsDone(){
        this.done = true;
        return this.save();
    }
    static async findAllNotDone(userId){
        return Todo.findAll({
            where:{
                done: false,
                userId,
            }
        });
    }
  static  async findById(id){
        return Todo.findByPk(id);
    }

  
  static  async add(name,idUser){

       return Todo.create({name, done: false,datenow,datenow,userId: idUser});
    }
}

Todo.init({
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
    done: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,

    },
  }, {
    sequelize: db,
    modelName: 'todo',
    // options
  });

User.hasMany(Todo);
Todo.belongsTo(User);


module.exports = Todo;



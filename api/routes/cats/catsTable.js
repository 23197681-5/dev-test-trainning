const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../../dao/configDB')
class CatsTable extends Model {}

CatsTable.init({
    name:{
        type: DataTypes.STRING,
        // allowNull: false
    },
    years: {
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    purring:{
        type: DataTypes.BOOLEAN,
        // allowNull: false
    }
    //TODO:
}, {
    sequelize,
    modelName: 'cats'
}
);
module.exports = CatsTable;
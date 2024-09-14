const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Diary extends Model {}

Diary.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date_created: {
            type: DataTypes.STRING,
            allowsNull: false,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        mood_id: {
            type: DataTypes.INTEGER,
           allowsNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
          polarity: {
            type: DataTypes.FLOAT,
            allowNull: true,
          },
          label: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          time_stamp: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'diary',
      }
);

module.exports = Diary;


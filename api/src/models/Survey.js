const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Survey', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}
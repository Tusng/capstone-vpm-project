require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists properties;

            CREATE TABLE properties(
                property_id SERIAL PRIMARY KEY,
                address VARCHAR(40) NOT NULL,
                city VARCHAR(20) NOT NULL,
                state VARCHAR(10) NOT NULL,
                zipCode VARCHAR(10) NOT NULL,
                status VARCHAR(20) NOT NULL
            );
        `).then(() => {
            console.log('Property Table Created!');
            res.sendStatus(200);
        }).catch(err => console.log('error creating property table', err))
    },

    createProperties: (req, res) => {
        let { address, city, state, zipCode, propertyStatus } = req.body

        sequelize.query(`
        insert into properties (address, city, state, zipCode, status)
        values ('${address}', '${city}', '${state}', '${zipCode}', '${propertyStatus}')
        `)
    },

    getProperties: (req, res) => {
        sequelize.query(`SELECT * from properties`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },

    deleteProperty: (req, res) => {
        let { id } = req.params;

        sequelize.query(`
        DELETE
        FROM properties
        WHERE property_id = ${id}
        `)
            .then((dbRes) => {
                res.status(200).send(dbRes[0]);
            })
            .catch(err => console.log(err))
    }
}
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *  FROM sponsors LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getNextID(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = "sponsors"');
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function postSponsor(name) {
    if (!name) {
        throw new Error("The 'name' parameter is required");
    }

    try {
        const sql = `INSERT INTO sponsors (name) VALUES (?)`;
        const result = await db.query(sql, [name]); // Pasar el valor como parámetro

        return result;
    } catch (error) {
        console.error(`Error inserting data into sponsors:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
    }
}




module.exports = {
    getMultiple,
    getNextID,
    postSponsor
}
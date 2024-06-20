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
        throw error;
    }
}

async function removeSponsor(id) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }

    try {
        const sql = `DELETE FROM sponsors WHERE id = ?`
        const result = await db.query(sql, [id]);

        return result;
    } catch (error) {
        if (error.sqlState == '23000') {
            const sql = `UPDATE positions SET sponsor_id = null WHERE sponsor_id = ?`;
            const result = await db.query(sql, [id]);
            removeSponsor(id);
        }else{
            // console.error(error);
            console.error(`Error removing data into sponsors:`, error.message);
            throw error;
        }
    }
}





module.exports = {
    getMultiple,
    getNextID,
    postSponsor,
    removeSponsor
}
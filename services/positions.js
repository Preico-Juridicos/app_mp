const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *  FROM positions LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function updatePositionSponsor(id, sponsor_id) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }
    if (!sponsor_id) {
        throw new Error("The 'sponsor_id' parameter is required");
    }

    try {

        const sql = `UPDATE positions SET sponsor_id = ? WHERE id = ?`;
        const result = await db.query(sql, [sponsor_id, id]);

        return result;
    } catch (error) {
        console.error(`Error inserting sponsor into positions:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
    }
}


async function removePositionSponsor(id) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }

    try {

        const sql = `UPDATE positions SET sponsor_id = null WHERE id = ?`;
        const result = await db.query(sql, [id]);

        return result;
    } catch (error) {
        console.error(`Error removing sponsor into positions:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
    }
}



module.exports = {
    getMultiple,
    updatePositionSponsor,
    removePositionSponsor
}
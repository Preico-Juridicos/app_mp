const db = require('./db');
const helper = require('../helper');

async function getCanva() {
    const rows = await db.query(`SELECT *  FROM canvas`);
    const data = helper.emptyOrRows(rows);
    return { data }
}

async function getCanvaByName(name) {
    const rows = await db.query(`SELECT *  FROM canvas WHERE name = ?`, [name]);
    const data = helper.emptyOrRows(rows);
    if (data != []) {
        // console.log(data[0]);
        return { data: data[0] }
    }
    return { data }
}


async function updateCanvaData(id, data) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }
    if (!data) {
        throw new Error("The 'data' parameter is required");
    }

    try {

        const sql = `UPDATE canvas SET canvaData = ? WHERE id = ?`;
        const result = await db.query(sql, [data, id]);

        return result;
    } catch (error) {
        console.error(`Error inserting sponsor into positions:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
    }
}

async function updateSponsorData(id, data) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }
    if (!data) {
        throw new Error("The 'data' parameter is required");
    }

    try {

        const sql = `UPDATE canvas SET sponsorsData = ? WHERE id = ?`;
        const result = await db.query(sql, [data, id]);

        return result;
    } catch (error) {
        console.error(`Error inserting sponsor into positions:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
    }
}


module.exports = {
    getCanva,
    getCanvaByName,
    updateCanvaData
}
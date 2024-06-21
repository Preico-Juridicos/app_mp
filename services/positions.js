const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *  FROM positions`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *  FROM positions`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function postPosition(position_name, section, coords, left, top) {
    if (!position_name) {
        return res.status(400).json({ error: "The 'position_name' field is required" });
    }

    if (!section) {
        return res.status(400).json({ error: "The 'section' field is required" });
    }

    if (!coords) {
        return res.status(400).json({ error: "The 'coords' field is required" });
    }
    if (!left) {
        return res.status(400).json({ error: "The 'left' field is required" });
    }

    if (!top) {
        return res.status(400).json({ error: "The 'top' field is required" });
    }


    try {
        const sql = `INSERT INTO positions (position_name, section, coords, text_left, text_top) VALUES ( ?,?,?,? ,? )`;
        const result = await db.query(sql, [position_name, section, coords, left, top]);

        return result;
    } catch (error) {
        console.error(error);
        console.error(`Error inserting data into positions:`, error.message);
        throw error;
    }
}

async function removePosition(id) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }

    try {
        const sql = `DELETE FROM positions WHERE id = ?`
        const result = await db.query(sql, [id]);
        // console.log(sql);
        // console.log(result);
        return result;
    } catch (error) {
        // if (error.sqlState == '23000') {
        //     const sql = `DELETE FROM sections WHERE section = ?`;
        //     const result = await db.query(sql, [id]);
        //     removeSponsor(id);
        // } else {
        // console.error(error);
        console.error(`Error removing data from sections:`, error.message);
        throw error;
        // }
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
    postPosition,
    removePosition,
    updatePositionSponsor,
    removePositionSponsor
}
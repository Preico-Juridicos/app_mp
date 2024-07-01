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


async function postPosition(id_canva, position_data, section_color, section_id) {

    if (!id_canva) {
        return res.status(400).json({ error: "The 'id_canva' field is required" });
    }
    if (!position_data) {
        return res.status(400).json({ error: "The 'position_data' field is required" });
    }
    if (!section_color) {
        return res.status(400).json({ error: "The 'section_color' field is required" });
    }
    if (!section_id) {
        return res.status(400).json({ error: "The 'section_id' field is required" });
    }


    try {

        const sql = `INSERT INTO positions (id_canva, position_data, section_color, section_id) VALUES (?,?,?,?)`;
        const result = await db.query(sql, [id_canva, position_data, section_color, section_id]);

        return result;
    } catch (error) {
        console.error(error);
        console.error(`Error inserting data into positions:`, error.message);
        throw error;
    }
}

async function removePosition(position_data) {
    if (!position_data) {
        throw new Error("The 'position_data' parameter is required");
    }

    try {
        const sql = `DELETE FROM positions WHERE position_data = ?`
        const result = await db.query(sql, [position_data]);
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

async function removePositionById(id) {
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


async function updatePosition(id, position_data_new) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }
    if (!position_data_new) {
        throw new Error("The 'position_data_new' parameter is required");
    }

    try {

        const sql = `UPDATE positions SET position_data = ? WHERE id = ?`;
        const result = await db.query(sql, [position_data_new, id]);

        return result;
    } catch (error) {
        console.error(`Error updating position data:`, error.message);
        throw error; // Re-lanzar el error para que el controlador lo maneje
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
        console.error(`Error updating sponsor into positions:`, error.message);
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
    removePositionById,
    updatePosition,
    updatePositionSponsor,
    removePositionSponsor
}
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *  FROM sections ORDER BY sections.price DESC LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function getMultipleByType(type = 'bike', page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM sections WHERE type = '${type}' ORDER BY sections.price DESC LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}



async function postSection(color, price, type) {
    if (!color) {
        return res.status(400).json({ error: "The 'color' field is required" });
    }

    if (!price) {
        return res.status(400).json({ error: "The 'price' field is required" });
    }

    if (!type) {
        return res.status(400).json({ error: "The 'type' field is required" });
    }

    try {
        const sql = `INSERT INTO sections (color, price, type) VALUES (?, ? ,?)`;
        const result = await db.query(sql, [color, price, type]);

        return result;
    } catch (error) {
        console.error(`Error inserting data into sections:`, error.message);
        throw error;
    }
}

async function removeSection(id) {
    if (!id) {
        throw new Error("The 'id' parameter is required");
    }

    try {
        const sql = `DELETE FROM sections WHERE id = ?`
        const result = await db.query(sql, [id]);

        const sql2 = `DELETE FROM positions WHERE section = ?`;
        const result2 = await db.query(sql2, [id]);

        return result2;
    } catch (error) {
        console.log(error);
        if (error.sqlState == '23000') {
            const sql = `DELETE FROM positions WHERE section = ?`;
            const result = await db.query(sql, [id]);
            removeSponsor(id);
        } else {
            // console.error(error);
            console.error(`Error removing data from sections:`, error.message);
            throw error;
        }
    }
}


module.exports = {
    getMultiple,
    getMultipleByType,
    postSection,
    removeSection
}
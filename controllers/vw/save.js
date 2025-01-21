const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig');
const bcrypt = require('bcrypt');


const saveusuario = async (req, res) => {
    console.log(req);

    // Encriptar la contraseña
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.password, 10); // 10 es el número de salt rounds
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });
    }

    // Crear la conexión a la base de datos
    const connection = await mysql.createConnection(dbConfig.config.connectionConfig);

    try {
        const [results] = await connection.execute(
            'INSERT INTO u943042028_registro.tb_web_usuriosvw_reg_01' +
            '(fecha, nombre, apellido_paterno, apellido_ma, email, password, ciudad, sucursal, estatus, fecha_actualizacion, usuario, id_clave) ' +
            'VALUES(CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP(), ?, 1);',
            [ req.nombre, req.apeido_paterno, req.apeido_materno, req.correo, hashedPassword, req.ciudad, req.sucursal, req.usuario]
        );

        const insertId = results.insertId;
        await connection.end();

        let resultado = {
            tabla: "tb_wap_web_usuriosvw_reg_01",
            status: "CORRECTO",
            mensaje: "Se inserto correctamente",
            id: insertId,
        };

        return resultado;

    } catch (error) {
        await connection.end();
        console.error('Error al guardar el usuario:', error);
        return res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
    }
  };

module.exports = {
    saveusuario
};

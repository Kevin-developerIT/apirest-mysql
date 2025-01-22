



async function getEmail(data) {
    console.log(data.correo);
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
id_usuario
,DATE_FORMAT(fecha, "%Y-%m-%d %H:%i:%s") AS fecha
,nombre
,apellido_paterno
,apellido_ma
,email
,ciudad
,sucursal
,estatus
,fecha_actualizacion
FROM u943042028_registro.tb_web_usuriosvw_reg_01
WHERE estatus = 1 AND email = ?
        `;
        const values = [data.correo];

        connection.query(query, values, function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getEmail
}

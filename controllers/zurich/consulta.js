
async function getConteoVotos(req, res) {
    //console.log(data)
    const connection = require('../../dbconfig');

    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT 
    COUNT(*) AS total_registros,
    SUM(CASE WHEN campania = 'SALUD POR ELLA' THEN 1 ELSE 0 END) AS total_salud_por_ella,
    SUM(CASE WHEN campania = 'POR UN FUTURO BRILLANTE' THEN 1 ELSE 0 END) AS total_por_un_futuro_brillante,
    SUM(CASE WHEN campania = 'RENACIENDO NUESTRA CIUDAD' THEN 1 ELSE 0 END) AS total_renaciendo_nuestra_ciudad
FROM u943042028_registro.tb_web_zurichsv_reg_01;;`, 
            function(error, results, fields) {
                if (error) reject(error);
                resolve(results);                
            }
        );
    });
}






module.exports = {
    getConteoVotos
}






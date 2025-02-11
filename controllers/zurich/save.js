const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig');
const bcrypt = require('bcrypt');


const savevoto = async (req, res) => {
const {campania, seguro, edad, sexo} = req;
  console.log(campania, seguro, edad, sexo);

   // Crear la conexión a la base de datos
   const connection = await mysql.createConnection(dbConfig.config.connectionConfig);

   try {
       const [results] = await connection.execute(
           'INSERT INTO u943042028_registro.tb_web_zurichsv_reg_01 ' +
           '(fecha, campania, seguro, edad, sexo, id_web, fecha_actualizacion, usuario) ' +
           'VALUES(CURRENT_TIMESTAMP(), ?, ?, ?, ?, 2, CURRENT_TIMESTAMP(), NULL);',
            [campania, seguro, edad, sexo] //  
       );

       const insertId = results.insertId;
       await connection.end();

       let resultado = {
           tabla: "tb_web_zurichsv_reg_01",
           status: "CORRECTO",
           mensaje: "Se inserto correctamente",
           id: insertId,
       };

       console.log(resultado)
       return resultado;

   } catch (error) {
       await connection.end();
       console.error('Error al guardar el usuario:', error.message);
       return res.status(500).json({ success: false, message: 'Error al guardar el voto', error: error.message });
   }
    //const filePath = path.join(__dirname, '../../archivos/regart', req.file.filename);
    //const fileName = req.file.originalname;
  
   /* fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      const sql = 'INSERT INTO u943042028_registro.tb_web_usuarios_reg_01 ' +
            '(fecha, nombre, apeidos, edad, escuela, telefono, region, email, archivo, estatus_usuario, estatus_proceso, comentario, id_web, fecha_actualizacion, como_se_entero, data) ' +
            'VALUES (CURRENT_TIMESTAMP(), ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, 1, CURRENT_TIMESTAMP(), ?,?);';
      dbConfig.query(sql, [req.body.nombre, req.body.apeidos, req.body.edad, req.body.escuela, req.body.telefono, req.body.region, req.body.email, fileName, req.body.comentario, req.body.conociendo, data], (err, result) => {
        if (err) {
          console.error('Error insertando en la base de datos:', err);
          return res.status(500).send('Error interno del servidor');
        }
  
        console.log('Archivo guardado en la base de datos con ID:', result.insertId);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error eliminando el archivo temporal:', err);
          }
          // Asegúrate de enviar la respuesta dentro del callback de fs.unlink
          
           res.json(result.insertId);
        });
      });
    });*/
  };



module.exports = {
    savevoto
};

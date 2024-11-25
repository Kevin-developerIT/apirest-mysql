const fs = require('fs');
const path = require('path');

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbconfig');
const bcrypt = require('bcrypt');


const saveclave = async (req, res) => {
    const {clave} = req;
      console.log( clave);
    
       // Encriptar la contraseña
       let hashedPassword;
       try {
           hashedPassword = await bcrypt.hash(clave, 10); // 10 es el número de salt rounds
       } catch (error) {
           console.error('Error al encriptar la contraseña:', error);
           return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });
       }
    
       // Crear la conexión a la base de datos
       const connection = await mysql.createConnection(dbConfig.config.connectionConfig);
    
       try {
           const [results] = await connection.execute(
               'INSERT INTO u943042028_registro.tb_web_clave_reg_01 ' +
               '(fecha, id_web, clave, fecha_actualizacion, usuario) ' +
               'VALUES(CURRENT_TIMESTAMP(), 3, ?, CURRENT_TIMESTAMP(), "veyraabram@gmail.com");',
      [hashedPassword] //  [hashedPassword]
           );
    
           const insertId = results.insertId;
           await connection.end();
    
           let resultado = {
               tabla: "tb_web_usuarios_adm_reg_01",
               status: "CORRECTO",
               mensaje: "Se inserto correctamente",
               id: insertId,
           };
    
           console.log(resultado)
           return resultado;
    
       } catch (error) {
           await connection.end();
           console.error('Error al guardar el usuario:', error.message);
           return res.status(500).json({ success: false, message: 'Error al guardar el usuario', error: error.message });
       }
        
      };


      module.exports = {
        saveclave
    };
    
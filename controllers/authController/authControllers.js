// controllers/authController.js

const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../../dbconfig2'); // Ajusta la ruta según donde esté ubicado dbconfig.js

const secretKey = process.env.PASSWORD_SECRET; // Cambia esto por una clave segura

exports.loginContrasenia = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT email, password FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Respuesta exitosa si la contraseña es correcta
        res.status(200).json({ message: 'Password is correct' });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.loginContraseniavw = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT email, password FROM u943042028_registro.tb_web_usuriosvw_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Respuesta exitosa si la contraseña es correcta
        res.status(200).json({ message: 'Password is correct' });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_usuario, nombre, apeidos, email, password, estatus_proceso, data FROM u943042028_registro.tb_web_usuarios_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Determinar el valor de data basado en si el campo data es null o no
        const dataStatus = user.data !== null ? 1 : 0;

        // Generar el token, incluyendo el valor de dataStatus como data
        const token = jwt.sign(
            { 
                userId: user.id_usuario, 
                nombre: user.nombre, 
                apeidos: user.apeidos, 
                correo: user.email, 
                status: user.estatus_proceso,
                data: dataStatus 
            }, 
            secretKey, 
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.loginUsuariovw = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_usuario, fecha, nombre, apellido_paterno, apellido_ma, email, password, ciudad, sucursal FROM u943042028_registro.tb_wap_web_usuriosvw_reg_01 WHERE email = ?;';
        const [rows] = await pool.query(query, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Determinar el valor de data basado en si el campo data es null o no
        const dataStatus = user.data !== null ? 1 : 0;

        // Generar el token, incluyendo el valor de dataStatus como data
        const token = jwt.sign(
            { 
                userId: user.id_usuario, 
                nombre: user.nombre, 
                apeidoP: user.apellido_paterno, 
                apeidoM: user.apellido_ma,
                correo: user.email,
                ciudad: user.ciudad,
                sucursal:user.sucursal
            }, 
            secretKey, 
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.loginClave = async (req, res) => {
    const { clave } = req.body;
console.log(clave)
    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_clave, fecha, id_web, clave, fecha_actualizacion, usuario FROM u943042028_registro.tb_web_clave_reg_01 WHERE usuario ="veyraabram@gmail.com";';
        const [rows] = await pool.query(query, [clave]);
        //console.log(rows.length)
        if (rows.length === 0) {
            return res.status(400).json({ message: 'clave not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(clave, user.clave);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect clave' });
        }

        // Generar el token
        const token = jwt.sign({  }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};


exports.login = async (req, res) => {
    const { correo, password } = req.body;
//console.log(req.body)
    try {
        // Consulta para obtener el usuario por correo
        const query = 'SELECT id_usuario, fecha, nombre, apeidos, correo, telefono, password, usuario, id_web, fecha_actualizacion, estatus FROM u943042028_registro.tb_web_usuarios_adm_reg_01 WHERE correo = ?';
        const [rows] = await pool.query(query, [correo]);
        //console.log(rows.length)
        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generar el token
        const token = jwt.sign({ userId: user.id_usuario, nombre: user.nombre, rol : user.id_web }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error:', error); // Mostrar el error en consola para depurar
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

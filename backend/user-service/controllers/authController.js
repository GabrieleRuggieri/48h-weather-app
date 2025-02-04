const mysql = require('mysql');
const bcrypt = require('bcrypt');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'weather_app_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Utente già registrato' });
        }

        const newUser = { username, email, password: hashedPassword };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
            if (err) throw err;
            res.status(201).json({ message: 'Registrazione avvenuta con successo', user: { id: result.insertId, ...newUser } });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // In produzione, generare e restituire un token JWT
        res.json({ message: 'Login effettuato con successo', user: { id: user.id, username: user.username, email: user.email } });
    });
};
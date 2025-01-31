// Esempio semplice in memoria (in produzione usare un database e hashing per le password)
const users = [];

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    // Verifica se l'utente esiste già
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Utente già registrato' });
    }
    const newUser = { id: users.length + 1, username, email, password }; // Nota: in produzione, usare hash per la password!
    users.push(newUser);
    res.status(201).json({ message: 'Registrazione avvenuta con successo', user: newUser });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Credenziali non valide' });
    }
    // In produzione, generare e restituire un token JWT
    res.json({ message: 'Login effettuato con successo', user });
};

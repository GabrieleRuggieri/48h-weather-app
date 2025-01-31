// Gestione in memoria dei preferiti per l'utente (userId fisso = 1 per semplicità)
const userFavorites = {};

exports.getFavorites = (req, res) => {
    const userId = 1;
    const favorites = userFavorites[userId] || [];
    res.json({ favorites });
};

exports.addFavorite = (req, res) => {
    const { city } = req.body;
    const userId = 1;
    if (!userFavorites[userId]) {
        userFavorites[userId] = [];
    }
    userFavorites[userId].push(city);
    res.status(201).json({ message: 'Città aggiunta ai preferiti', favorites: userFavorites[userId] });
};

exports.deleteFavorite = (req, res) => {
    const { id } = req.params; // id usato come indice nell'array per semplicità
    const userId = 1;
    if (!userFavorites[userId]) {
        return res.status(404).json({ message: 'Nessun preferito trovato' });
    }
    const index = parseInt(id);
    if (index < 0 || index >= userFavorites[userId].length) {
        return res.status(400).json({ message: 'ID del preferito non valido' });
    }
    userFavorites[userId].splice(index, 1);
    res.json({ message: 'Preferito rimosso', favorites: userFavorites[userId] });
};

const { Client } = require('@elastic/elasticsearch');

// Il client si collega a Elasticsearch. L'host viene passato dalla variabile d'ambiente ELASTICSEARCH_HOST.
const elasticClient = new Client({
    node: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200'
});

exports.addLog = async (req, res) => {
    const { level, message } = req.body;
    if (!level || !message) {
        return res.status(400).json({ message: 'I campi level e message sono obbligatori' });
    }
    const logEntry = {
        level,
        message,
        timestamp: new Date()
    };

    try {
        const result = await elasticClient.index({
            index: 'logs',
            body: logEntry
        });
        res.status(201).json({ message: 'Log inviato a Elasticsearch', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante l\'invio del log a Elasticsearch', error: error.toString() });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const result = await elasticClient.search({
            index: 'logs',
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        // Elasticsearch restituisce i documenti in result.body.hits.hits
        const logs = result.body.hits.hits.map(hit => hit._source);
        res.json({ logs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante il recupero dei log da Elasticsearch', error: error.toString() });
    }
};

exports.clearLogs = async (req, res) => {
    try {
        // Elimina l'indice "logs". In seguito, Elasticsearch lo ricreerà quando verrà inviato un nuovo log.
        await elasticClient.indices.delete({
            index: 'logs'
        });
        res.json({ message: 'Tutti i log sono stati rimossi' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante la cancellazione dei log', error: error.toString() });
    }
};
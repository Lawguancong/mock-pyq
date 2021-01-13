
const databaseName = 'life' // 1.线上：'m_ibarca_fun' 2.本地：'life'
const databasePort = 27017;
const serverPath = 'localhost'
const serverPort = 4001;
const DB_URL = `mongodb://${serverPath}:${databasePort}/${databaseName}`

module.exports = {
    databaseName,
    serverPath,
    serverPort,
    DB_URL,
}
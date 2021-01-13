//连接mongodb
import mongoose from 'mongoose';
import user from './user'
import share from './share'
import { databaseName, DB_URL } from '../../mock'

mongoose.connect(DB_URL, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
    console.log(`mongodb:"${databaseName}" connect success`)
})
mongoose.set('useFindAndModify', false)

const models = {
    user,
    share,
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

const getModel = (name) => {
    return mongoose.model(name)
}
export {
    getModel
};
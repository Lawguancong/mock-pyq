import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { getModel } from '../databases';
import http from 'http';
import { serverPort } from '../../mock'
import moment from 'moment';
const app = express();
const server = http.Server(app);
const Share = getModel('share');
const User = getModel('user');


app.use(bodyParser.json())
app.use(cookieParser())
// app.use((req, res, next) => {
//     if (req.url.startsWith('/')) {
//         return next()
//     }   
//     return res.sendFile(path.resolve('build/index.html'))
// })

console.log('-----',path.resolve('build'))
app.use(express.static('build'))
app.use('/', express.static(path.resolve('build')))
app.use('/console', express.static(path.resolve('build')))


server.listen(serverPort, () => {
    console.log(`Node app: "server" start at port ${serverPort}`)
})

app.get('/homeQuery', async (req, res) => {
    async function photnCount() {
        return new Promise((re, rj) => {
            Share.find().exec((err, doc) => {
                return re(doc.length)
            })
        })
    }
    const count = await photnCount();
    const { page, size } = req.query;
    Share.find().sort({ postTime: '-1' }).skip((Number(page) - 1) * Number(size)).limit(Number(size)).exec(async (err, doc) => {
        if (err) return res.json({ code: 0, msg: 'Action Fail', data: err });
        if ((page - 1) * size > count) return res.json({ code: 0, msg:'No more data', data: [] });
        return res.json({ code: 1, msg:'Success', data: { count, data: doc } });
    })
})

app.post('/uploadText', (req, res) => {
    const { text, location, type } = req.body
    const shareModel = new Share({ text, location, type })
    shareModel.save((err, doc) => {
        if (err) return res.json({ code: 0, msg: 'Action Fail', data: err });
        return res.json({ code: 1, msg:'Success', data: doc });
    });
})



app.post('/uploadPhoto', (req, res) => {
    const { imageUrl, text, location, type } = req.body
    const shareModel = new Share({ text, imageUrl, location, type })
    shareModel.save((err, doc) => {
        if (err) return res.json({ code: 0, msg: 'Action Fail', data: err });
        return res.json({ code: 1, msg:'Success', data: doc });
    });
})

app.post('/uploadVideo', (req, res) => {
    const { posterImageUrl, videoUrl, type, text, location } = req.body
    const shareModel = new Share({ posterImageUrl, videoUrl, type, text, location })
    shareModel.save((err, doc) => {
        if (err) return res.json({ code: 0, msg: 'Action Fail', data: err });
        return res.json({ code: 1, msg:'Success', data: doc });
    });
})


app.post('/share/delete', (req, res) => {
    const { _id } = req.body
    Share.deleteOne({ _id },(err, doc) => {
        if (err) {
            return res.json({ code: 0, msg: 'Action Fail', data: err });
        }
        if (doc) {
            if (doc.n === 1) {
                return res.json({ code: 1, msg: 'Success', data: doc });
            }
            return res.json({ code: 0, msg: 'Action Fail', data: doc });
        }
    })
})


app.post('/share/edit', (req, res) => {
    const { _id, postTime } = req.body
    Share.findOneAndUpdate({ _id },{ postTime }, (err, doc) => {
        if (err) return res.json({ code: 0, msg: 'Action Fail' });
        return res.json({ code: 1, msg: 'Success', data: doc });
    })
})












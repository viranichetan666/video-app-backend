const Movies = require('../models').movies;
const { create, list, update, get, deleteCache } = require('../cache/repository/movieRepository');
const { uploadFilehandler, getImageUrl } = require('./../config/aws');

exports.list = async (req, res) => {
    try {
        let movies = []
        let isFromCache = false
        let { limit, page } = req.query;
        limit = limit ? limit : 10;
        const offset = page ? page < 1 ? 50 : (page - 1) * limit : 0;
        const ms = await list(limit, offset)
        if (ms.length) {
            console.log("ms", ms)
            movies = ms;
            isFromCache = true;
        } else {
            movies = await Movies.findAll({
                limit,
                offset, 
                order: [['createdAt', 'DESC']],
            });
        }
        if(movies && movies.length) {
            movies = movies.map((m) => {
                const data = isFromCache ? m.entityData :  m.dataValues
                return {
                    ...data,
                    poster: getImageUrl('poster', m["poster"]),
                    trailer: getImageUrl('trailer', m["trailer"])
                }
            })
        }
        res.status(200).send({
            result: movies,
            total: movies.length
        });
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const poster = req.files.poster;
        const trailer = req.files.trailer;
        await Promise.all([
            uploadFilehandler('poster', poster),
            uploadFilehandler('trailer', trailer)
        ])
        data["poster"] = poster.name;
        data["trailer"] = trailer.name;
        const movie = await Movies.create(data);
        await create(movie.toJSON());
        res.status(201).json(movie);
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

exports.update = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const poster = req.files && req.files.poster;
        const trailer = req.files && req.files.trailer;

        if(poster && trailer) {
            await Promise.all([
                uploadFilehandler('poster', poster),
                uploadFilehandler('trailer', trailer)
            ])
            data["poster"] = poster.name;
            data["trailer"] = trailer.name;
        } else if (poster && !trailer) {
            await uploadFilehandler('poster', poster)
            data["poster"] = poster.name;
         } else if (trailer && !poster) {
             await uploadFilehandler('trailer', trailer)
             data["trailer"] = trailer.name;
         }

        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).send('Movie Not Found');
        }
        
        const updateItem = await movie.update(data);
        await update(updateItem.toJSON())
        res.status(200).send(updateItem);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

exports.getById = async (req, res) => {
    try {
        let movie = null
        const id = req.params.id;
        const ms = await get(id)
        if (ms && ms.length) {
            movie = ms[0]
        } else {
            movie = await Movies.findByPk(id);
        }
        if(movie) {
            movie["poster"] = getImageUrl('poster', movie["poster"])
            movie["trailer"] = getImageUrl('trailer', movie["trailer"])
        }
        res.status(200).send(movie);
    } catch (err) {
        return res.status(500).json(err.message)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteCache(id)
        const movie = await Movies.destroy({
            where: {
               id: id
            }
        });
        res.status(204).send()
    } catch (err) {
        return res.status(500).json(err.message)
    }
}
const { Repository, Client } = require('redis-om');
const { redis } = require('../../config/env-vars');
const MovieSchema = require('../schema/movie');

const MovieRepo = async () => {
    const client = new Client();
    await client.open(redis.url);
    const repo = new Repository(MovieSchema, client);
    return { repo, client};
}

exports.get = async (id) => {
    const { repo, client } = await MovieRepo();
    const data = await repo.search().where('id').eq(id).return.all()
    client.close();
    return data;
}

exports.list = async (limit, offset) => {
    const { repo, client } = await MovieRepo();
    const data = await repo.search().return.page(offset, limit)
    client.close();
    return data;
}

const create = async (data) => {
    try {
        const { repo, client } = await MovieRepo();
        data.duration = data.duration.toString();
        const movieEntity = repo.createEntity(data);
        await repo.save(movieEntity)
        client.close();
    } catch (err) {
        console.error(err)
    }   
}

exports.create = create;

exports.update = async (data) => {
    await deleteCache(data.id)
    await create(data);
}

const deleteCache = async (id) => {
    const { repo, client } = await MovieRepo();
    const details = await repo.search().where('id').eq(id).return.all()
    if (!details.length) {
        return
    }
    await repo.remove(details[0].entityId)
    client.close()
}
exports.deleteCache = deleteCache;
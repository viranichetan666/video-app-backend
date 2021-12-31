const { Entity, Schema } = require('redis-om');

class Movie extends Entity {
    toJSON() {
        return {
            hash: this.entityId,
            id: this.id,
            title: this.title,
            description: this.description,
            duration: this.duration,
            poster: this.poster,
            trailer: this.trailer
        }
    }
}

const MovieSchema = new Schema(Movie, {
    id: {
        type: 'number',
    },
    title: {
        type: 'string',
        textSearch: true,
    },
    description: {
        type: 'string'
    },
    duration: {
        type: 'string'
    },
    poster: {
        type: 'string'
    },
    trailer: {
        type: 'string'
    }
}, { dataStructure: 'JSON', indexName: 'movies' });
 
module.exports = MovieSchema;
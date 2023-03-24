import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {MongoClient, ObjectId} from 'mongodb';
import express from 'express';

const url = '';
const client = new MongoClient(url);
const dbName = 'colors';

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

(async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('colors');

    const typeDefs = `#graphql
    type ColorsResult {
        count(group: String): Int
        colors(group: String, page: Int): [Color]
    }
    type Color {
        id: String
        hue: Int
        hex: String
        group: String
    }
    type Query {
        colors: ColorsResult
        color(id: String): Color
        randomColor: Color
    }
`;

    const resolvers = {
        Query: {
            colors: (parent, args) => {
                return {};
            },
            color: async (parent, args) => {
                const foundColors = await collection.find({
                    _id: new ObjectId(args.id)
                }).toArray();
                const [color] = foundColors;
                return {
                    id: color._id.toString(),
                    hue: color.hue,
                    hex: color.hex,
                    group: color.group
                }
            },
            randomColor: async (parent, args) => {
                const foundCount = await collection.countDocuments();
                const skip = generateRandomNumber(0, foundCount);
                const foundColors = await collection.find({}).skip(skip).limit(1).toArray();
                const [color] = foundColors;
                return {
                    id: color._id.toString(),
                    hue: color.hue,
                    hex: color.hex,
                    group: color.group
                }
            },
        },
        ColorsResult: {
            colors: async (parent, args) => {
                let page = 0;
                const filter = {};
                if (args.group) {
                    filter.group = args.group;
                }
                if (args.page !== null) {
                    page = args.page - 1;
                }
                const skip = page * 12;
                const foundColors = await collection.find(filter, {
                    sort: {
                        _id: 1
                    }
                }).skip(skip).limit(12).toArray();
                return foundColors.map(color => {
                    return {
                        id: color._id.toString(),
                        hue: color.hue,
                        hex: color.hex,
                        group: color.group
                    }
                });
            },
            count: async (parent, args) => {
                const filter = {};
                if (args.group) {
                    filter.group = args.group;
                }
                const foundColors = await collection.countDocuments(filter);
                return foundColors;
            }
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await startStandaloneServer(server, {
        listen: {
            port: 5000
        }
    });

    const app = express();

    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(80);
})();

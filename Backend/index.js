import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {MongoClient, ObjectId} from 'mongodb';

const url = 'mongodb+srv://workDemo:workDemo@workdemos.bsxli.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'colors';

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

    const {url} = await startStandaloneServer(server);
    console.log(`🚀 Server ready at ${url}`);
})();

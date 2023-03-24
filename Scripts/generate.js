import KolorWheel from 'kolorwheel'
import { MongoClient } from 'mongodb';

const url = '';
const client = new MongoClient(url);
const dbName = 'colors';

const findColorGroup = (hue, sat, lig) => {
    if (sat === 100 && (hue >= 0 && hue <= 5 || hue >= 300 && hue <= 360)) {
        return 'red';
    }
    if (sat === 100 && hue >= 6 && hue <= 40) {
        return 'orange';
    }
    if (sat === 100 && hue >= 42 && hue <= 76) {
        return 'yellow';
    }
    if (sat === 100 && hue >= 78 && hue <= 148) {
        return 'green';
    }
    if (sat === 100 && hue >= 150 && hue <= 246) {
        return 'blue';
    }
    if (sat === 100 && hue >= 248 && hue <= 298) {
        return 'purple';
    }
    if (hue >= 25 && hue <= 35 && sat === 50 && lig === 20) {
        return 'brown';
    }
    if (hue === 0 && sat === 0) {
        return 'gray';
    }
}

const generateColor = (hue, sat = 100, lig = 50) => {
    const generatedColor = new KolorWheel([hue, sat, lig]);
    const hex = generatedColor.getHex();
    const color = {
        hue,
        hex,
    };
    const foundColorGroup = findColorGroup(hue, sat, lig);
    if (foundColorGroup) {
        color.group = foundColorGroup;
    }
    return color;
};

const generateColors = (start, end, count, sat = 100, lig = 50) => {
    const colors = [];
    const colorsToGenerate = count;
    const hueFactor = (end - start) / count;
    let huePosition = start;
    for (let i = 0; i < colorsToGenerate; i++) {
        const generatedColor = generateColor(huePosition, sat, lig);
        colors.push(generatedColor);
        huePosition += hueFactor;
    }
    return colors;
}

const generateGrayColors = () => {
    const grayColors = [];
    let lig = 10;
    for (let i = 0; i < 8; i++){
        grayColors.push(generateColor(0, 0, lig));
        lig += 10;
    }
    return grayColors;
}

const coreColors = generateColors(0, 360, 180);
const brownColors = generateColors(25, 35, 10, 50, 20);
const black = generateColor(0, 0, 0);
const grayColors = generateGrayColors();
const white = generateColor(0, 0, 100);

const allColors = [...coreColors, ...brownColors, black, ...grayColors, white];

(async () => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('colors');
    await collection.insertMany(allColors);
})();

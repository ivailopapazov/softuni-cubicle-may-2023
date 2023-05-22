const uniqid = require('uniqid');
const cubes = [
    {
        id: '1n73sh8holhz66elc',
        name: 'Mirror Cube',
        description: 'A cool mirror cube',
        imageUrl: 'https://m.media-amazon.com/images/I/71TrvUl50OL.jpg',
        difficultyLevel: 4
    },
    {
        id: '2n73sh8holaz66elc',
        name: 'Rubic Classic',
        description: 'Evergreen',
        imageUrl: 'https://www.hpcwire.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067-675x380.jpg',
        difficultyLevel: 3
    }
];

exports.getAll = (search, from, to) => {
    let result = cubes.slice();

    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};

exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);

    return newCube;
};
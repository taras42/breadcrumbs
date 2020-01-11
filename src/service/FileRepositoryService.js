import data from './mock/data';
import resourceType from './enum/resourceType';

const pathSeparator = '/';

class FileRepositoryService {
    async getContents(path) {
        let splitPath = path === pathSeparator ? [''] : path.split(pathSeparator);
        splitPath = splitPath.slice(1, splitPath.length);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let response = {};
                let level = data;

                if (splitPath.length > 0) {
                    level = splitPath.reduce((memo, pathFragment) => {
                        memo.result = data.children[pathFragment];


                        return memo;
                    }, {
                        result: null,
                        currentLevel: data
                    });
                }

                const name = Object.keys(level)[0];
                const type = level.type;

                response.name = name;
                response.type = type;

                if (type === resourceType.DIR) {
                    response.children = Object.keys(level.children).map((key) => {
                        return {
                            name: key,
                            type: level.children[key].type
                        }
                    });
                }
            }, 1000);
        });
    }
}

export default FileRepositoryService;
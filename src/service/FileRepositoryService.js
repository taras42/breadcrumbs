import data from './mock/data';
import resourceType from './enum/resourceType';

const pathSeparator = '/';

class FileRepositoryService {
    getContents(path) {
        let splitPath = path === pathSeparator ? [''] : path.split(pathSeparator);
        splitPath = splitPath.slice(1, splitPath.length);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let response = {};
                let name = Object.keys(data)[0];
                let level = data[name];

                if (splitPath.length > 0) {
                    level = splitPath.reduce((memo, pathFragment) => {
                        memo.result = memo.currentLevel.children[pathFragment];
                        memo.currentLevel = memo.result;
                        name = pathFragment;

                        return memo;
                    }, {
                        result: null,
                        currentLevel: level
                    }).result;
                }

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

                resolve(response);
            }, 1000);
        });
    }
}

export default FileRepositoryService;
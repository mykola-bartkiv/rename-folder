const fs = require('fs');
const path = require('path');

const main = './main';

function directory(source, fun) {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .sort((a, b) => a.name.split('_')[1] - b.name.split('_')[1])
    .filter(dirent => dirent.isDirectory())
    .map(fun);
}

directory(main, dir =>
  directory(`${main}/${dir.name}`, sub => {
    const arr = sub.name.split('-').map(item => item.split('.'));
    const [day, month, year, hour, minute] = arr.flat();
    const newName = `${year}.${month}.${day}-${hour}.${minute}`;

    // const [year, month, day, hour, minute] = arr.flat();
    // const newName = `${day}.${month}.${year}-${hour}.${minute}`;

    fs.rename(
      path.join(main, dir.name, sub.name),
      path.join(main, dir.name, newName),
      err => err || 'Successfully renamed the directory.'
    );
  })
);

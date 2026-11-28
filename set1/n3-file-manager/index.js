// Name: Ian Gabriel S. Derilo
// Section: IV-BSIT-B
// Activity: N3 - File Manager with fs and path
// Date: (write today's date)

const fs = require('fs'); // built-in module for working with files
const path = require('path'); // built-in module for building file paths

// path.join builds the path of the files folder, __dirname is the folder where this file is saved
const filesFolder = path.join(__dirname, 'files');

// this will make the files folder if it is not there yet
if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
}

// process.argv is an array and slice(2) copies everything from index 2 to the end, this strips out index0(node) and index1(filename)
const args = process.argv.slice(2);
const command = args[0]; // first argument of the user like create
const fileName = args[1]; // second argument is the name of the file like notes.txt
const content = args.slice(2).join(' '); // the remaining arguments joined into one text

function showUsage() {
    console.log('\n=========================    READ THIS   =======================');
    console.log('how to run: node index.js <command here> <put the filename here> <put a "text" here, make sure they are in double qoutation mark>');
    console.log('available commands: create, read, update, delete, list');
    console.log('example: node index.js create notes.txt "Hello"');
    console.log('==================================================================');
    console.log(`you are currently running ${path.basename(__filename)}\n`);
}

// this builds the full path of a file inside the files folder
function getFilePath(name) {
    // path.basename keeps only the file name so the file always stays inside the files folder
    return path.join(filesFolder, path.basename(name));
}

function createFile() {
    // when the user did not enter a file name or the content
    if (!fileName || !content) {
        console.log('\n!!!!! error: please type a file name and the content.!!!!!');
        showUsage();
        return;
    }

    const filePath = getFilePath(fileName);

    // when the file already exists
    if (fs.existsSync(filePath)) {
        console.log(`\n!!!!! error: "${fileName}" already exists, use update to add text.!!!!!\n`);
        return;
    }

    fs.writeFileSync(filePath, content); // makes the file and writes the content
    console.log(`\nfile created: ${filePath}\n`);
}

function readFile() {
    // when the user did not enter a file name
    if (!fileName) {
        console.log('\n!!!!! error: please type the file name to read.!!!!!');
        showUsage();
        return;
    }

    const filePath = getFilePath(fileName);

    // when the file does not exist
    if (!fs.existsSync(filePath)) {
        console.log(`\n!!!!! error: "${fileName}" was not found.!!!!!\n`);
        return;
    }

    console.log(`\n----- contents of ${fileName} -----`);
    console.log(fs.readFileSync(filePath, 'utf8')); // utf8 turns the file into readable text
    console.log('-----------------------------------\n');
}

function updateFile() {
    // when the user did not enter a file name or the text to add
    if (!fileName || !content) {
        console.log('\n!!!!! error: please type a file name and the text to add.!!!!!');
        showUsage();
        return;
    }

    const filePath = getFilePath(fileName);

    // when the file does not exist
    if (!fs.existsSync(filePath)) {
        console.log(`\n!!!!! error: "${fileName}" was not found.!!!!!\n`);
        return;
    }

    fs.appendFileSync(filePath, '\n' + content); // adds the text at the end of the file on a new line
    console.log(`\nfile updated: ${filePath}\n`);
}

function deleteFile() {
    // when the user did not enter a file name
    if (!fileName) {
        console.log('\n!!!!! error: please type the file name to delete.!!!!!');
        showUsage();
        return;
    }

    const filePath = getFilePath(fileName);

    // when the file does not exist
    if (!fs.existsSync(filePath)) {
        console.log(`\n!!!!! error: "${fileName}" was not found.!!!!!\n`);
        return;
    }

    fs.unlinkSync(filePath); // removes the file
    console.log(`\nfile deleted: ${filePath}\n`);
}

function listFiles() {
    const names = fs.readdirSync(filesFolder); // all the names inside the files folder
    let count = 0;

    names.forEach((name) => {
        const filePath = path.join(filesFolder, name);

        // this to skip folders and only show the files
        if (!fs.statSync(filePath).isFile()) {
            return;
        }

        count++;
        console.log(`\nfile ${count}`);
        console.log(`full path : ${filePath}`);
        console.log(`file name : ${path.basename(filePath)}`); // the file name with its extension
        console.log(`extension : ${path.extname(filePath)}`); // the extension like .txt
        console.log(`contents  : ${fs.readFileSync(filePath, 'utf8')}`);
    });

    // when there are no files inside the files folder
    if (count === 0) {
        console.log('\n!!!!! the files folder is empty.!!!!!');
    }
}

function main() {

    switch (command) {
        case 'create':
            createFile();
            break;
        case 'read':
            readFile();
            break;
        case 'update':
            updateFile();
            break;
        case 'delete':
            deleteFile();
            break;
        case 'list':
            listFiles();
            break;
        default:
            console.log('\n!!!!! error: please type a valid command.!!!!!\n');
            showUsage();
    }
}

main();
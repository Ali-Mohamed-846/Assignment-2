const path = require("node:path");

function logCurrentFileAndDirPath() {
    console.log({
        File: __filename,
        Dir: __dirname
    });
}

logCurrentFileAndDirPath();

console.log(path.basename('/user/files/report.pdf'))
const obj = { dir: "/folder", name: "app", ext: ".js" }
console.log(path.format(obj))
console.log(path.extname('/docs/readme.md'))
console.log(path.parse('/home/app/main.js'))
console.log(path.isAbsolute('/home/user/file.txt'))
console.log(path.join("src", "components", "App.js"))
console.log(path.resolve("./Main.js"))
console.log(path.join("/folder1", "folder2", "file.txt"))
const fs = require("fs");
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("The file could not be deleted");
            return;
        }

        console.log(`${path.basename(filePath)} is deleted.`);
    });
}
deleteFile("./index.js");
function createFolder(folderName) {
    try {
        fs.mkdirSync(folderName);
        console.log("Success");
    } catch (err) {
        console.log("Failed to create folder.");
    }
}
createFolder("NewFolder");


const eventEmmiter = require("node:events")
const emmiter = new eventEmmiter();

emmiter.on("start", () => {
    console.log("Welcome event triggered!")
})

emmiter.emit("start")

emmiter.on("Login", (username) => {
    console.log(`User logged in :${username}`)
})

emmiter.emit("Login", "Ahmed")
try {
    const content = fs.readFileSync("./notes.txt")
    console.log(`the file content =>${content}`)
} catch (err) {
    console.log(err)
}
fs.writeFile("./async.txt", "Async save", (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Data written successfully")

})

console.log(fs.existsSync("./notes.txt"));


const os = require("os");

function OSInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}

console.log(OSInfo());




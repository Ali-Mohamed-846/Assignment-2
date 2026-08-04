const fs = require("fs");
const { pipeline } = require("stream");
const compress = require("zlib");

const readableBig = fs.createReadStream("./big.txt", {
  encoding: "utf8",
});

readableBig.on("data", (chunk) => {
  console.log("Chunk:");
  console.log(chunk);
});

readableBig.on("end", () => {
  console.log("Finished reading file.");
});

readableBig.on("error", (err) => {
  console.error(err);
});











const readableSource = fs.createReadStream("./source.txt");
const writeableDest = fs.createWriteStream("./dest.txt");

pipeline(readableSource, writeableDest, (err) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("File copied successfully.");
  }
});





const readableData = fs.createReadStream("./data.txt");
const zip = compress.createGzip();
const writeableDataz = fs.createWriteStream("./data.txt.gz");

pipeline(readableData, zip, writeableDataz, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("File compressed successfully.");
  }
});
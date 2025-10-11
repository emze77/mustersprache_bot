import fs from "fs";

const leftPatternDB = "./leftPatternDB.json";
let dbLength = fs.readFileSync(leftPatternDB, "utf8").length;
const DB_EMPTY_VALUE = 2;

const isDatabankEmpty = () => {
  if (dbLength <= DB_EMPTY_VALUE) {
    console.log("Databank is empty");
    return true;
  } else {
    console.log("Databank is filled");
    return false;
  }
};

const actualizeDatabank = (val) => {
  fs.writeFileSync(leftPatternDB, JSON.stringify(val), "utf8", (err) => {
    if (err) {
      console.error("Error saving array:", err);
    } else {
      console.log("All patterns loaded to", leftPatternDB);
    }
  });
};

const parseArray = () => {
    return JSON.parse(fs.readFileSync(leftPatternDB, "utf8"))
}

export { isDatabankEmpty, actualizeDatabank, parseArray };

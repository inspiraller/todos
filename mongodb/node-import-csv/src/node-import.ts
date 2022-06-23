import mongoose, { Schema, Connection } from "mongoose";
import {parseFile} from "@fast-csv/parse";
import path from "path";
// import dotEnv from "dotenv";

// dotEnv.config({ path: path.resolve(__dirname, "../.env") });

const { env } = process;

const MONGO_DB = env.MONGO_DB as string;
const MONGO_USER = env.MONGO_USER as string;
const MONGO_PASS = env.MONGO_PASS as string;
const MONGO_PORT = env.MONGO_PORT as string;
const MONGO_HOST = env.MONGO_HOST as string;
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;
const MONGO_COLLECTION = env.MONGO_COLLECTION as string;

const IMPORT_CSV_PATH = '../../mongodb_data/latest.csv'
console.log('node-import.ts --- env variables', {MONGO_URI});


export const TodosSchema = new Schema({
  id: Number,
  todoText: String,
  created_timestamp: Date,
  completed: Date,
});

export interface PropsImport {
  id: string;
  todoText: string;
  created_timestamp: string;
  completed: string;
}

// Must pass the database type, otherwise when doing TodoModels.create  - it would create onto the admin/ database. 
// We have to connect to admin via connection because our role is set on admin to access any db.
const getTodosModel = (db: Connection) => db.model(MONGO_COLLECTION, TodosSchema)

export const importTodos = async (db: Connection, arrImport: PropsImport[]) => {
  // Must specify db - otherwise database will end up in admin database
  const TodosModel = getTodosModel(db);
  TodosModel.create(
    arrImport,
    (err, arrImport) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfullly imported csv", arrImport);
      process.exit(0);
    }
  );
};

export const csvToData = (pathCsv: string) => new Promise<PropsImport[]>((resolve, reject) => {
    // https://c2fo.github.io/fast-csv/docs/parsing/methods
    const arr: PropsImport[] = []
    parseFile(pathCsv, {
      headers: true,
    })
    .on("error", (err) => {reject(err)})
    .on("data", (data: PropsImport) => {
        arr.push(data)
    })
    .on("end", () => {
      // If csv has empty items at the end - these get populated. So remove them here.
      // We assume there will be more populated items than empty ones, so this shoould be more efficient 
      // than to do this check on every insertion as above.
      // arr.at not supported ? do Dockerfile from node:16 to get latest js methods...

      while(arr.length && !arr.at(arr.length - 1)?.id) {
        arr.pop();
      }
      resolve(arr)
    })
});


const init = async () => {
  await mongoose.connect(MONGO_URI, {
    // dbName: 'MONGO_DB', - redundant. User is still logging in as an admin.
    // Need to switch to this database
    bufferCommands: false,
  });
  const pathCsv = path.join(__dirname, IMPORT_CSV_PATH);
  const arrImport = await csvToData(pathCsv)

  const db = mongoose.connection.useDb(MONGO_DB);
  importTodos(db, arrImport);


};
init();
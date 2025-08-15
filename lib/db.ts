// lib/db.ts
// This code :- connect to mongoDB 

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/yourdbname";

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  cached.promise = mongoose.connect(MONGODB_URL);
  cached.conn = await cached.promise;
  return cached.conn;
}

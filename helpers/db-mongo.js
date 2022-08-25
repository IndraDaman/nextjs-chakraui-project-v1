import { MongoClient } from 'mongodb';
import {hashPassword} from './auth'

const client = await MongoClient.connect(
    'mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectauth?retryWrites=true&w=majority'
  );
export async function connectToDatabase() {
  return client;
}

export async function getCollectionOne(collectionName,obj){
    const db = client.db();
  
    const existingUser = await db.collection(collectionName).findOne(obj);
    client.close();
    return existingUser;
}
export async function createCollectionDetail(collectionName,obj){
    const db = client.db();
    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne(obj);
  
    return result;
}
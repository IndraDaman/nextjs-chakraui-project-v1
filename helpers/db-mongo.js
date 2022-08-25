import { MongoClient } from 'mongodb';
import {hashPassword} from './auth'


export async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectauth?retryWrites=true&w=majority'
      );
  return client;
}

export async function existingUserDetail(obj){
    const client=await connectToDatabase();
    const db = client.db();
  
    const existingUser = await db.collection('userdetail').findOne({...obj});
    client.close();
  
    return existingUser;
}
export async function createUser(obj){
    const client=await connectToDatabase();
    const db = client.db();

    const result = await db.collection('userdetail').insertOne(obj);
    client.close();
  
    return result;
}

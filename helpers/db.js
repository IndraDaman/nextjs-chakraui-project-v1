import {getCollectionOne,connectToDatabase,createCollectionDetail} from "./db-mongo"

export async function existingUser(paramObj){
    const user = getCollectionOne('users',paramObj)
    return user;
}

export async function createUser(paramObj){
    const result = createCollectionDetail('users',paramObj)
    return result;
}
import { app, database } from "../firebase.Config";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";

export async function existingUserDetail(objParam){
    const databaseRef = collection(database, "userdetail");
    const result = await getDocs(databaseRef);
    const data = result.docs.map((data) => {
      const internaldata = data.data();
      internaldata.id = data.id;
      return internaldata;
    });
    const existingUser = {...data.filter((obj) => obj.email == objParam.email)};
    if(existingUser[0]){       
      console.log(existingUser[0]) ;
    return existingUser[0];
    }else{
        return null;
    }
}
export async function createUser(obj){
    const databaseRef = collection(database, "userdetail");

    const result = await addDoc(databaseRef, obj)
  
    return result;
}
export async function changePassword(objParam){
  console.log(objParam);
  let fieldToEdit = doc(database, "userdetail", objParam.id);
  const result = await updateDoc(fieldToEdit, {
    password: objParam.password,
  });

  return result;
}
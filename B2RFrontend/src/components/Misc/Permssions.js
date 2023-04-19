import {db} from "../../firebase";
import { collection, getDocs, query, where} from "firebase/firestore"
const getPermission= async (email,action) =>  {
    const q = query(collection(db, "users"), where("email", "==", email));
    console.log(q);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs[0].data().permissions;
    console.log(data)
    console.log(action)
    console.log(data.indexOf(action))
    console.log(data.indexOf(action)>-1)
    return data.indexOf(action)>-1;
}
export default getPermission;



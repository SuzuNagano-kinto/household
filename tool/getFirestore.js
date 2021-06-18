import firebase from "firebase/app"
import "firebase/firestore"
/**-----------------------
* @param {target} スライドで開閉する要素
* @param {option} option
-----------------------*/
class getFirestore {
  constructor(){
  }
  init() {
    console.log("init")
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBFFD4z2aB6Xg3lZSTDzINh6qlnsTVS_4M",
      authDomain: "household-accounts-system.firebaseapp.com",
      projectId: "household-accounts-system",
      storageBucket: "household-accounts-system.appspot.com",
      messagingSenderId: "1012625851416",
      appId: "1:1012625851416:web:4b8827f72d9bcf99322f6d",
      measurementId: "G-0NG8R0KTEY"
    }
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  getData() {
    console.log("getData")

    const db = firebase.firestore()
    return db
  }
}

export default getFirestore
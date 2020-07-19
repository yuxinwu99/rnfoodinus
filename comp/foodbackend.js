import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// export function login({email, password}) {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(value => console.log(value));
// }

// export function signup({email, password, displayName}) {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(userInfo => {
//       console.log(userInfo);
//       userInfo.user
//         .updateProfile({displayName: displayName.trim()})
//         .then(() => {});
//     });
// }

// export function subscribeToAuthChanges(authStateChanged) {
//   firebase.auth().onAuthStateChanged(user => {
//     authStateChanged(user);
//   });
// }

// export function signout(onSignedOut) {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       onSignedOut();
//     });
// }

export function updateFood(food, updateComplete) {
  food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log('Updating food in firebase');

  firestore()
    .collection('Foods')
    .doc(food.id)
    .set(food)
    .then(() => updateComplete(food))
    .catch(error => console.log(error));
}

export function deleteFood(food, deleteComplete) {
  console.log(food);

  firestore()
    .collection('Foods')
    .doc(food.id)
    .delete()
    .then(() => deleteComplete())
    .catch(error => console.log(error));
}

export async function getFoods(foodsRetreived) {
  var foodList = [];

  var snapshot = await firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .get();

  snapshot.forEach(doc => {
    const foodItem = doc.data();
    foodItem.id = doc.id;
    foodList.push(foodItem);
  });

  foodsRetreived(foodList);
}

export async function getOrders(storename, ordersRetreived) {
  var ordersList = [];

  var snapshot = await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .orderBy('time')
    .get();

  snapshot.forEach(doc => {
    const orderItem = doc.data();
    orderItem.id = doc.id;
    ordersList.push(orderItem);
  });

  ordersRetreived(ordersList);
}

export async function toggleSellerComp(storename, orderID) {
  await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .document(orderID)
    .update({
      seller_comp: true,
    });
}

export async function toggleCustomerComp(storename, orderID) {
  await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .document(orderID)
    .update({
      customer_comp: true,
    });
}

export function uploadFood(food, onFoodUploaded, {updating}) {
  if (food.imageUri) {
    const fileExtension = food.imageUri.split('.').pop();
    console.log('EXT: ' + fileExtension);

    var uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`foods/images/${fileName}`);

    storageRef.putFile(food.imageUri).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log('snapshot: ' + snapshot.state);
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log('Success');
        }
      },
      error => {
        unsubscribe();
        console.log('image upload error: ' + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then(downloadUrl => {
          console.log('File available at: ' + downloadUrl);

          food.image = downloadUrl;

          delete food.imageUri;

          if (updating) {
            console.log('Updating....');
            updateFood(food, onFoodUploaded);
          } else {
            console.log('adding...');
            addFood(food, onFoodUploaded);
          }
        });
      },
    );
  } else {
    console.log('Skipping image upload');

    delete food.imageUri;

    if (updating) {
      console.log('Updating....');
      updateFood(food, onFoodUploaded);
    } else {
      console.log('adding...');
      addFood(food, onFoodUploaded);
    }
  }
}

export function addFood(food, addComplete) {
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firestore()
    .collection('Foods')
    .add(food)
    .then(snapshot => {
      food.id = snapshot.id;
      snapshot.set(food);
    })
    .then(() => addComplete(food))
    .catch(error => console.log(error));
}

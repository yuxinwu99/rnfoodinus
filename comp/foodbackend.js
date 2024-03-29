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

export function deleteFood(food, storename, deleteComplete) {
  console.log(food);

  firestore()
    .collection('stores')
    .doc(storename)
    .collection('menu')
    .doc(food.id)
    .delete()
    .then(() => deleteComplete())
    .catch(error => console.log(error));
}

export async function getProfile(storename, profileRetreived) {
  var snapshot = await firestore()
    .collection('stores')
    .doc(storename)
    .get();
  console.log('snapshot data: ', snapshot.data());

  var profile = snapshot.data();

  profileRetreived(profile);
}

export async function getFoods(storename, foodsRetreived) {
  var foodList = [];

  var snapshot = await firestore()
    .collection('stores')
    .doc(storename)
    .collection('menu')
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
    .where('customer_comp', '==', false)
    .where('seller_comp', '==', false)
    .orderBy('time')
    .get();
  snapshot.forEach(doc => {
    const orderItem = doc.data();
    orderItem.id = doc.id;
    ordersList.push(orderItem);
  });

  ordersRetreived(ordersList);
}

export async function getSOrders(storename, ordersRetreived) {
  var ordersList = [];

  var snapshot = await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .where('customer_comp', '==', false)
    .where('seller_comp', '==', true)
    .orderBy('time')
    .get();

  snapshot.forEach(doc => {
    const orderItem = doc.data();
    orderItem.id = doc.id;
    ordersList.push(orderItem);
  });

  ordersRetreived(ordersList);
}

export async function getCOrders(storename, ordersRetreived) {
  var ordersList = [];

  var snapshot = await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .where('customer_comp', '==', true)
    .where('seller_comp', '==', true)
    .orderBy('time')
    .get();

  snapshot.forEach(doc => {
    const orderItem = doc.data();
    orderItem.id = doc.id;
    ordersList.push(orderItem);
  });

  ordersRetreived(ordersList);
}

export async function toggleSellerComp(storename, orderID, email) {
  await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .doc(orderID)
    .update({
      seller_comp: true,
    })
    .then(() => {
      console.log('Seller_Comp Updated!');
    });
  await firestore()
    .collection('users')
    .doc(email)
    .collection('Orders')
    .doc(orderID)
    .update({
      seller_comp: true,
    });
}

export async function toggleCustomerComp(storename, orderID, email) {
  await firestore()
    .collection('order')
    .doc(storename)
    .collection('comorder')
    .doc(orderID)
    .update({
      customer_comp: true,
    })
    .then(() => {
      console.log('Customer_comp Updated!');
    });
  await firestore()
    .collection('users')
    .doc(email)
    .collection('Orders')
    .doc(orderID)
    .update({
      customer_comp: true,
    });
}

export function uploadFood(food, onFoodUploaded, username, {updating}) {
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
            updateFood(food, username, onFoodUploaded);
          } else {
            console.log('adding...');
            addFood(food, username, onFoodUploaded);
          }
        });
      },
    );
  } else {
    console.log('Skipping image upload');

    delete food.imageUri;

    if (updating) {
      console.log('Updating....');
      updateFood(food, username, onFoodUploaded);
    } else {
      console.log('adding...');
      addFood(food, username, onFoodUploaded);
    }
  }
}

export function addFood(food, storename, addComplete) {
  food.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firestore()
    .collection('stores')
    .doc(storename)
    .collection('menu')
    .add(food)
    .then(snapshot => {
      food.id = snapshot.id;
      food.price = parseFloat(food.price);
      snapshot.set(food);
    })
    .then(() => addComplete(food))
    .catch(error => console.log(error));
}

export function updateFood(food, storename, updateComplete) {
  food.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  food.price = parseFloat(food.price);
  console.log('Updating food in firebase');
  console.log('food details: ', food);
  console.log('storename: ', storename);

  firestore()
    .collection('stores')
    .doc(storename)
    .collection('menu')
    .doc(food.id)
    .set(food)
    .then(() => updateComplete(food))
    .catch(error => console.log(error));
  console.log('food successfully updated');
}

export function uploadProfile(profile, onProfileUploaded, storename) {
  if (profile.imageUri) {
    const fileExtension = profile.imageUri.split('.').pop();
    console.log('EXT: ' + fileExtension);

    var uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`profile/images/${fileName}`);

    storageRef.putFile(profile.imageUri).on(
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

          profile.image = downloadUrl;

          delete profile.imageUri;

          console.log('Updating....');
          updateFood(profile, storename, onProfileUploaded);
        });
      },
    );
  } else {
    console.log('Skipping image upload');

    delete profile.imageUri;

    console.log('Updating....');
    updateProfile(profile, storename, onProfileUploaded);
  }
}

export function updateProfile(profile, storename, updateComplete) {
  profile.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log('Updating profile in firebase');

  firestore()
    .collection('stores')
    .doc(storename)
    .set(profile)
    .then(() => updateComplete(profile))
    .catch(error => console.log(error));
}

import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List, Button} from 'react-native-paper';

function Todo({id, title, seller_comp, consumer_comp}) {
  async function toggleComplete() {
    await firestore()
      .collection('new_collection')
      .doc(id)
      .update({
        seller_comp: !seller_comp,
      });
  }

  async function clearItem() {
    await firestore()
      .where('id', '==', id)
      .delete();
  }

  return (
    <>
      <List.Item
        title={title}
        onPress={() => toggleComplete()}
        left={props => (
          <List.Icon {...props} icon={seller_comp ? 'check' : 'cancel'} />
        )}
      />
      <Button onPress={() => clearItem()}>Delete</Button>
    </>
  );
}

export default React.memo(Todo);

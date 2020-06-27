import React from 'react';

import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';

import firebaseDb from '../firebaseDb';

class UserListContainer extends React.Component {
    state = {
    isLoading: true,
    users: null
    }
    
render() {

    const { isLoading, users } = this.state

        if (isLoading)
            return <ActivityIndicator />

        return(
            <FlatList />
        )
    }
}
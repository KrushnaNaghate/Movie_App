import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { Icon } from 'react-native-paper'
import {Avatar, List, IconButton} from 'react-native-paper';

const ListData = [
  {
    Id: '1',
    FirstName: 'Nehal',
    LastName: 'Prasad',
    DateOfBirth: '21-12-1998',
    married: 'false',
    Photo: 'https://cdn-icons-png.flaticon.com/128/4333/4333609.png',
  },
  {
    Id: '2',
    FirstName: 'Krushna',
    LastName: 'Naghate',
    DateOfBirth: '10-10-1999',
    married: 'false',
    Photo: 'https://cdn-icons-png.flaticon.com/128/4128/4128176.png',
  },
];

const MainScreen = ({route,navigation}) => {
  const [data, setData] = useState(ListData); // Array of objects

  useEffect(() => {
    if (route.params) {
      const { newItem } = route.params;
  
      setData((prevData) => {
        const newData = prevData.map((val) => {
          if (val?.Id === newItem?.Id) {
            // Increase the value by 1 if Id matches
            return {
              ...val,
              value: (val.value || 0) + 1
            };
          }
          return val;
        });
  
        if (newItem?.Id) {
          console.log(newItem, "MainScreen");
          console.log(newData);
  
          // Add the newItem if it doesn't exist in the array
          const existingItem = newData.find((val) => val?.Id === newItem?.Id);
          if (!existingItem) {
            newData.push({ ...newItem, value: 1 });
          }
        }
  
        return newData;
      });
    }
  }, [route.params]);
  
  
  

  const handleDelete = id => {
    const updatedData = data?.filter(item => item.Id !== id);
    setData(updatedData);
  };

  const handleEdit = item => {
    navigation.navigate('Edit', {item});
  };

  const renderItem = ({item}) => {
    // console.log(item, 'nehal');
    return (
      <List.Item
        title={`${item.FirstName} ${item.LastName}`}
        description={item.DateOfBirth}
        left={() => <Avatar.Image source={{uri: item.Photo}} />}
        right={() => (
          <TouchableOpacity onPress={() => handleDelete(item.Id)}>
            <Text style={{color: 'red', fontSize: 12}}>Delete</Text>
          </TouchableOpacity>
        )}
        onPress={() => handleEdit(item)}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.Id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', {data, setData})}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginTop: 20,
            fontSize: 20,
          }}>
          Add More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

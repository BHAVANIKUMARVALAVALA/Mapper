/*  This is Mapper Project
    Screen  : Profile
    Developer : Bhavanikumar V     
*/


//  Pre-built node_modules

import React,{ useState } from "react";
import { View, Text, Image, FlatList, Linking } from 'react-native';


const ProfileScreen = (props) => {
    let data = props.route.params.userInfo;
    let contributorsURL = data.contributors_url;
    const [contributorsData, setContributorsData] = useState([]);
      fetch(contributorsURL)
        .then((response) => response.json())
        .then(async(responseJson) => {
            console.log("Bhavani", responseJson );
          await setContributorsData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
        console.disableYellowBox = true;
    return (
        <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={{ fontSize: 30, margin: 10, fontWeight: '300' }}>{data.full_name}</Text>
            <View style={{ flex: 0.6, margin: 5 }}>
                <Image source={{ uri: data.owner.avatar_url }} style={{ height: 170, width: 350, borderRadius: 8 }} />
                <View style={{ flex: 0.3 }}>
                    <Text numberOfLines={2} style={{ padding: 5 }}>Name : {data.full_name}</Text>
                    <Text numberOfLines={2} style={{ padding: 5 }}>Project Link :<Text style={{ color: 'blue' }} onPress={() => Linking.openURL(data.repos_url)}>{data.owner.url}</Text> </Text>
                    <Text numberOfLines={2} style={{ padding: 5 }}>Description : {data.description}</Text>
                </View>
            </View>
            <View style={{ flex: 0.5,}}>
                <Text style={{ fontSize: 30, fontWeight: '500' }}>Contributors</Text>
                <View style={{ flex: 0.5 }}>
                    <FlatList
                        style={{ width: '100%' }}
                        horizontal={true}
                        keyboardDismissMode = 'on-drag'
                        legacyImplementation={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={contributorsData}
                        renderItem={({ item }) => (
                     <View style={{ flex: 0.3, flexDirection: 'row' }}>
                                <Image source={{ uri: item.avatar_url }} style={{ height: 100, width: 150, borderRadius: 5, margin: 6 }} />
                            </View>
                        )} />
                </View>
            </View>

        </View>

    )
}

export { ProfileScreen }
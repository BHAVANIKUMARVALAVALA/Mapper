/*  This is Mapper Project
    Screen  : Home
    Developer : Bhavanikumar V     
*/

//  Pre-built node_modules

import React, { Component } from 'react';
import {StatusBar,Image,FlatList,TouchableOpacity,ScrollView} from 'react-native';
import { View, Item, Input, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCancelEnable: false,
      repositories: [],
      repositorImage: "",
      repositorName: "",
      watchers: "",
      searchValue: ""
    }
  }

  async onChangeText(text) {
    if (text == "" || undefined) {
      await this.setState({
        isCancelEnable: false,
        searchValue: text
      })
    } else {
      await this.setState({
        isCancelEnable: true,
        searchValue : text
      })
      let baseUrl = `https://api.github.com/search/repositories?q=${text}`;
      fetch(baseUrl)
        .then((response) => response.json())
        .then(async(responseJson) => {
          let response = responseJson;
          console.log(response);
          await this.setState({
            repositories :response.items
          }) 

        })
        .catch((error) => {
          console.error(error);
        });

    }

  }


  render() {
    return (
      <View padder style={{flex:1}}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 0.2 ,justifyContent:"center" }}>
          <View>
            {
              this.state.isCancelEnable ? null : <Text style={{ fontSize: 30, margin: 10, fontWeight: '500' }}>Git Repo</Text>
            }

            <View style={{flexDirection: 'row' }}>
              <View style={this.state.isCancelEnable ? { flex: 0.7 } : { flex: 1 }}>
                <Item searchBar style={{ backgroundColor: '#DDDDDE',height: 40,borderRadius: 10,}}>
                <Icon name="search" size={30} color="#900" />
                  <Input placeholder="Search" onChangeText={text => this.onChangeText(text)} value={this.state.searchValue} />
                </Item>
              </View>
              {
                this.state.isCancelEnable ?
                  (<View style={{ flex: 0.3 }}>
                    <Button transparent onPress={()=>this.onChangeText("")}>
                      <Text>Cancel</Text>
                    </Button>
                  </View>) : null
              }

            </View>
          </View>
        </View>
        <View style={{ flex: 0.8}}>
          {
            this.state.isCancelEnable ?
              (
                <ScrollView keyboardDismissMode ="on-drag" keyboardShouldPersistTaps ='always'>                  
                <FlatList
                style={{ width: '100%' }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.repositories}
                renderItem={({ item, index }) => (
                  <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("Profile",{"userInfo":item})}}>
                  <View style={{ flex: 1, flexDirection: 'row',padding:10}}>
                  <View style={{ flex: 0.3 }}>
                    <Image source={{ uri: item.owner.avatar_url }} style={{ width: 100, height: 100 }} />
                  </View>
                  <View style={{ flex: 0.7,paddingLeft:10 }}>
                    <View>
                      <Text numberOfLines ={2}>{item.full_name}</Text>
                    </View>
                    <View>
                      <Text>{item.watchers}</Text>
                    </View>
                  </View>
                </View>
                <View style={{   width: '100%',height: 1,backgroundColor: '#D1D1D1'}}/>
                </TouchableOpacity> 
                )}
              />
              </ScrollView>
           
              )
              : (
                <View style={{ top: 200, alignItems: 'center' }}>
                  <Text style={{ color: '#1a8cff' }}>Please search any github Repo</Text>
                </View>
              )
          }
        </View>
      </View>
    );
  }

};


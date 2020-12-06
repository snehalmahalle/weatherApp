import React from 'react';

import {Header,Left,Body,Right} from 'native-base'

import { TouchableOpacity} from 'react-native';
import { Text} from 'react-native';
const HeaderComponent = (props) => {
    return (
    <Header style={{backgroundColor:'#008080'}} key={'Header'} >
        <Left style={{flex: 2,flexDirection: 'row'}}>
            {props.back?
            <TouchableOpacity onPress={() => props.goBackToPrevious()}>
            <Text style={{color:'#ffffff',fontSize:18}}> Back</Text>
             </TouchableOpacity>
             :null}
        </Left >
        <Body >
            <Text style={{color:'#ffffff',fontSize:18}}>{props.ComponentName}</Text>
        </Body>
        <Right style={{ flex: 2 }}></Right>
    </Header>
    );
  };
  
  export default HeaderComponent;

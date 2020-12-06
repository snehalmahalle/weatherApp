
import React from 'react';
import {  StyleSheet,View,Text,TextInput,TouchableOpacity, FlatList,ScrollView} from 'react-native';
import * as _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage'
import HeaderComponent from './Header'
import { Container } from 'native-base';
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const reg=/^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
const Colors={white:'#ffffff',lighter:'#ffffff',black:'#000000',dark:'#000000'};


 class citiesList  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesList: ["pune"],
      validCityName:false,
      showError:false,
      cityName:'',
      DuplicateCityName:false
    };
  }
  
  async componentDidMount(){
    let cities= await this.getCities();
    if(!!cities){
      this.setState({citiesList:cities})
    }
  }
  // save data to async storage
 saveCities = async (model) => {
    try {
      let metadata =  model
      await AsyncStorage.setItem('Cities',JSON.stringify(metadata));
    } catch (error) {
    }
  };
// get data from storage
  getCities = async () => {
  let metadata;
  try {
    metadata = await AsyncStorage.getItem('Cities');
  } catch (error) {
  }
  return JSON.parse(metadata);
}

  _handleCityName(text) {
    if(reg.test(text)){
      if(!_.includes(this.state.citiesList,text)){

        this.setState({validCityName:true,showError:false,DuplicateCityName:false,cityName:text})
      }else{
        this.setState({validCityName:true,showError:true,DuplicateCityName:true,cityName:text})
      }
    }
    else{
      if(text!==''){
      this.setState({validCityName:false,showError:true,cityName:text})
      }else
        this.setState({validCityName:false,showError:false,cityName:text})
      }
  }
  _handleAddCityName(){
    let cl=this.state.citiesList;
    cl.push(this.state.cityName);
    this.setState({citiesList:cl,cityName:''})
    this.saveCities(cl);
    this.props.actions.updateCitylist(cl);
  }
  render(){
    return (
   <Container>
      <HeaderComponent ComponentName='Home' />
        <View style={styles.container}>
          <View style={{flex:1,flexDirection:"column"}} >
            <TextInput defaultValue={''} value={this.state.cityName}
              style={styles.TextInput}
              placeholder={'Please Enter city name'}
              onChangeText={(text) => {this._handleCityName(text)}}
             >
            </TextInput>
            {!this.state.validCityName && this.state.showError?
            <Text style={styles.error}> Please enter valid city name</Text>
            : null}
            {this.state.validCityName && this.state.showError&&this.state.DuplicateCityName?
            
            <Text style={styles.error}> Duplicate city name found</Text>
            : null}
          </View>
          <TouchableOpacity onPress={(text)=>{this._handleAddCityName()}} 
          disabled={this.state.showError||!this.state.validCityName||this.state.DuplicateCityName}
          style={[(this.state.showError||!this.state.validCityName||this.state.DuplicateCityName)?{backgroundColor:'grey'}:{backgroundColor:'#008080'},styles.roundButton]}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollview} >
        <Text style={styles.predictionText}>See wheather prediction for city:</Text>

           <FlatList
            extraData={this.state} data={this.state.citiesList} style={{padding:2,paddingHorizontal:30}}
            keyExtractor={(item, index) => item.key}
            renderItem={({ item, index, separators }) => (
                                                  <View style={{marginVertical:5,padding:10,backgroundColor:'#008080',borderRadius:100}} key={index+'j'}>
                                                      <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('cityWheaterDetails',{cityName:item})}} >
                                                              <Text style={{color:'#ffffff',fontSize:20,textAlign:'center'}}  >{item}</Text>
                                                      </TouchableOpacity>
                                                  </View>
                                              )}></FlatList>
          

        </ScrollView>
        </Container>
      );}
  
}

const styles = StyleSheet.create({
  TextInput:{ borderRadius: 40,borderColor:'#000000',borderWidth:1,textAlign:'center',marginHorizontal:5},
  container:{flex:1,flexDirection:"row",padding:20,maxHeight:100,justifyContent:"space-evenly",alignContent:'space-around'},
  scrollview:{  marginTop: 0, marginBottom: 0,backgroundColor: '#fbfbfb'},
  error:{color:'red',fontSize:14,margin:1},
  predictionText:{fontSize:18,paddingHorizontal:20,paddingBottom:20,color:'#008080'},
  scrollView: {
    padding:20,
    height:500,
    width:'auto',overflow:'scroll'
  },
  roundButton:{borderWidth:1,
    borderColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:50},
});


const mapStateToProps = ({ cities }) => {
  return { cities:cities};
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(Actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(citiesList);

import AsyncStorage from "@react-native-async-storage/async-storage";

const isObject = (value) => typeof value === "object" && value !== null;

const storeData = async (key, value) => {
  try{
    if (isObject(value)){
      const jsonvalue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonvalue)
    }else{
      await AsyncStorage.setItem(key, value)
    }
  }catch(e){
    console.log(e)
  }
}

const getData = async (key) => {
  try{
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }catch(e){
    console.log(e)
  }
}

const clearAll = async() => {
  try{
    await AsyncStorage.clear()
  }catch(e){
    console.log(e)
  }
}

export default {
  storeData,
  getData,
  clearAll
}

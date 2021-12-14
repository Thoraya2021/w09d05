const instialState = {
    // here define what state i want use global
    //any state should give it key with intial value
    token: "" 
  };

  //here reducers fuction should have 2 parameters state what i give and action 
  const signIn = (state = instialState, action) => {

    //type >> here what i want if want to change in state or clear states any thing
    //payload >> contain the data what will change and contain switch cases
    const { type, payload } = action;
    //here action for what the user can do in website and i should return data from user
    switch (type) {
        //this type will send payload contian token
      case "LOGIN":
        const { token } = payload;
        localStorage.setItem("token", token);
        return { token }; // << here return token after the value change contain token for user
  

case "LOGOUT"://<< this type clear token and localstorage 
        localStorage.clear();
        return payload;
  
      default: //<<this default return state if there no any change will back for me initial value for state 
        const tokenStorage = localStorage.getItem("token");
        if (tokenStorage) return { token: tokenStorage };
        else return state;
    }
  };
  
  export default signIn; ////<< only one export default on file
  
export const login = (data) => {  ////<< here not like export defual can i define many export
    return {
      type: "LOGIN",
      payload: data,
    };
  };
  export const logout = (data) => {
    return {
      type: "LOGOUT",
      payload: data,
    };
  };
  
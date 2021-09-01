export const cartReducer=(state,action)=>{
    switch(action.type){
        
        case "ADD_TO_CART":
            return [...state,action.payload]
        case "REMOVE_FROM_CART":
            return state.filter((item)=> item.productId !== action.payload);
        case "UPDATE_QUANTITY":
            return [...state]
        case "REMOVE_ALL":
            state=[]
            return state
        default:
            return state;
    }
}
export const addressReducer=(state,action)=>{
    switch(action.type){
        case "SET_ADDRESS":
            return action.payload
        default:
            return state;
    }
}

export const searchReducer=(state,action)=>{
    switch(action.type){
        case "SEARCH":
            return action.payload
        default:
            return state;
    }
}
export const loginReducer=(state,action)=>{
    switch (action.type){
        case "AUTH":
            return action.payload;
        default:
            return state;
    }
}
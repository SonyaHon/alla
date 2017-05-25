export default (state = null, action) => {
	
	let portfolio = Object.assign({}, state);
	
	if(action.type === "UPDATE_ALL") {
		portfolio = action.payload.portfolio;
	}
	
	return portfolio;
}
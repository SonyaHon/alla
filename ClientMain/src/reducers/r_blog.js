export default (state = null, action) => {
	
	let blog = Object.assign([], state);
	
	if (action.type === "UPDATE_ALL") {
		blog = action.payload.blog;
	}
	
	return blog;
}
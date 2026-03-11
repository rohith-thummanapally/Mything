const logger = (store) => (next) => (action) => {
    //console.log('Action: ', action);
    next(action);
}
export default logger;
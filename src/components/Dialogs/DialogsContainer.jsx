import { addMessageActionCreator } from "../../redux/dialogs-reducer"
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => {

    return {
        onAddMessage: (newMessageBody) => { dispatch(addMessageActionCreator(newMessageBody)) }
    }
 }
// compose(connect(mapStateToProps,mapDispatchToProps),
//     withAuthRedirect)(Dialogs)

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);

export default compose(connect(mapStateToProps,mapDispatchToProps),
                                withAuthRedirect)(Dialogs);




// const DialogsContainer = (props) => {

//     return (
//         <StoreContext.Consumer>
//         {
//             (store) => {

//                 let state = store.getState();

//                 let onAddMessage = () => {
//                     store.dispatch(addMessageActionCreator());
//                 };

//                 let onMessageChange = (text) => {
//                     store.dispatch(updateNewMessageTextActionCreator(text));
//                 }
//                 return <Dialogs dialogsData={state.dialogsPage.dialogsData}
//                     messages={state.dialogsPage.messages}
//                     newMessageText={state.dialogsPage.newMessageText}
//                     onAddMessage={onAddMessage}
//                     onMessageChange={onMessageChange}
//                 />
//             }
//         }
//         </StoreContext.Consumer>
//     );
// }
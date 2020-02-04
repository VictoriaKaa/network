import React from 'react';
import Users from './Users';
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/users-selectors';

class UsersAPIComponent extends React.Component {
    // constructor(props) {
    //     super(props);

    // }
    // делегирование к реакт компонент конструктора можно не писать

    componentDidMount() {
        console.log("users");
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
        /*
        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.pageNumber, this.props.pageSize).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.items);
            this.props.setTotalUsersCount(response.totalCount)
        });
        */
    }

    onPageChanged = (currentPage) => {
        console.log("users update");

        const {pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);

        /*
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(response => {
            this.props.setUsers(response.items);
            this.props.toggleIsFetching(false);
        });
        */
    }

    render() {
        return <>
        { this.props.isFetching ? <Preloader /> : null}
        <Users totalItemsCount={this.props.totalItemsCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users} 
                      follow={this.props.follow} 
                      unfollow={this.props.unfollow}        
                      isFetching={this.props.isFetching}
                      followingInProgress={this.props.followingInProgress}
                      toggleFollowingProgress = {this.props.toggleFollowingProgress} />
            </>
    }
}


/*
let mapStatetoProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}
*/


let mapStatetoProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


export default compose(connect(mapStatetoProps, { follow, unfollow, setCurrentPage,
    toggleFollowingProgress, requestUsers })
    )(UsersAPIComponent)
/* let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountAC(totalUsersCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}
*/
//let withRedirect = withAuthRedirect(UsersContainer);


// export default withAuthRedirect(connect(mapStatetoProps, { follow, unfollow, setCurrentPage,
//     toggleFollowingProgress, getUsers })(UsersAPIComponent));
//     // connect автоматически оборачивает объект диспатчами
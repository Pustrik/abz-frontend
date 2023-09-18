import React from 'react';
import UserItem from "./UserItem";

const UserList = ({users, title}) => {
    if (!users.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Cant find users</h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {
                users.map((user, index) =>
                        <UserItem number={index + 1} user={user} key={user.id}/>
                )
            }
        </div>
    );
};

export default UserList;
import React, {useEffect, useState} from 'react'
import '../styles/App.css'
import {useFetching} from "../hooks/useFetching";
import UserService from "../API/UserService";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import UserForm from "../components/UserForm";
import Loader from "../components/UI/Loader/Loader";
import UserList from "../components/UserList";

function Users() {
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false);
    const [count, setCount] = useState(6)
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(true)

    const [fetchUsers, isUsersLoading, postError] = useFetching(async () => {
        const response = await UserService.getPage(count, page);
        setUsers([...users, ...response.data.users])
    });

    useEffect(() => {
        fetchUsers();
    }, [page, setPage, refresh])

    const createUser = () => {
        setUsers([])
        setModal(false);
        if(page === 1) setRefresh(!refresh);
        else setPage(1)
    }

    const moreUsers = () => {
        setPage(page+1)
    }

    return (
        <div className="App">
            <MyButton style={{margin: '20px 0'}} onClick={() => setModal(true)}>
                Create user
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <UserForm refresh={createUser} setVisible={setModal}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>

            {isUsersLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
            <UserList users={users} title={'Users'}/>
            <MyButton style={{margin: '20px 0'}} onClick={moreUsers}>More users</MyButton>
        </div>
    );
}

export default Users;

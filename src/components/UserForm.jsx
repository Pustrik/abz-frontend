import React, {useMemo, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import UserService from "../API/UserService";
import MySelect from "./UI/select/MySelect";

const UserForm = ({refresh}) => {
    const [user, setUser] = useState({name: '', email: '', phone: '', position_id: 1, photo: null})
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [positions, setPositions] = useState([]);

    useMemo(async () => {
        const pos = await UserService.getPositions()
        console.log(pos.data.positions)
        setPositions([...pos.data.positions])
    }, [])
    const addNewUser = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('photo', photo);
        formData.append('position_id', user.position_id);
        console.log(formData)
        try {
            await UserService.createUser(formData);
            setUser({name: '', email: '', phone: '', position_id: 1, photo: null})
            refresh()
        } catch (e) {
            if(typeof e.response.data.fails === 'string')
                setError(e.response.data.fails);
            else
                setError(Object.values(e.response.data.fails)[0][0])
        }
    }

    const addFile = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setPhoto(file)
        }
    }
    return (
        <form>
        {error &&  <h4 style={{color: 'red'}}>{error}<br/></h4>
        }
            <MyInput
                value={user.name}
                onChange={e => setUser({...user, name: e.target.value})}
                type='text'
                placeholder='Enter name'/>
            <MyInput
                value={user.phone}
                onChange={e => setUser({...user, phone: e.target.value})}
                type='tel'
                placeholder='Enter phone number'/>
            <MyInput
                value={user.email}
                onChange={e => setUser({...user, email: e.target.value})}
                type='email'
                placeholder='Enter email'/>
            <MySelect
                options={positions}
                onChange={position => setUser({...user, position_id: position})}
                defaultOption={'Choose position'}
                value={user.position_id}
            ></MySelect>
            <MyInput
                value={user.photo}
                onChange={e => addFile(e)}
                type='file'
                placeholder='Add photo'/>
            <MyButton onClick={addNewUser}>Create user</MyButton>
        </form>
    );
};

export default UserForm;
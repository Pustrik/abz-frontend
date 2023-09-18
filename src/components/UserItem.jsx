import React from 'react';

const UserItem = (props) => {
    return (
        <div>
            <div className={'user'}>
                <div className={'user_content'}>
                    <strong>{props.number}. {props.user.name}</strong>
                    <hr style={{margin: '15px 0'}}/>

                    <div>
                        Phone: {props.user.phone}
                    </div>
                    <div style={{margin: '15px 0'}}>
                        Email: {props.user.email}
                    </div>
                    <div>
                        Position: {props.user.position}
                    </div>
                </div>
                <img
                    src={props.user.photo}
                    style={{ width: '13%' }}  // Пример стилей для изображения
                />
            </div>
        </div>
    );
};

export default UserItem;
import React from 'react'

const Profile = ({stopSubmit}) => (
    <div className='Main__content'>
        <div className="Main__page">
            <div className="Main__page-title Main__page-title_center">
                Профиль
            </div>

            <form className="Main__form Main__form_large">
                <div className="Main__card-area">
                    <div className="Main__card">
                        <input className="Main__form-input" type="text" placeholder="Номер карты *"/>
                        <input className="Main__form-input" type="text" placeholder="Срок действия *"/>
                    </div>
                    <div className="Main__card">
                        <input className="Main__form-input" type="text" placeholder="Имя владельца *"/>
                        <input className="Main__form-input" type="text" placeholder="CVC *"/>
                    </div>
                </div>
                <button className="Main__form-submit Main__form-submit_center" onClick={stopSubmit}>Сохранить</button>
            </form>
        </div>
    </div>
)

export default Profile
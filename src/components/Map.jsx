import React from 'react'

const Map = ({stopSubmit}) => (
    <div className='Main__content'>
        <div className="Main__page">
            <div className="Main__page-title">
                Карта
            </div>
            <form className="Main__form">
                <input className="Main__form-input" type="text" placeholder="Откуда *"/>
                <input className="Main__form-input" type="text" placeholder="Куда *"/>
                <button className="Main__form-submit" onClick={stopSubmit}>Вызвать такси</button>
            </form>
        </div>
    </div>
)

export default Map
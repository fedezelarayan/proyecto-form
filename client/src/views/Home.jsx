import React from 'react';
import NavBar from './NavBar';
import style from './Home.module.css'

function Home() {
    return (
            <div className={style.container}>
                <h1 className={style.h1}>General Surveys</h1>
                <NavBar/>
            </div>
    );
}

export default Home;
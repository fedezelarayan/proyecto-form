import React from 'react';
import { Link, useHistory} from "react-router-dom";
import { getByName } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import style from './NavBar.module.css'

function NavBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");

    const searchHandler = (event) => {
        event.preventDefault()
        setName(event.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const result = dispatch(getByName(name));
        
        if(result) { 
            history.push('/edit'); 
        } else {
            alert("Todavia no realizaste la encuesta!")
        }

        setName('');
    }

    return (
        <nav>
            <nav>
                <Link to="/survey"><button className={style.button}>Realizar encuesta aquí...</button></Link>
                <Link to="/surveys"><button className={style.button}>Encuestas</button></Link>
                <nav>
                    <input 
                    id="search" 
                    type="text" 
                    placeholder="Nombre completo..." 
                    onChange={(event) => { searchHandler(event) }}
                    className={style.searchinput} />
                    <button 
                    type="submit"  className={style.searchbutton}><i onClick={(event) => { submitHandler(event); setName('') }}>Editá aquí</i></button>
                </nav>
            </nav>
        </nav>
    );
}

export default NavBar;
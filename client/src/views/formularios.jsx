import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSurveys } from "../Redux/actions";
import style from './formularios.module.css'

const Formularios = () => {
    const dispatch = useDispatch();
    const allSurveys = useSelector((state) => state.surveys) 

    useEffect(() => {
        dispatch(getSurveys())
    },[])

    return (
        <div>
            <div className={style.container}>
            <Link to="/"><button className={style.backbutton}><i>Salir</i></button></Link>
                {allSurveys.map(survey => (
                    <div className={style.container}>                   
                    <h1 className={style.container}>Nombre completo: {survey.full_name}</h1>
                    <h3>Número de telefono: {survey.phone_number}</h3>
                    <h3>Fecha de inicio: {survey.start_date}</h3>
                    <h3>Lenguaje Favorito: {survey.Languages[0].name}</h3>
                    <h3>Cómo nos conoció: {survey.HowFounds[0].name}</h3>
                    <hr />
                    </div>

                )) }
            </div>
        </div>
       
    )
}

export default Formularios;
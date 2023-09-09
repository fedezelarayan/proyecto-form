import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHowFound, getLanguages } from "../Redux/actions"
import style from './form.module.css';
import axios from "axios";


const Edit = () => {
    const dispatch = useDispatch();
    const survey = useSelector((state) => state.surveys)
    const allLanguages = useSelector((state => state.languages));
    const allHowFound = useSelector((state => state.howfound));
    const surveyToEdit = survey.length > 0 ? survey[0] : null;

    useEffect(() => {
        dispatch(getLanguages())
        dispatch(getHowFound())
    }, [dispatch])

    const [form, setForm] = useState({
        full_name: surveyToEdit ? surveyToEdit.full_name : "",
        phone_number: surveyToEdit ? surveyToEdit.phone_number : "",
        start_date: surveyToEdit ? surveyToEdit.start_date : "",
        preferred_language: surveyToEdit ? surveyToEdit.Languages[0]?.name : "" ,
        how_found: surveyToEdit ? surveyToEdit.HowFounds[0]?.name : ""
    })
    console.log(survey);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put("http://localhost:3001/survey/edit", form)
    }

    const changeLang = (event) => {
        const selectedValue = event.target.value;
        setForm({
            ...form,
            preferred_language: selectedValue
        });
    }
    const changeHF = (event) => {
        const selectedValue = event.target.value;
        setForm({
            ...form,
            how_found: selectedValue
        });
    }

    return (
        <div className={style.container}>
            <Link to="/"><button className={style.backbutton}><i>Salir</i></button></Link>
            <div>
                <h1 className={style.h1}>Edita tu formulario!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="full_name" className={style.label}>Nombre completo:</label>
                        <input
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleInputChange}
                            className={style.input}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className={style.label}>Numero de telefono:</label>
                        <textarea
                            id="phone_number"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleInputChange}
                            className={style.input}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="start_date" className={style.label}>Fecha de inicio:</label>
                        <textarea
                            id="start_date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleInputChange}
                            className={style.input}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="preferred_language" className={style.label}>Cuál es tu idioma preferido?:</label>
                        <input type=""
                            value={form.preferred_language}
                            onChange={handleInputChange}
                            name="preferred_language"
                            className={style.input}
                        />
                         <select  onChange={changeLang} 
                            multiple={5}>
                            <option value="all"
                                name="preferres_language"></option>{
                                allLanguages?.map((lang) => {
                                    return <option key={lang.id}
                                        value={lang.id}>{lang.name}</option>
                                })
                            }
                        </select> 
                    </div>
                    <div>
                        <label htmlFor="how_found" className={style.label}>Cómo nos conociste?:</label>
                        <input type=""
                            value={form.how_found}
                            onChange={handleInputChange}
                            name="how_found"
                            className={style.input}
                        />
                        <select  onChange={changeHF} 
                            multiple={5}>
                            <option value="all"
                                name="how_found"></option>{
                                allHowFound?.map((hf) => {
                                    return <option key={hf.id}
                                        value={hf.id}>{hf.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className={style.button}>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
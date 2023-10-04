
import { Link, useNavigate } from 'react-router-dom'
import r from './Register.module.scss'
import logo from '../img/logoReg.svg'
import axios from 'axios';

export default function ShippedTwo () {

    return (

        <>

        <div className={r.section__register}>
                
                <div className={r.register}>
                    
                    <img src={logo} className={r.register__logo} alt="svg" />

                    <p className={r.ship__title}>
                    Пароль успешно изменен 
                    </p>

                    <Link to={'/'} className={r.ship__codeBlue}>
                    Вернуться на главный экран
                    </Link>

                </div>

            </div>

        </>

    )
}
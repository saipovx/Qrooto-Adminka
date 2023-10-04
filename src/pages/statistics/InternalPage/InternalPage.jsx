
import i from './InternalPage.module.scss'
import navig from './Group.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import s from '../Statistics.module.scss'
import { Link } from 'react-router-dom'

export default function InternalPage ({campId}) {
    
    const navigate = useNavigate()

    const navigatePush = () => {

      navigate(-1)

    }

    const [storedCampIdData, setStoredCampIdData] = useState([]);

    useEffect(() => {

        const data = localStorage.getItem('campData');
        
        if (data) {
          setStoredCampIdData(JSON.parse(data));
        }
        
      }, []);

      console.log(storedCampIdData);

      const TableInfoAds = storedCampIdData.ads

    
    return (
        
        <>
        
        <section className={i.section__internal}>
            
            <div className="container">
                
               <div className={i.inter}>
                
                <div className={i.inter__box} onClick={navigatePush}>
                    <img src={navig} alt="svg" />
                </div>

                <div className={i.inter__info}>

                    <p className={i.inter__info__title}>
                        {storedCampIdData.title}
                    </p>

                    <div className={i.inter__info__hr}></div>

                    <div className={i.inter__info__flex}>
                        
                        <div className={i.inter__info__flex__item}>
                            
                            <p className={i.inter__info__flex__item__title}>
                            Основная информация
                            </p>

                            <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                О бренде
                                </p>
                                
                                <p className={i.inter__info__flex__item__arr__title}>
                                {storedCampIdData.about_brand}
                                </p>

                            </div>

                            <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                Задача
                                </p>
                                
                                <p className={i.inter__info__flex__item__arr__title}>
                                {storedCampIdData.task}
                                </p>

                            </div>

                             <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                Аудитория
                                </p>
                                
                                <p className={i.inter__info__flex__item__arr__title}>
                                {storedCampIdData.segment}
                                </p>

                            </div>

                             <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                Mодель
                                </p>
                                
                                <p className={i.inter__info__flex__item__arr__title}>
                                {storedCampIdData.model}
                                </p>

                            </div>

                             <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                Интересы
                                </p>
     

<div className={i.inter__info__flex__item__arr__border}>

    {storedCampIdData && storedCampIdData.interests && (
        storedCampIdData.interests.map((item, index) => (
            <p key={index} className={i.inter__info__flex__item__arr__border__title}>
                {item}
            </p>
        ))
    )}
    
</div>

                            </div> 

                        </div>

                        <div className={i.inter__info__flex__item}>
                            
                            <p className={i.inter__info__flex__item__title}>
                            Информация об аудитории
                            </p>

                            <div className={i.inter__info__flex__item__arr}>
                                
                            <p className={i.inter__info__flex__item__arr__text}>
                            Типы перекрестных промо
                            </p>

<div className={i.inter__info__flex__item__arr__border}>

    {storedCampIdData && storedCampIdData.cross_promo_types && (
        storedCampIdData.cross_promo_types.map((item, index) => (
            <p key={index} className={i.inter__info__flex__item__arr__border__title}>
                {item}
            </p>
        ))
    )}

</div>


                            </div>

                             <div className={i.inter__info__flex__item__arr}>

                                <p className={i.inter__info__flex__item__arr__text}>
                                Бюджет
                                </p>
                                
                                <p className={i.inter__info__flex__item__arr__title}>
                                {storedCampIdData.cpc_budget}
                                </p>

                            </div>

                        </div>
 
                    </div>

                </div>

               </div>

<table className={s.static__table}>

  <thead className={s.static__table__thead}>

    <tr>

      <th className={s.static__table__thead__titleTwo}>Название</th>
      <th className={s.static__table__thead__titleTwo}>Описания</th>
      <th className={s.static__table__thead__title}>Ссылка</th>

    </tr>

  </thead>

  <tbody className={s.static__table__tbody}>

  {Array.isArray(TableInfoAds) && TableInfoAds.length > 0 ? (

    TableInfoAds.map((item) => (

      <tr style={{ borderBottom: '1px solid #EBEDF5' }} className={s.static__table__tbody__tr} >

        <td className={s.static__table__tbody__subtitleTwo}>
          {item.title} 
        </td>

        <td className={s.static__table__tbody__subtitle}>{item.text}</td>

        <td className={s.static__table__tbody__subtitle}>

            <Link to={item.link} target='_blank'>
            {item.link}
            </Link>

        </td>

      </tr>
    ))

    ) : (

    <tr>
        <td colSpan="5">Нет данных для отображения</td>
    </tr>

    )}

  </tbody>

</table>


            </div>

        </section>

        </>
        
    )
}
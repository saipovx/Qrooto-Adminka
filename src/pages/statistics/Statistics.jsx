import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import s from './Statistics.module.scss'
import Select from 'react-select';
import { Button, DatePicker } from 'antd';

import setting from './img/setting.svg'
import setbar from './img/setbar.svg'
import setting__title from './img/setting__title.svg'

import title_bar1 from './img/title_bar1.svg'
import title_bar2 from './img/title_bar2.svg'
import title_bar3 from './img/title_bar3.svg'
import array from './img/array.svg'

import Group from './img/Group.svg'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TableItem from './TableItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Statisticss () {

  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem('access_token');

  const [VenuesData, setStaticData] = useState([])

  const { refreshToken } = useAuth();

  const [currentWeek, setCurrentWeek] = useState(true);

  const [startDate, setStartDate] = useState(''); 

  const [endDate, setEndDate] = useState('');

  const [activeFunction, setActiveFunction] = useState('previousWeek');

  

  const fetchData = async () => {

    if (!startDate || !endDate) {
      return; // Не отправляем запрос, если даты не выбраны
    }
 
    const loginEndpoint = `/api/statistic/by_date?start_date=${startDate}&end_date=${endDate}`;

    const url = `${apiUrl}${loginEndpoint}`;

    try {
      const response = await axios.get(url, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },

        params: {
          start_date: startDate,
          end_date: endDate,
        },

      });

      setStaticData(response.data);

    } catch (error) {

      if (error.response && error.response.status === 401) {
        refreshToken();
      }

    }

      const loginEndpointTwo = `/api/statistic/by_campaign`;
  
      const urlTwo = `${apiUrl}${loginEndpointTwo}`;

      try {

        const response = await axios.get(urlTwo, {
  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
  
          params: {
            start_date: startDate,
            end_date: endDate,
          },
  
        });
  
        setAdvertisingData(response.data);
  
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshToken();
        }
      }

      const loginEndpointThree = `/api/statistic/by_site?`;
  
      const urlThree = `${apiUrl}${loginEndpointThree}`;
      
      try {
        const response = await axios.get(urlThree, {
  
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
  
          params: {
            start_date: startDate,
            end_date: endDate,
          },
  
        });
  
        setSiteData(response.data);
  
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshToken();
        }
      }



  };

  const [AdvertisingData, setAdvertisingData] = useState([])

  const AdvertisingDataType = AdvertisingData

  const [SiteData, setSiteData] = useState([])

  console.log(SiteData);


  const handleCurrentWeekClick = () => {

    setActiveFunction('currentWeek');

    setCurrentWeek(true);
  
    const currentDate = new Date();

    const dayOfWeek = currentDate.getDay();
  
    if (dayOfWeek === 0) {
      currentDate.setDate(currentDate.getDate() - 7);
    }
  
    const startDate = new Date(currentDate);

    startDate.setDate(currentDate.getDate() - dayOfWeek + 1);
  
    const endDate = new Date(currentDate);

    endDate.setDate(startDate.getDate() + 6);
  
    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
  
    fetchData();
  };
  

  const handlePreviousWeekClick = () => {

    setCurrentWeek(true);

    setActiveFunction('previousWeek');
  
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const startDate = new Date(currentDate);
  
    startDate.setDate(currentDate.getDate() - 14);
  
    endDate.setDate(currentDate.getDate() - 7);
  
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
  
    setStartDate(startDateString);
    setEndDate(endDateString);
  
    fetchData();

  };

  const handleLast7DaysClick = () => {

    setCurrentWeek(false);

    setActiveFunction('last7Days');
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const startDate = new Date(currentDate);
  
    startDate.setDate(currentDate.getDate() - 7);
  
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
  
    setStartDate(startDateString);
    setEndDate(endDateString);
  
    fetchData();

  };

  const handleLast30DaysClick = () => {

    setCurrentWeek(false);

    setActiveFunction('last30Days');
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const startDate = new Date(currentDate);
  
    startDate.setDate(currentDate.getDate() - 30);
  
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
  
    setStartDate(startDateString);
    setEndDate(endDateString);
  
    fetchData();

  };

  const handleLast3MonthsClick = () => {

    setCurrentWeek(false);

    setActiveFunction('last3Months');
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const startDate = new Date(currentDate);
  
    startDate.setMonth(currentDate.getMonth() - 3);
  
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
  
    setStartDate(startDateString);
    setEndDate(endDateString);
  
    fetchData();

  };

  const handleLastYearClick = () => {

    setCurrentWeek(false);

    setActiveFunction('lastYear');
  
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    const startDate = new Date(currentDate);
  
    startDate.setFullYear(currentDate.getFullYear() - 1);
  
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
  
    setStartDate(startDateString);
    setEndDate(endDateString);
  
    fetchData();

  };

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedDateEnd, setSelectedDateEnd] = useState(null);


  const handleDateChangeStart = (date, dateString) => {
    setSelectedDate(date);
    fetchData(date, selectedDate);
  };

  const handleDateChangeEnd = (date, dateString) => {
    setSelectedDateEnd(date);
    fetchData(selectedDateEnd, date);
  };

  useEffect(() => {
    // В зависимости от активной функции вызываем соответствующую функцию
    switch (activeFunction) {

      case 'currentWeek':
        handleCurrentWeekClick();
        break;
      case 'previousWeek':
        handlePreviousWeekClick();
        break;
      case 'last7Days':
        handleLast7DaysClick();
        break;
      case 'last30Days':
        handleLast30DaysClick();
        break;
      case 'last3Months':
        handleLast3MonthsClick();
        break;
      case 'lastYear':
        handleLastYearClick();
        break;
      default:

        handleCurrentWeekClick();

        break;
    }
  }, [activeFunction]);

  

  const labels = VenuesData.map((item) => item.date.split('T')[0]);

  const clickCountData = VenuesData.map((item) => item.click_count);
  const displayCountData = VenuesData.map((item) => item.display_count);
  const expensesData = VenuesData.map((item) => item.expenses);
  const revenueData = VenuesData.map((item) => item.revenue);

  const ctrData = VenuesData.map((item) => item.ctr * 100 );

  const cpcData = VenuesData.map((item) => item.cpc);
  const cpmData = VenuesData.map((item) => item.cpm);

  const clickCountDataset = {
    label: '',
    data: clickCountData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };
  
  const displayCountDataset = {
    label: '',
    data: displayCountData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };
  
  const expensesDataset = {
    label: '',
    data: expensesData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };
  
  const revenueDataset = {
    label: '',
    data: revenueData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };

  const ctrDataset = {
    label: '%',
    data: ctrData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };

  const cpcDataset = {
    label: '',
    data: cpcData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };

  const cpmDataset = {
    label: '',
    data: cpmData,
    borderColor: '#6792FF',
    backgroundColor: '#6792FF',
  };


  const data = {
    labels: labels,
    datasets: [clickCountDataset],
  };

  const displayCount_data = {
    labels: labels,
    datasets: [displayCountDataset],
  };  

  const expenses_Data = {
    labels: labels,
    datasets: [expensesDataset],
  }; 

  const revenue_Data = {
    labels: labels,
    datasets: [revenueDataset],
  }; 

  const ctr_Data = {
    labels: labels,
    datasets: [ctrDataset],
  }; 

  const cpc_Data = {
    labels: labels,
    datasets: [cpcDataset],
  }; 

  const cpm_Data = {
    labels: labels,
    datasets: [cpmDataset],
  }; 









    const optionsThree = [

        { value: 'option1', label: 'Опция 1' },
        { value: 'option2', label: 'Опция 2' },
        { value: 'option3', label: 'Опция 3' },

    ];

      const customStyles = {

        control: (provided) => ({
          ...provided,
          border: '1px solid var(--interface-seventh, #EBEDF5)',
          borderRadius: '8px',
          Color: '#1B1C1F',
        }),

        option: (provided, state) => ({

          ...provided,
          backgroundColor: state.isSelected ? '#007bff' : 'white',
          color: state.isSelected ? 'white' : 'black',
        }),

      };

      const [selectedOption, setSelectedOption] = useState(null); // Изначально выбранной опции нет

      const handleSelectChange = (selectedOption) => {

        setSelectedOption(selectedOption);

      };


      const DataStyle = {
        color: 'black',
        marginBottom: '0',
        height: '38px' ,
        border: '1px solid var(--interface-seventh, #EBEDF5)',
      };


      const optionsTwo = [

        { value: 'option1', label: 'Опция 1' },
        { value: 'option2', label: 'Опция 2' },
        { value: 'option3', label: 'Опция 3' },

    ];

    const customStylesTwo = {

      control: (provided) => ({
        ...provided,
        border: '1px solid var(--interface-seventh, #EBEDF5)',
        borderRadius: '8px',
        Color: '#1B1C1F',
        zIndex: 0,
        
      }),

      option: (provided, state) => ({

        ...provided,
        backgroundColor: state.isSelected ? '#007bff' : 'white',
        color: state.isSelected ? 'white' : 'black',
      }),

    };

    const [selectedOptionTwo, setSelectedOptionTwo] = useState(null); 

    const handleSelectChangeTwo = (selectedOptionTwo) => {

      setSelectedOptionTwo(selectedOptionTwo);

    };

    const [showContent, setShowContent] = useState(false);

    const MouseHandle = () => {
      setShowContent(!showContent)
    }

    // функция открывания chekboxTable

    const [chekboxTable, setchekboxTable] = useState(false)

    const chekboxTableHandle = () => {
      setchekboxTable(!chekboxTable)
    }

    const navigate = useNavigate()

    const navigatePush = () => {

      navigate('/InternalPage')

      localStorage.setItem('staticData', );

    }

    const handleCampaignTitleClick = (item) => {

      localStorage.setItem('selectedCampaign', JSON.stringify(item));
  
      navigate(`/campaign-details/${item.campaign_id}`);

    };

    const handleCampaignTitleClickSyte = (item) => {

      localStorage.setItem('selectedSyte', JSON.stringify(item));
  
      navigate(`/syte-details/${item.site_id}`);

    };

    useEffect(() => {

      fetchData();

  }, [startDate, endDate]);




    return (
        
        <>
        
        <section className={s.section__static} >
            
            <div className="container">

              <div className={s.static__title}>

               <p className={s.static__title__p}>
               Моя статистика
               </p>
                
                <div className= { showContent ? [s.static__title__fon ,s.static__title__fon__active].join(' ') : [s.static__title__fon]} onClick={MouseHandle}>

                <img src={setting__title} className= { showContent ? [s.static__title__svg ,s.static__title__svg__active].join(' ') : [s.static__title__svg] } alt="svg"/>

                </div>


                {showContent && 

                <div className={s.static__title__info}>
                
                  <div className={s.static__title__info__item}>

                    <img src={title_bar1} alt="" />
                    
                    <p className={s.static__title__info__item__title}>
                    Переименовать
                    </p>

                  </div>

                  <div className={s.static__title__info__item}>

                    <img src={title_bar2} alt="" />
                    
                    <p className={s.static__title__info__item__title}>
                    Дублировать
                    </p>

                  </div>

                  <div className={s.static__title__info__item}>

                    <img src={title_bar3} alt="" />
                    
                    <p className={s.static__title__info__item__title}>
                    Удалить
                    </p>

                  </div>

                </div>

                }

              </div>
                
                <div className={s.static__header} >
                    
                    <div className={s.static__header__one}>
                       
                        <button className={activeFunction === 'currentWeek' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]} onClick={handleCurrentWeekClick}>Неделя</button>

                        <button onClick={handlePreviousWeekClick} className={activeFunction === 'previousWeek' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]}>Прошлая неделя</button>

                        <button onClick={handleLast7DaysClick} className={activeFunction === 'last7Days' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]}>Последние 7 дней</button>

                        <button onClick={handleLast30DaysClick} className={activeFunction === 'last30Days' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]}>Месяц</button>

                        <button onClick={handleLast3MonthsClick} className={activeFunction === 'last3Months' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]}>Квартал</button>

                        <button onClick={handleLastYearClick} className={activeFunction === 'lastYear' ? [s.static__header__one__title , s.static__header__one__title__active].join(' ') : [s.static__header__one__title]}>Год</button>

                    </div>

                {/* <Select
                    options={optionsThree}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className={s.static__header__select}
                    isClearable={true}
                    styles={customStyles}
                    placeholder="Детализация по дням" 
                /> */}


                <DatePicker onChange={handleDateChangeStart} style={DataStyle} placeholder='Oт'/>

                <DatePicker onChange={handleDateChangeEnd} style={DataStyle} placeholder='До'/>


                </div>

                {/* <div className={s.static__center}>
                  
                  <p className={s.static__center__title}>
                  Партнеры
                  </p>

                  <Select
                    options={optionsTwo}
                    value={selectedOptionTwo}
                    onChange={handleSelectChangeTwo}
                    className={s.static__center__select}
                    isClearable={true}
                    styles={customStylesTwo}
                    placeholder="Все" 
                />



                </div>

                <div className={s.static__footer}>
                  
                  <p className={s.static__center__title}>
                  Тип бизнеса
                  </p>

                  <div className={s.static__footer__one}>
                    
                     <p className={s.static__header__one__title}>Кросс-промо</p>

                     <p className={s.static__header__one__title}>CPC</p>

                     <p className={s.static__header__one__title}>Все</p>

                  </div>

                </div> */}

            </div>

        </section>

        <div className='section__staticTwo'>
          
          <div className="container">

            <p className='title'>Статистики по дате</p>

            <div className='static__flex'>

            <div className='staticTwo__footer'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>Kоличество кликов</p>

              </div>

              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={data}  style={{ zIndex: -1 }} />


            </div>

            <div className='staticTwo__footer'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>Количество показов баннеров</p>

              </div>


              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={displayCount_data}  style={{ zIndex: -1 }} />

            </div>

            </div>

            <div className='static__flex'>

            <div className='staticTwo__footer'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>Расходы рекламодателя</p>

              </div>


              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={expenses_Data}  style={{ zIndex: -1 }} />

            </div>

            <div className='staticTwo__footer'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>Заработок площадки</p>

              </div>

              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={revenue_Data}  style={{ zIndex: -1 }} />

            </div>

            </div>  

            <div className='static__flex'>

            <div className='staticTwo__footerTwo'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>CPM</p>

              </div>

              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={cpm_Data}  style={{ zIndex: -1 }} />

            </div>

            <div className='staticTwo__footerTwo'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>CTR</p>

              </div>


              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={ctr_Data}  style={{ zIndex: -1 }} />

            </div>

            <div className='staticTwo__footerTwo'>

              <div className='static__header__info'>

                <p className='static__header__info__title'>CPC</p>

              </div>


              <div className='staticTwo__header__setting'>
                
                <img src={setting} alt="" />

                <img src={setbar} alt="" />

              </div>

              <Line data={cpc_Data}  style={{ zIndex: -1 }} />

            </div>
              
            </div>          

      {/* <div className={s.static__table__header}>
      
      <p className={s.static__table__header__title}>
      Заголовок раздела с таблицей
      </p>

      <label className={s.static__table__header__btn} onClick={chekboxTableHandle}>
        
        <p className={s.static__table__header__btn__title}>
        Настроить строки и столбцы
        </p>

        <img src={Group} alt=""
        
        className={ chekboxTable ? [s.static__table__header__btn__img , s.static__table__header__btn__img__active].join(' ') : [s.static__table__header__btn__img] }

        />
      </label>
        
      </div> */}

      {/* // открывание пункта изменений */}

      {/* {chekboxTable && 

      <div className={ chekboxTable ? [s.static__punkt , s.static__punkt__active].join(' ') : [s.static__punkt , s.static__punkt__false].join(' ')  } >

        <button className={s.static__punkt__btn}>
        Выбрать все
        </button>

      <div className={s.static__flex}>
        
        <div className={s.static__punkt__item}>
          
          <p className={s.static__punkt__item__title}>
          Строки
          </p>
          
          {info.map((info, index) => {
              return <TableItem {...info} />
          })}

        </div>

        <div className={s.static__punkt__item}>
          
          <p className={s.static__punkt__item__title}>
          Столбцы
          </p>

          {info.map((info, index) => {
              return <TableItem {...info} />
          })}

          <div className={s.static__punkt__item__hr}></div>

          <label className={s.static__punkt__item__label}>

            <input type="checkbox" className={s.static__punkt__item__label__checkbox} />

            <p className={s.static__punkt__item__label__title}>Динамика показателя в сравнении с предыдущим аналогичным периодом (%)</p>

          </label>

        </div>

      </div> 

      <div className={s.static__punkt__buttons}>

      <button className={s.static__punkt__buttons__btnNostyle}>
      Отменить
      </button>

      <button className={s.static__punkt__buttons__btn}>
      Применить
      </button>

      </div>  

      </div>  

      }  */}

      <p className='title'>Статистика по кампаниям</p>

      <table className={s.static__table}>

        <thead className={s.static__table__thead}>

          <tr>
            <th className={s.static__table__thead__titleTwo}>Название</th>
            <th className={s.static__table__thead__titleTwo}>Соц-сеть</th>
            <th className={s.static__table__thead__titleTwo}>Ссылка</th>
            <th className={s.static__table__thead__titleTwo}>Kоличество кликов</th>
            <th className={s.static__table__thead__title}>Стоимость клика</th>
            <th className={s.static__table__thead__title}>CPM</th> 
            <th className={s.static__table__thead__title}>CTR</th> 

            <th className={s.static__table__thead__title}>Количество показов баннеров</th> 
            <th className={s.static__table__thead__title}>Расходы рекламодателя</th> 
            <th className={s.static__table__thead__title}>Заработок площадки</th> 

          </tr>

        </thead>

        <tbody className={s.static__table__tbody}>
          

          {AdvertisingDataType.map((item) => (

            

            <tr style={{ borderBottom: '1px solid #EBEDF5' }} className={s.static__table__tbody__tr} key={item.campaign_id}>

              
              <td className={s.static__table__tbody__subtitle} onClick={() => handleCampaignTitleClick(item)} >{item.campaign_title}</td>

              <td className={s.static__table__tbody__subtitle}>{item.site.name}</td>

              <td className={s.static__table__tbody__subtitle}>

                <Link to={item.site.URL} target='_blank'>
                {item.site.URL}
                </Link>
                
              </td>

              <td className={s.static__table__tbody__subtitle}>{item.click_count}</td>

              <td className={s.static__table__tbody__subtitle}>{item.cpc}</td>

              <td className={s.static__table__tbody__subtitle}>{item.cpm}</td>

              <td className={s.static__table__tbody__subtitle}>{(item.ctr * 100).toFixed(2)}%</td>

              <td className={s.static__table__tbody__subtitle}>{item.display_count}</td>

              <td className={s.static__table__tbody__subtitle}>{item.expenses}</td>

              <td className={s.static__table__tbody__subtitle}>{item.revenue}</td>



            </tr>

          ))}

        </tbody>


      </table>

      <p className='title'>Статистика по сайтам</p>

      <table className={s.static__table}>

        <thead className={s.static__table__thead}>

          <tr>
            
            <th className={s.static__table__thead__titleTwo}>Название</th>
            <th className={s.static__table__thead__titleTwo}>Ссылка</th>
            <th className={s.static__table__thead__titleTwo}>Kоличество кликов</th>
            <th className={s.static__table__thead__title}>Стоимость клика</th>
            <th className={s.static__table__thead__title}>CPM</th> 
            <th className={s.static__table__thead__title}>CTR</th> 

            <th className={s.static__table__thead__title}>Количество показов баннеров</th> 
            <th className={s.static__table__thead__title}>Расходы рекламодателя</th> 
            <th className={s.static__table__thead__title}>Заработок площадки</th> 

          </tr>

        </thead>

        <tbody className={s.static__table__tbody}>

          {SiteData.map((item) => (

            

            <tr style={{ borderBottom: '1px solid #EBEDF5' }} className={s.static__table__tbody__tr} key={item.site_id}>

            <td className={s.static__table__tbody__subtitle} onClick={() => handleCampaignTitleClickSyte(item)}>{item.site.name}</td>
              
              {/* <td className={s.static__table__tbody__subtitle}>{item.site.name}</td> */}

              <td className={s.static__table__tbody__subtitle}>

                <Link to={item.site.URL} target='_blank'>
                {item.site.URL}
                </Link>
                
              </td>

              <td className={s.static__table__tbody__subtitle}>{item.click_count}</td>

              <td className={s.static__table__tbody__subtitle}>{item.cpc}</td>

              <td className={s.static__table__tbody__subtitle}>{item.cpm}</td>

              <td className={s.static__table__tbody__subtitle}>{(item.ctr * 100).toFixed(2)}%</td>

              <td className={s.static__table__tbody__subtitle}>{item.display_count}</td>

              <td className={s.static__table__tbody__subtitle}>{item.expenses}</td>

              <td className={s.static__table__tbody__subtitle}>{item.revenue}</td>



            </tr>

          ))}

        </tbody>


      </table>      

          </div>

        </div>

        
        </>


    )
    
}
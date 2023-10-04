import h from '../Header/Header.module.scss'
import logo from './Logo.svg'
import group from './Group.svg'
import user from '../img/User.svg'
import { useEffect, useRef, useState } from 'react'

import item1 from '../img/item1.svg'
import item2 from '../img/item2.svg'
import item3 from '../img/item3.svg'
import item4 from '../img/item4.svg'
import item5 from '../img/item5.svg'
import item6 from '../img/item6.svg'
import Mod from './mod.png'
import bar6  from '../img/bar6.svg'
import bar7  from '../../pages/statistics/img/Рекламодатели.svg'
import bar8  from '../../pages/statistics/img/Площадка.svg'
import bar9  from '../../pages/statistics/img/Аукционы.svg'
import bar10  from '../../pages/statistics/img/Рекламные.svg'
import User from './user.svg'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../AuthContext'


export default function Header ({userPrav,SuperUser}) {


    const [AdminActive, setAdminActive] = useState(false)


    const AdminActiveFalse = () => {
        setAdminActive(!AdminActive)
        
        setbalanceHandle(false)
        setShowContent(false);
        setShowContentTwo(false);
        setShowContentThree(false);
        setShowContentfive(false);
        setShowContentfour(false);
        setburgerActive(false)


    }

  const [showContent, setShowContent] = useState(false);

  const [showContentTwo, setShowContentTwo] = useState(false);

  const [showContentThree, setShowContentThree] = useState(false);

  const [showContentfour, setShowContentfour] = useState(false);

  const [showContentfive, setShowContentfive] = useState(false);

  const [showContentsix, setShowContentsix] = useState(false);


  const [balanceHandle, setbalanceHandle] = useState(false);

  const timerRef = useRef(null);

  const balanceOne = () => {

    setbalanceHandle(true)
    setShowContentsix(false)
    setShowContent(false);
    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContentfive(false);
    setShowContentfour(false);
    setAdminActive(false)

    clearTimeout(timerRef.current); 
  };

  const balanceOneClose = () => {

    timerRef.current = setTimeout(() => {
        setbalanceHandle(false)
    }, 500); 

    setShowContentTwo(false);
    setShowContent(false);
    setShowContentThree(false);
    setShowContentfive(false);
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentsix(false)


  };

  const handleMouseEnter = () => {
    setShowContent(true);

    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContentfive(false);
    setShowContentfour(false);
    setbalanceHandle(false)
    setAdminActive(false)
    setShowContentsix(false)


    clearTimeout(timerRef.current); 
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowContent(false);
    }, 500); 

    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContentfive(false);
    setShowContentfour(false);
    setAdminActive(false)
    setbalanceHandle(false)
    setShowContentsix(false)


  };

  const MouseTwo = () => {
    setShowContentTwo(true);

    setShowContent(false);
    setShowContentfour(false);
    setShowContentfive(false);
    setAdminActive(false)
    setShowContentThree(false);
    setbalanceHandle(false)
    setShowContentsix(false)


    clearTimeout(timerRef.current); 
  };

  const MouseLeaveTwo = () => {
    timerRef.current = setTimeout(() => {
      setShowContentTwo(false);
    }, 500); 

    setShowContent(false);
    setShowContentThree(false);
    setShowContentfive(false);
    setAdminActive(false)
    setShowContentfour(false);
    setbalanceHandle(false)
    setShowContentsix(false)


  };

  const MouseThree = () => {

    setShowContentTwo(false);
    setShowContent(false);
    setShowContentfour(false);
    setShowContentfive(false);
    setAdminActive(false)
    setbalanceHandle(false)
    setShowContentsix(false)

    setShowContentThree(true);
    clearTimeout(timerRef.current); 
  };

  const MouseLeaveThree = () => {

    timerRef.current = setTimeout(() => {
      setShowContentThree(false);
    }, 500); 

    setShowContentTwo(false);
    setShowContent(false);
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentfive(false);
    setbalanceHandle(false)
    setShowContentsix(false)


  };


  const Mousefour = () => {

    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContent(false);
    setShowContentfive(false);
    setbalanceHandle(false)
    setAdminActive(false)
    setShowContentsix(false)

    setShowContentfour(true);
    clearTimeout(timerRef.current); 
  };

  const MouseLeavefour = () => {

    timerRef.current = setTimeout(() => {
      setShowContentfour(false);
    }, 500); 

    setShowContentTwo(false);
    setShowContent(false);
    setAdminActive(false)
    setbalanceHandle(false)
    setShowContentThree(false);
    setShowContentfive(false);
    setShowContentsix(false)



  };

  const Mousefive = () => {

    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContent(false);
    setbalanceHandle(false)
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentsix(false)


    setShowContentfive(true);
    clearTimeout(timerRef.current); 
  };

  const MouseLeavefive = () => {

    timerRef.current = setTimeout(() => {
      setShowContentfive(false);
    }, 500); 

    setShowContentTwo(false);
    setShowContent(false);
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentThree(false);
    setbalanceHandle(false)
    setShowContentsix(false)

  };

  const Mousesix = () => {

    setShowContentTwo(false);
    setShowContentThree(false);
    setShowContent(false);
    setbalanceHandle(false)
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentfive(false);


    setShowContentsix(true);
    clearTimeout(timerRef.current); 
  };

  const MouseLeavesix = () => {

    timerRef.current = setTimeout(() => {
      setShowContentsix(false)
    }, 500); 

    setShowContentTwo(false);
    setShowContent(false);
    setShowContentfour(false);
    setAdminActive(false)
    setShowContentThree(false);
    setbalanceHandle(false)
    setShowContentfive(false);
    

  };


  const [slideBar, setSlideBar] = useState(false)

  const slideBarActivFalse = () => {
    setSlideBar(!slideBar)
    
    setSlideBarTwo(false)
    setSlideBarThree(false)
    setSlideBarFour(false)
    setSlideBarFive(false)
    setSlideBarSix(false)


  }

  const [slideBarTwo, setSlideBarTwo] = useState(false)

  const slideBarActivFalseTwo = () => {
    setSlideBarTwo(!slideBarTwo)

    setSlideBar(false)
    setSlideBarThree(false)
    setSlideBarFour(false)
    setSlideBarFive(false)
    setSlideBarSix(false)


  }

  const [slideBarThree, setSlideBarThree] = useState(false)

  const slideBarActivFalseThree = () => {
    setSlideBarThree(!slideBarThree)

    setSlideBar(false)
    setSlideBarTwo(false)
    setSlideBarFour(false)
    setSlideBarFive(false)
    setSlideBarSix(false)

  }

  const [slideBarFour, setSlideBarFour] = useState(false)

  const slideBarActivFalseFour = () => {
    setSlideBarFour(!slideBarFour)

    setSlideBar(false)
    setSlideBarThree(false)
    setSlideBarTwo(false)
    setSlideBarFive(false)
    setSlideBarSix(false)


  }

  const [slideBarFive, setSlideBarFive] = useState(false)

  const slideBarActivFalseFive = () => {
    setSlideBarFive(!slideBarFive)

    setSlideBar(false)
    setSlideBarThree(false)
    setSlideBarTwo(false)
    setSlideBarFour(false)
    setSlideBarSix(false)

  }

  const [slideBarSix, setSlideBarSix] = useState(false)

  const slideBarActivFalseSix = () => 
  {

    setSlideBarSix(true)

    setSlideBarFive(false)
    setSlideBar(false)
    setSlideBarThree(false)
    setSlideBarTwo(false)
    setSlideBarFour(false)

  }

  const [burgerActive, setburgerActive] = useState(false)

  const burgerActiveFalse = () => {
      setburgerActive(!burgerActive)

      setbalanceHandle(false)
      setShowContent(false);
      setShowContentTwo(false);
      setShowContentThree(false);
      setShowContentfive(false);
      setShowContentfour(false);
      setAdminActive(false)

  }

  const navigate = useNavigate()

  const GoOut = () => {

    navigate('/Login')

    localStorage.removeItem('access_token')

    localStorage.removeItem('refresh_token')

  }

   const locationn = useLocation ()

    return(
      
      <>

      {locationn.pathname === '/Login' || locationn.pathname === '/restoring'
      || locationn.pathname === '/shipped' || (locationn.pathname.startsWith('/newpassword/') && locationn.pathname.length > '/newpassword/'.length)  || locationn.pathname === '/404' || locationn.pathname === '/passwordsuccessfully'

      ?
      
      ''      
      
      :

      <header className={h.header}>
  
  
          <div className={h.header__item}>
  
              <div className={h.header__padding} onClick={burgerActiveFalse}>
  
              <div 
              
              className={h.header__burger}
              
              >
  
                  <span></span>
  
              </div>
  
              </div>
  
              <Link to={'/admin_home'}>

              <img src={logo} className={h.header__logo} alt="img" />

              </Link>
  
          </div>
  
          <div className={h.header__admin}>
                  
                  <div className={h.header__admin__box} onClick={AdminActiveFalse}>
                      
                      <img src={user} className={h.header__admin__box__img} alt="svg" />
  
                      <img src={group} className={ AdminActive ? [h.header__admin__box__strel , h.header__admin__box__strel__active].join(' ') : [h.header__admin__box__strel] } alt="svg" />
  
                  </div>
  
          </div>
  
              {AdminActive &&
              
              <div className={h.header__modal}>
                  
                  <div className={h.header__modal__item}>

                    {/* ////////////////////////////////////// */}
                      
                      <div className={h.modal}>
  
                      <img src={item1} className={h.modal__svg} alt="svg" />
  
                      <p className={h.modal__title}>Консоль Администратора</p>
  
                      </div>
  
                  </div>
  
                  <div className={h.header__modal__item}>
                      
                      <div className={h.modal}>
                          
                      <img src={item2} className={h.modal__svg} alt="svg" />
  
                      <p className={h.modal__title}>Безопасность</p>
  
                      </div>
  
                      <div className={h.modal}>
                          
                          <img src={item3} className={h.modal__svg} alt="svg" />
      
                          <p className={h.modal__title}>Техподдержка</p>
      
                      </div>
  
                  </div>
  
                  <div className={h.header__modal__item}>
                      
                      <div className={h.modal}>
                          
                      <img src={item4} className={h.modal__svg} alt="svg" />
  
                      <p className={h.modal__title}>Профиль</p>
  
                      </div>
  
                      <div className={h.modal}>
                          
                          <img src={item5} className={h.modal__svg} alt="svg" />
      
                          <p className={h.modal__title}>Настройки</p>
      
                      </div>
  
                  </div>
  
                  <div className={h.header__modal__item} onClick={GoOut}>
                      
                      <div className={h.modal}>
  
                      <img src={item6} className={h.modal__svg} alt="svg" />
  
                      <p className={h.modal__title}>Выйти</p>
  
                      </div>
  
                  </div>
  
              </div>
              
              }
  
      </header>

      }

      {/* //готово тепа */} 

      {locationn.pathname === '/Login' || locationn.pathname === '/restoring' 

      || locationn.pathname === '/shipped' || (locationn.pathname.startsWith('/newpassword/') && locationn.pathname.length > '/newpassword/'.length) || locationn.pathname === '/404' || locationn.pathname === '/passwordsuccessfully'
      
      ?
      
      ''      
      
      :
  
      !burgerActive ? (
  
      <div className={h.bar}>

      <>
      
      <div 
      
      className={locationn.pathname === '/statistics' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item]  }
         
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      
      
      >
          
          <img src={bar6}  alt="svg" />
      
          {showContent &&
          
          <div className={h.bar__info}
          
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      
          >
              
              <p className={h.bar__info__title}>Статистика</p>
      
              <ul className={h.bar__info__ul}>
      
                  <Link to={'/statistics'} className={h.bar__info__ul__link}>Моя статистика</Link>
      
              </ul>
      
          </div>
      
          }
      
      </div>
      
      {(userPrav.includes('sitemoderator') || SuperUser ) && (
      
        <div
      
          className={
            locationn.pathname === '/Venues'
              ? [h.bar__item, h.bar__item__active].join(' ')
              : [h.bar__item]
          }
          onMouseEnter={MouseThree}
          onMouseLeave={MouseLeaveThree}
        >
      
          <img src={bar8} alt="svg" />
      
          {showContentThree && (
            <div
              className={h.bar__info}
              onMouseEnter={MouseThree}
              onMouseLeave={MouseLeaveThree}
            >
              <p className={h.bar__info__title}>Площадки</p>
              <ul className={h.bar__info__ul}>
                <Link to={'/Venues'} className={h.bar__info__ul__link}>
                  Площадка
                </Link>
              </ul>
            </div>
          )}
      
        </div>
      
      )}
      
      
      {(userPrav.includes('lotmoderator')|| SuperUser ) && 
      
      <div 
      
      onMouseEnter={Mousefour}
      onMouseLeave={MouseLeavefour}
      
      className={locationn.pathname === '/Auctions' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item] }
      
      >
          
          <img src={bar9}  alt="svg" />
      
          {showContentfour &&
          
          <div className={h.bar__info}
          
          onMouseEnter={Mousefour}
          onMouseLeave={MouseLeavefour}
      
          >
              
              <p className={h.bar__info__title}>Аукционы</p>
      
              <ul className={h.bar__info__ul}>
      
                  <Link to={'/Auctions'} className={h.bar__info__ul__link}>Аукцион</Link>
      
              </ul>
      
          </div>
      
          }
      
      </div>
      
      }
      
      {(userPrav.includes('advmoderator') || SuperUser ) && 
      
      <>
      <div
      
      className={locationn.pathname === '/Advertising' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item] }
      
      onMouseEnter={Mousefive}
      onMouseLeave={MouseLeavefive}
      
      >
          
          <img src={bar10}  alt="svg" />
      
          {showContentfive &&
          
          <div className={h.bar__info}
          
          onMouseEnter={Mousefive}
          onMouseLeave={MouseLeavefive}
      
          >
              
              <p className={h.bar__info__title}>Рекламные кампании</p>
      
              <ul className={h.bar__info__ul}>
      
                  <Link to={'/Advertising'} className={h.bar__info__ul__link}>Рекламная кампания</Link>
      
              </ul>
      
          </div>
      
          }
      
      </div>
      </>
      
      }

      <>

      <div 
      
      className={locationn.pathname === '/Manager' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item]  }
         
      onMouseEnter={balanceOne}
      onMouseLeave={balanceOneClose}
      
      
      >
          
          <img src={bar7}  alt="svg" />
      
          {balanceHandle &&
          
          <div className={h.bar__info}
          
          onMouseEnter={balanceOne}
          onMouseLeave={balanceOneClose}
      
          >
              
              <p className={h.bar__info__title}>Менеджер</p>
      
              <ul className={h.bar__info__ul}>
      
                  <Link to={'/Manager'} className={h.bar__info__ul__link}>Менеджер</Link>
      
              </ul>
      
          </div>
      
          }
      
      </div>

      <div 
      
      className={locationn.pathname === '/Moderation' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item] }
      
      >
          <Link to={'/Moderation'}>

          <img src={Mod} width={'20px'} alt="svg" />

          </Link>
      
      </div>
      
      { (userPrav.includes('admin') || SuperUser ) && 

      <div 
      
      className={locationn.pathname === '/invitation' ? [h.bar__item, h.bar__item__active].join(' ') : [h.bar__item] }
      
      >
          <Link to={'/invitation'}>

          <img src={User} width={'20px'} alt="svg" />

          </Link>
      
      </div>

      }
      
      </>
      
      </> 
    
      </div>

  
      ) : (
  

      ''
  
      )

      }
          
      </>

    )

}
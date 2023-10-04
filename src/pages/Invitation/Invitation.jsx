import axios from 'axios';
import a from '../Admin/Admin.module.scss'
import React, { useEffect, useState } from 'react';
import InvitationCard from './InbitationCard';
import { useAuth } from '../../AuthContext';


export default function Invitation ({userMe}) {

    const [userId, setUserId] = useState([])

    const apiUrl = process.env.REACT_APP_API_URL;

    const loginEndpoint = '/api/rights/all';

    const token = localStorage.getItem('access_token');

    const { refreshToken } = useAuth();

    useEffect(() => {
    
        const url = `${apiUrl}${loginEndpoint}`;
    
            axios.get(url, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }

            })
            .then(res => {

                setUserId(res.data)

            })

            .catch(error => {

              if (error.response && error.response.status === 401) {

                refreshToken();

              } else {

              }
                
            });

    }, [refreshToken]); 


     

    const [selectedItems, setSelectedItems] = useState([]);

    const toggleCheckbox = (code) => {

        if (selectedItems.includes(code)) {

            setSelectedItems(selectedItems.filter(item => item !== code));

        } else {
            setSelectedItems([...selectedItems, code]);
        }

      };

    // const toggleCheckbox = (code) => {

    //     if (userMe.includes('superadmin')) {
    //       // Если есть роль 'superadmin', разрешаем выбор всех чекбоксов
    //       setSelectedItems(userId.map(info => info.code));

    //     } else if (userMe.includes('admin')) {
    //       // Если есть роль 'admin', разрешаем выбор только 'admin'
    //       if (code === 'admin') {
    //         setSelectedItems(['admin']);
    //       } else {
    //         setSelectedItems([]);
    //       }
    //     } else if (userMe.includes(code)) {
    //       // Если есть роль, совпадающая с текущим чекбоксом, разрешаем его выбор
    //       setSelectedItems([code]);
    //     } else {
    //       // В остальных случаях скрываем все чекбоксы
    //       setSelectedItems([]);
    //     }
    //   };
      

      const [roleName, setRoleName] = useState('')

      const [roleEmail, setRoleEmail] = useState('')

      const [ErrorValid, setErrorValid]= useState(false)

      const loginEndpointPOST = '/api/users_admin/send_invite';
      
      const RoleHandle = (e) => {

          e.preventDefault();
      
          axios
            .post(`${apiUrl}${loginEndpointPOST}`, {
  
              name: roleName,
              email: roleEmail,
              role: selectedItems
  
            }, {
              
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
  
            })

            .then((res) => { 
                
                // console.log(res);

            })
  
            .catch((error) => {

              setErrorValid(true);

              if (error.response && error.response.status === 401) {

                refreshToken();
  
              } else {
                
              }

            });
  
        };

    return (
        
        <>

        
        <section className={a.section__home}>

            <div className="container">
                
                <p className={a.invitation__title}>Приглашение в админку</p>

                <form className={a.invitation} onSubmit={RoleHandle}>
                    
                    <input type="text" className={a.invitation__input} placeholder='Имя Фамилия'
                    onChange={(event) => setRoleName(event.target.value)}
                    />

                    <input type="text" className={a.invitation__input} placeholder='Почта'
                    onChange={(event) => setRoleEmail(event.target.value)}
                    />

                    <div className={a.invitation__center}>


                  {userId.map( (info, index) => { 

                    return (

                        <InvitationCard {...info}  key={index}
                         
                        isSelected={selectedItems.includes(info.code)}
                        onCheckboxChange={() => toggleCheckbox(info.code)}
                         
                        />
                              
                    ) 

                  } ) } 

                        

                    </div>


                    <button className={a.invitation__btn} onClick={RoleHandle}>
                        Добавить 
                    </button>

                </form>

            </div>
        </section>

        </>

    )
    
}
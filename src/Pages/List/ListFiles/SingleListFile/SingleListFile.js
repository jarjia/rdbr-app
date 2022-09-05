import React, {useEffect, useState} from 'react'
import './SingleListFile.css'
import { Link, useParams } from 'react-router-dom'
import arrowLeft from '../../../../assets/Vector (2).png'

const SingleListFile = () => {
    const [data, setData] = useState()
    const [team, setTeam] = useState([])
    const [position, setPosition] = useState([])
    const [brand, setBrand] = useState([])
    const [windowWidth, setWindowWidth] = useState()
    
    let date = new Date()

    const {laptopId} = useParams()

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth)
        }
    
        window.addEventListener('resize', handleResize)
    })

    useEffect(() => {
        fetch('https://pcfy.redberryinternship.ge/api/teams')
            .then((response) => response.json())
            .then((data) => setTeam(data.data))
    }, [])

    useEffect(() => {
        fetch('https://pcfy.redberryinternship.ge/api/positions')
            .then((response) => response.json())
            .then((data) => setPosition(data.data))
    }, [])

    useEffect(() => {
        fetch('https://pcfy.redberryinternship.ge/api/brands')
            .then((response) => response.json())
            .then((data) => setBrand(data.data))
      }, [])

    useEffect(() => {
        fetch(`https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=be182ff8797b8ea53c4f04440156bb00`)
            .then(res => res.json())
            .then(data => setData(data.data))
    }, [laptopId])

    let teamFilter = data && team.filter(item => {
        if(item.id === data.user.team_id) {
            return item
        }else {
            return null
        }
    })

    let positionFilter = data && position.filter(item => {
        if(item.id === data.user.position_id) {
            return item
        }else {
            return null
        }
    })

    let brandFilter = data && brand.filter(item => {
        if(item.id === data.laptop.brand_id) {
            return item
        }else {
            return null
        }
    })

  return (
    <div className='single-main'>
        <div className='single-wrapper'>
            <div className='header'>
                <div>
                    <Link to='/list' className='back-btn-list'><button type='button' className='back-btn-arr'><img src={arrowLeft} className='arrow-left-list' alt='arrow left'/></button></Link>
                </div>
                <div>
                    <h1>ლეპტოპის ინფო</h1>
                </div>
            </div>
            {data && <div className='single-laptop'>
                <div className='single-1'>
                    <div className='laptop-img'>
                        <img src={`https://pcfy.redberryinternship.ge/${data.laptop.image}`} alt='laptop'/>
                    </div>
                    <div className='user-info'>
                        <div>
                            <h4>სახელი:</h4>
                            <span>{data.user.name} {data.user.surname}</span>
                        </div>
                        <div>
                            <h4>თიმი:</h4>
                            <span>{teamFilter.map(item => {
                                return item.name
                            })}</span>
                        </div>
                        <div>
                            <h4>პოზიცია:</h4>
                            <span>{positionFilter.map(item => {
                                return item.name
                            })}</span>
                        </div>
                        <div>
                            <h4>მეილი:</h4>
                            <span>{data.user.email}</span>
                        </div>
                        <div>
                            <h4>ტელ, ნომერი:</h4>
                            <span>{data.user.phone_number}</span>
                        </div>
                    </div>
                </div>
                <div className='single-2'>
                    <div className='single-2-1'>
                        <div>
                            <h4>ლეპტოპის სახელი:</h4>
                            <span>{data.laptop.name}</span>
                        </div>
                        <div>
                            <h4>ლეპტოპის ბრენდი:</h4>
                            <span>{brandFilter.map(item => {
                                return item.name
                            })}</span>
                        </div>
                        <div>
                            <h4>RAM:</h4>
                            <span>{data.laptop.ram}</span>
                        </div>
                        <div>
                            <h4>მეხსიერების ტიპი:</h4>
                            <span>{data.laptop.hard_drive_type}</span>
                        </div>
                    </div>
                    <div className='single-2-2'>
                        <div>
                            <h4>CPU:</h4>
                            <span>{data.laptop.cpu.name}</span>
                        </div>
                        <div>
                            <h4>CPU-ს ბირთვი:</h4>
                            <span>{data.laptop.cpu.cores}</span>
                        </div>
                        <div>
                            <h4>CPU-ს ნაკადი:</h4>
                            <span>{data.laptop.cpu.threads}</span>
                        </div>
                    </div>
                </div>
                <div className='single-3'>
                    <div className='single-3-1'>
                        <div>
                            <h4>{windowWidth > 425 ? 'ლეპტოპის მდგომარეობა:' : 'მდგომარეობა:'}</h4>
                            <span>{data.laptop.state === 'new' ? 'ახალი' : 'მეორადი'}</span>
                        </div>
                        <div>
                            <h4>ლეპტოპის ფასი:</h4>
                            <span>{data.laptop.price} ₾</span>
                        </div>
                    </div>
                    <div className='single-3-2'>
                        <div>
                            <h4>შეძენის რიცხვი:</h4>
                            <span>{data.laptop.purchase_date === null ? `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}` : data.laptop.purchase_date}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default SingleListFile
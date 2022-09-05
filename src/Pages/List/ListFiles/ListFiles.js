import React, {useState, useEffect} from 'react'
import './ListFiles.css'
import arrowLeft from '../../../assets/Vector (2).png'
import { Link } from 'react-router-dom'

const ListFiles = () => {
  const [data, setData] = useState([]) 
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://pcfy.redberryinternship.ge/api/laptops?token=be182ff8797b8ea53c4f04440156bb00')
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='list-main'>
        <div className='list-wrapper'>
          <div className='header'>
            <div>
              <Link to='/' className='back-btn-list'><button type='button' className='back-btn-arr'><img src={arrowLeft} className='arrow-left-list' alt='arrow left'/></button></Link>
            </div>
            <div>
              <h1>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h1>
            </div>
          </div>
          {data.length > 0 && <div className='input-search'>
            <input type='text' value={search} onChange={e => setSearch(e.target.value)} className='search' maxLength={40} placeholder='იპოვე ლეპტოპი სახელით...' />
            <img src='https://static.vecteezy.com/system/resources/previews/005/487/432/original/clipart-icon-lupe-loop-search-free-vector.jpg' className='search-loop' alt='loop' draggable="false"/>
          </div>}
          {data.length !== 0 ? <div className='lists'>
            {data.filter(prev => {
              let fullName = `${prev.user.name} ${prev.user.surname}`
              if(search === '') {
                return prev
              }else if(fullName.toLowerCase().includes(search.toLowerCase())) {
                return prev
              }else {
                return null
              }
            }).map(item => {
              return <div className='list' key={item.laptop.id}>
                <div className='list-img'>
                  <img src={`https://pcfy.redberryinternship.ge/${item.laptop.image}`} alt='laptop'/>
                </div>
                <div className='short-info'>
                  <h4 className='user'>{item.user.name} {item.user.surname}</h4>
                  <h4 className='laptop'>{item.laptop.name}</h4>
                  <div>
                    <Link to={`/list/${item.laptop.id}`}>მეტის ნახვა</Link>
                  </div>
                </div>
              </div>
            })}
          </div> : <div className='empty-div'><h1>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ ცარიელია...</h1></div>}
        </div>
    </div>
  )
}

export default ListFiles
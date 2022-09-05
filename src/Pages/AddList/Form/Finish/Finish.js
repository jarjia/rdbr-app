import { Link } from 'react-router-dom'
import finish from '../../../../assets/Frame.png'
import './Finish.css'

const Finish = () => {

  const handleClear = () => {
    localStorage.clear()
  }

  return (
    <div className='finish-main'>
        <div className='finish-wrapper'>
            <div className='finish-1'>
                <img src={finish} alt='finished'/>
                <h2>ჩანაწერი დამატებულია!</h2>
            </div>
            <div className='finish-2'>
                <Link to='/list'><button className='see-list' onClick={handleClear}>სიაში გადაყვანა</button></Link>
                <Link to='/' className='home-link'><button onClick={handleClear} className='home-link'>მთავარი</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Finish

import { PiSpinnerGapBold } from 'react-icons/pi';

const AuthButton = ({loading, text, onClick}:any) => {
  return (
    <button onClick={onClick} type="submit" className={`text-2xl text-white px-[19px] py-[2px] rounded-md mt-5 ${!loading ? 'bg-blue-600' : 'bg-blue-700'}`} disabled={loading}>
    {text}
    {loading && <PiSpinnerGapBold className='text-white animate-spin-slow absolute ml-[12.5em] mt-[-1.15em]'/>}
    </button>
  )
}

export default AuthButton

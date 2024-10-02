import { IoIosClose } from 'react-icons/io';

const Notification = ({content, type}: {content: string, type: string} ) => {
  return (
    <div className={`bg-white rounded-md px-5 py-3  absolute top-3 flex gap-5 border-[5px] border-white ${type === "success" ? 'border-b-green-600' : 'border-b-red-600'}`}>
     <p>{content}</p>
     <IoIosClose/>
    </div>
  )
}

export default Notification

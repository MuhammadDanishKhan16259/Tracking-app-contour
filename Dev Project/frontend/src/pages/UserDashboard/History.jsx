import Sidebar from "./Sidebar"

const History = () => {
  return (
    <>
      <div className='flex'>
        <div className='sm:hidden'>
        <Sidebar/>
        </div>
        <div className='container '>
        <div>
            <h1 className='py-8 text-6xl font-normal font-orbitron'>Overview</h1>
            <div className='w-[46em] h-[344px] rounded-[50px] bg-mainBgColor'>

            </div>
        </div>
        </div>
      </div>
        </>
  )
}

export default History;
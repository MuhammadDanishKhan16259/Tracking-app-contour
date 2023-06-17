import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { dashboardgoal } from "../../assets/images/";
import { IoMdBicycle } from "react-icons/io";
import { BiRun, BiTimeFive } from "react-icons/bi";
import { RiWalkFill } from "react-icons/ri";
import { FaSwimmer, FaCalendar, FaEdit } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { notification } from "antd";
import Actvity from "../Activity";
import UpdateActivity from "../Activity/Update";
import { getActivityPagination, deleteActivity } from "../../Api/dashboard";
import { Pagination } from "antd";
const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [limit, setlimit] = useState(4);
  const [show, setShow] = useState(false);

  var id = "";
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [state, setState] = useState({
    values: {
      update_id: "",
      activitytype: "",
      description: "",
      date: "",
      duration: "",
    },
    activityList: [],
    totalPage: [],
  });
  const getActivities = async () => {
    const result = await getActivityPagination(page, limit);
    if (result.data.status === 200) {
      setState((prevState) => ({
        ...prevState,
        activityList: result.data.result.getActivity,
        totalPage: result.data.result.totalPages,
      }));
    }
  };
  const ActivityDelete = async (id) => {
    const results = await deleteActivity(id);
    if (results.data.status === 200) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
    }
  };
  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
      placement: "topRight",
    });
  };
  useEffect(() => {
    getActivities();
  }, [page]);
  return (
    <>
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="container ">
          <div>
            <h1 className="py-4 text-6xl font-normal font-orbitron">
              Overview
            </h1>
            <div className="w-[46em] h-[344px] rounded-[50px] bg-mainBgColor flex lg:items-center">
              <img src={dashboardgoal} alt="" />
              <div>
                <p className="text-4xl leading-[45px] text-white font-orbitron">
                  SET GOAL AND MOTIVATE YOURSELF
                </p>
                <button
                  className="mt-5 w-[200px] h-16 bg-white rounded-[15px] bg-grey font-normal text-xl font-orbitron"
                  onClick={handleShow}
                >
                  Set Goal
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="py-4 text-6xl font-normal font-orbitron">
              Activity
            </h1>
          </div>
          <div className="flex justify-evenly">
            {state.activityList.map((element, key) => {
              return (
                <>
                  <div
                    key={key}
                    className="w-[250px] h-[230px] bg-mainBgColor rounded-[25px] "
                  >
                    <i className="text-white grid justify-center text-[60px]">
                      {element.activitytype == "bicycle" ? (
                        <IoMdBicycle />
                      ) : element.activitytype == "swimming" ? (
                        <FaSwimmer />
                      ) : element.activitytype == "walking" ? (
                        <RiWalkFill />
                      ) : element.activitytype == "running" ? (
                        <BiRun />
                      ) : element.activitytype == "hiking" ? (
                        <GiHiking />
                      ) : (
                        ""
                      )}
                    </i>
                    <div>
                      <div className="flex text-white text-[20px] px-[20px] pt-[25px]">
                        <i className="text-[30px]">
                          <FaCalendar />
                        </i>
                        <span className="pl-[15px] text-[20px]">
                          {element.date}
                        </span>
                      </div>
                      <div className="flex text-white  px-[20px] pt-[15px]">
                        <i className="text-[30px]">
                          <BiTimeFive />
                        </i>
                        <span className="pl-[15px] text-[20px]">
                          {element.duration}
                        </span>
                      </div>
                      <div className="flex justify-center text-white pt-[15px]">
                        <i
                          className="text-[30px]"
                          onClick={() => {
                            getIdForUpdate(element._id);
                            handleShow(setState.update_id(element._id));
                          }}
                        >
                          <FaEdit />
                        </i>
                        <i
                          className="text-[30px] pl-[10px]"
                          onClick={() => {
                            ActivityDelete(element._id);
                          }}
                        >
                          <AiFillDelete />
                        </i>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex justify-center pt-[15px]">
            <Pagination
              defaultCurrent={1}
              total={30}
              onChange={(page) => setPage(page)}
            />
            <Actvity
              handleShow={handleShow}
              show={show}
              handleClose={handleClose}
              handleNotification={handleNotification}
            />
            <UpdateActivity id={id} />
            <UpdateActivity
              state={state}
              handleShow={handleShow}
              show={show}
              handleClose={handleClose}
              handleNotification={handleNotification}
              // state={state}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

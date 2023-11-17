import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type InfoRent = {
  id?: string;
  State?: string;
  requestDetails?: string;
  Name?: string;
  requestType?: string;
  requestTitle?: string;
  Pending?: string;
  InProgress?: string;
  Completed?: string;
};

function Dashboard() {
  const isLogin = localStorage.getItem("isLogin");

  const [StateIs,setStateIs] = React.useState<InfoRent>({
    State: "New",
});
  if (isLogin != "true") {
    location.href = "/login";
  } else localStorage.setItem("Page", "/dashboard");

  localStorage.getItem("Page");
  const getName = localStorage.getItem("Name");
  console.log(getName);

  const nav = useNavigate();
  const newState = localStorage.getItem("id");
  const UpdateState = () => {
    axios
      .put(`https://655154b37d203ab6626ebeaa.mockapi.io/FormRequests/${newState}`, {
        State: StateIs.State,
      })
      .then(() => {
        nav("/dashboard");
      });
  };

  const [Info, setInfo] = React.useState<InfoRent[]>([]);

  React.useEffect(() => {
    axios
      .get("https://655154b37d203ab6626ebeaa.mockapi.io/FormRequests")
      .then((res) => {
        setInfo(res.data);
        // console.log(res.data);
      });
  }, []);

  let cunt = 1;
  const deleteRent = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#B4B0B0",
      confirmButtonText: "Delete",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://655154b37d203ab6626ebeaa.mockapi.io/FormRequests/${id}`)
          .then((res) => {
            setInfo(res.data);
            setInfo(
              Info.filter((del) => {
                return del.id !== id;
              })
            );
          })
          .catch((error) => {
            console.log(error);
            
        Swal.fire("Error", "Failed to delete file.", "error");
      });
    }
  });
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 w-full">
        <div className="flex-1 flex flex-wrap">
          <div className="p-2  w-full md:w-60 flex flex-col md:flex  shadow-md">
            <nav className="">
                <a
                  className="block  py-2.5 px-4 my-4 rounded transition duration-200 text-[#9a6dce] hover:bg-[#9a6dce] hover:text-white"
                  href="/dashboard"
                >
                  <i className="fas fa-users mr-2"></i>Request history
                </a>
            </nav>
          </div>

          <div className="flex-1 p-4 lg:w-full md:w-1/2 ">
            <div className=" bg-white pb-4 shadow rounded-lg lg:w-full md:w-full w-full">
              <table className="lg:w-full table-auto text-sm mb-4 md:w-full">
                <thead className="bg-[#9a6dce] rounded-t-lg lg:w-full md:w-72  h-14 pt-2">
                  <tr className="text-sm leading-normal w-[20vw] lg:w-full md:w-1/2">
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase  text-[.5rem] text-grey-light border-b border-grey-light lg:text-sm md:text-sm text-white">
                      ID
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-[.5rem] text-grey-light border-b border-grey-light lg:text-sm md:text-sm text-white">
                      Status
                    </th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-[.5rem] text-grey-light border-b border-grey-light lg:text-sm md:text-sm text-white">
                      Request Details
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className=" border border-solid border-gray-300 h-16">
                  {Info.map((item) => {
                     if(item.Name===getName)
                    {
                      return (
                        <tr className="hover:bg-grey-lighter" key={item.id}>
                          <td className="py-2 px-4 border-b border-grey-light border border-dashed  rounded-full h-10 w-10 text-[.3rem] lg:text-sm md:text-sm text-black">
                            #{cunt++}
                          </td>
                          <td className="py-2 px-4 border-b border-grey-light border-r text-[.4rem] lg:text-sm md:text-sm">
                          <select
                          className=" border border-solid border-gray-300 rounded-md shadow-md h-9"
                            name=""
                            id=""
                            onClick={() => {
                              localStorage.setItem("id", String(item.id));
                              UpdateState();                              
                            }}
                            onChange={(e) => {
                                setStateIs({ ...StateIs, State: e.target.value });
                            }}
                          >
                            <option
                              onChange={() => {
                                localStorage.setItem("id", String(item.State));
                              }}
                            >
                             {item.State}
                            </option>

                            <option
                              onChange={() => {
                                localStorage.setItem("id", String(item.Pending));
                              }}
                              // value={MyState.Underprocess}
                            >
                              Pending
                            </option>

                            <option
                              onChange={() => {
                                localStorage.setItem("id", String(item.InProgress));
                              }}
                              // value={MyState.Approved}
                            >
                              In-Progress
                            </option>

                            <option
                              onChange={() => {
                                localStorage.setItem("id", String(item.Completed));
                              }}
                              // value={MyState.Rejected}
                            >
                             Completed
                            </option>
                            
                          </select>
                        </td>
                          <td className="py-2 px-4 border-b border-grey-light border-r text-[.3rem] lg:text-sm md:text-sm font-semibold lg:font-normal md:font-normal text-black">
                            {item.requestDetails}
                          </td>
                          <td className=" px-2 border-b border-grey-light">
                            <button
                              onClick={() => deleteRent(String(item.id))}
                              className="text-white bg-red-700  focus:ring-4 focus:ring-blue-300 font-medium text-[.3rem] lg:w-8 lg:h-7 w-5 h-7 text-center flex items-center justify-center rounded-lg "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className=" lg:w-4 lg:h-4 w-3 h-3 "
                                viewBox="0 0 16 16"
                              >
                                {" "}
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />{" "}
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-white"></div>
    </>
  );
}

export default Dashboard;

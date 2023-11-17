import React from "react";
import Logo from "../assets/RequestManagementSystem.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
type ISignUp = {
  Name: string;
  EmailAddress: string;
  Password: string;
};
function SignUp() {
  const [AddInfoUser, setAddInfoUser] = React.useState<ISignUp>({
    Name: "",
    EmailAddress: "",
    Password: "",
  });

  const [Namemust,setNamemust] = React.useState("");
  const [EmailAddressmust,setEmailAddressmust] = React.useState("");
  const [Passwordmust,setPasswordmust] = React.useState("");
  const navigate = useNavigate();

  const AddIUser = () => {
    if (AddInfoUser.Name == "" || AddInfoUser.Name.length < 3){
      setNamemust("Please enter your Name");
        return navigate("/SignUp");
    }
    else if (AddInfoUser.EmailAddress == "" || AddInfoUser.EmailAddress.length < 10 || !AddInfoUser.EmailAddress.includes('@')){
      setNamemust("");
      setEmailAddressmust("Email must contain at least one symbol e.g. @, !")
        return navigate("/SignUp");
    }
    else if (AddInfoUser.Password == "" || AddInfoUser.Password.length < 8){
      setEmailAddressmust("");
      setPasswordmust('Password is too short (minimum is 6 characters)')
        return navigate("/SignUp");
    }else if (!AddInfoUser.Password.includes('$') && !AddInfoUser.Password.includes('!') && !AddInfoUser.Password.includes('&')){
      setPasswordmust("");
        setPasswordmust("Password must contain at least one symbol e.g. @, !")
        return navigate("/SignUp")
    } 
    else{
        setNamemust("");
        setEmailAddressmust("");
        setPasswordmust("");
        const notify = () => toast.success('successfully!');
        notify()
    }
    axios
      .post("https://655154b37d203ab6626ebeaa.mockapi.io/Management", {
        Name: AddInfoUser.Name,
        EmailAddress: AddInfoUser.EmailAddress,
        Password: AddInfoUser.Password,
      })
      .then((res) => {
        console.log(res);
        return navigate("/Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    //
    <>
      <div className="flex items-center min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className=" flex justify-center my-11">
              <a href="/">
              <img className="w-20" src={Logo} alt="" />
              </a>
            </div>

            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-[#901DFF] ">
                Sign Up
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign Up to access your account
              </p>
            </div>
            <div className="m-7">
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm text-[#901DFF]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    placeholder="Your Name"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500"
                    onChange={(e) => {
                        setAddInfoUser({...AddInfoUser,Name: e.target.value})
                    }}
                  />
                  <span className="flex text-[#e05858] text-xs ml-2 my-2">{Namemust}</span>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-[#901DFF]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500"
                    onChange={(e) => {
                        setAddInfoUser({...AddInfoUser,EmailAddress: e.target.value})
                    }}
                  />
                  <span className="flex text-[#e05858] text-xs ml-2 my-2">{EmailAddressmust}</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-[#901DFF]"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500"
                    onChange={(e) => {
                        setAddInfoUser({...AddInfoUser,Password: e.target.value})
                    }}
                  />
                  <span className="flex text-[#e05858] text-xs ml-2 my-2">{Passwordmust}</span>
                </div>
                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full px-3 py-4 text-white bg-[#5F00CD] hover:bg-[#901DFF] rounded-md"
                    onClick={AddIUser}
                  >
                    Sign Up
                  </button>
                  <Toaster />
                </div>
                <p className="text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="Login"
                    className="text-[#901DFF] focus:outline-none focus:underline focus:text-[#6000cdc7] dark:focus:border-indigo-800"
                  >
                    Login
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

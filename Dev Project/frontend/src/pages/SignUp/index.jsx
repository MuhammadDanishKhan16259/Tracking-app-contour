import { Link } from "react-router-dom";
import { useState } from "react";
import { notification } from "antd";
import { signupFields } from "../../utils/formFields";
import FormButton from "../../components/form/FormButton";
import Input from "../../components/form/Input";
import Navbar from "../../components/common/Navbar";
import { beams, monkey1, monkey2, monkey3 } from "../../assets/images/";

const SignupPage = () => {
  const [signupState, setSignupState] = useState({});
  const [selectedMonkey, setSelectedMonkey] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
      placement: "topRight",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupState);
    try {
      const response = await fetch("http://localhost:5000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupState),
      });

      if (response.ok) {
        const results = await response.json();
        // const { user, token, expiresIn, msg, status, success } = results;

        const { msg, success } = results;
        handleNotification("success", msg, success);
        setSignupState({});
        // Redirect to a different page or perform other actions
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        console.log("Failed to create account", errorData);
      }
    } catch (error) {
      console.error("Error occurred during account creation", error);
    }
  };

  const handleInputClick = (id) => {
    setSelectedMonkey(id);
  };

  const monkeyImage = () => {
    switch (selectedMonkey) {
      case "username":
        return <img src={monkey1} alt="Monkey 1" />;
      case "email":
        return <img src={monkey2} alt="Monkey 2" />;
      case "password":
        return <img src={monkey3} alt="Monkey 3" />;
      case "confirm-password":
        return <img src={monkey3} alt="Monkey 3" />;
      default:
        return <img src={monkey1} alt="Monkey 1" />;
    }
  };

  return (
    <>
      <div
        className="relative h-screen bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${beams})` }}
      >
        <Navbar />
        <div className="flex items-center justify-center ">{monkeyImage()}</div>
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md p-8 space-y-7 min-w-sm rounded-2xl drop-shadow-2xl bg-gradient-to-bl from-[#a6fcfc] from-20% to-[#55f0f065] to-40%">
            <h2 className="mt-1 font-mono text-3xl text-center text-gray-900">
              SignUp
            </h2>
            <form className="mx-4 space-y-4" onSubmit={handleSubmit}>
              {signupFields.map((field) => (
                <div key={field.id} onClick={() => handleInputClick(field.id)}>
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={signupState[field.id] || ""}
                    {...field}
                  />
                </div>
              ))}
              <FormButton handleSubmit={handleSubmit} text="Signup" />
            </form>
            <p className="mt-5 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                SignIn
              </Link>
            </p>
            <div className="absolute bottom-0 left-0 h-[5vw] w-[5vw] rounded-full bg-gradient-to-r from-[#72eeba4b] from-20% to-[#72EEEE] to-100% shadow-gray-400"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

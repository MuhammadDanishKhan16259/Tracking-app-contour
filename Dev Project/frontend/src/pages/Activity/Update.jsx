import { Link } from "react-router-dom";
import { useState } from "react";
import { activityFields } from "../../utils/formFields";
import FormButton from "../../components/form/FormButton";
import Input from "../../components/form/Input";
import { beams } from "../../assets/images";
import { Modal } from "react-bootstrap";
const fields = activityFields;
const initialActivityState = Object.fromEntries(
  fields.map((field) => [field.id, ""])
);

export default function ActivityPage(props) {
  const { show, handleShow, handleClose, handleNotification,state } = props;
  const [activityState, setActivityState] = useState(initialActivityState);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setActivityState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateActivity();
  };

  const updateActivity = async (activityId, updatedActivity) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/exercise/${activityId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedActivity),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log("Activity updated successfully", data);
        // Handle success scenario
      } else {
        const errorData = await response.json();
        console.log("Failed to update activity", errorData);
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error occurred during activity update", error);
      // Handle error scenario
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="text-black"></Modal.Header>
        <div
          className="relative bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${beams})` }}
        >
          <div className="flex items-center justify-center h-screen min-h-full px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-7 min-w-sm rounded-2xl drop-shadow-2xl bg-gradient-to-bl from-[#73d1eed3] from-20% to-[#55f0f065] to-40%">
              <h2 className="mt-1 font-mono text-3xl text-center text-gray-900">
                Activity
              </h2>
              <form className="mt-8 space-y-6" onSubmit={updateActivity}>
                {fields.map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={activityState[field.id]}
                    {...field}
                  />
                ))}
                <FormButton handleSubmit={handleSubmit} text="Set Activity" />
              </form>
              <p className="mt-5 text-sm text-center text-gray-600">
                It is Activity Time{" "}
                <Link
                  to="/activity"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Activity
                </Link>
              </p>
              <div className="absolute bottom-0 left-0 h-[5vw] w-[5vw] rounded-full bg-gradient-to-r from-[#72eeba4b] from-20% to-[#72EEEE] to-100% shadow-gray-400"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

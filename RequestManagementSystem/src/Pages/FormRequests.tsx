import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

type IFormRequests = {
  requestType: string;
  requestTitle: string;
  requestDetails: string;
};
function FormRequests() {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const [requestTitle, setrequestTitle] = React.useState("");
  const [requestType, setrequestType] = React.useState("");
  const [requestDetails, setrequestDetails] = React.useState("");

  const navigate = useNavigate();
  const getName = localStorage.getItem("Name");

  const [FormRequests, setFormRequests] = React.useState<IFormRequests>({
    requestType: "",
    requestTitle: "",
    requestDetails: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (FormRequests.requestTitle == "" || FormRequests.requestTitle.length < 3) {
        setrequestTitle("Enter request Title");
        return navigate("/FormRequests");
      } else if (FormRequests.requestType == "" || FormRequests.requestType.length < 3) {
        setrequestTitle("");
        setrequestType("Enter request Type");
        return navigate("/FormRequests");
      } else if (FormRequests.requestDetails == "" || FormRequests.requestDetails.length < 3) {
        setrequestType("");
        setrequestDetails("Enter request Details");
        return navigate("/FormRequests");
      } else {
        setrequestTitle("");
        setrequestDetails("");
        setrequestType("");

      }

      const response = axios
        .post("https://655154b37d203ab6626ebeaa.mockapi.io/FormRequests", {
          requestType: FormRequests.requestType,
          requestTitle: FormRequests.requestTitle,
          requestDetails: FormRequests.requestDetails,
          Name: getName,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      if (response == response) {
        setSuccess(true);
        return navigate("/Dashboard");
      } else {
        setError("Failed to submit request. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:m-56 xl:m-56">
        <div>
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message">Request submitted successfully!</p>
          )}
          <div className="mx-auto w-full max-w-[550px]">
            <h2 className="lg:text-3xl lg:text-center lg:mb-10 text-[#901DFF] xl:text-3xl xl:text-center mb-10 mt-4">
              Create a Request:
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="Title"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Request Title:
                    </label>
                    <input
                      type="text"
                      name="Title"
                      id="requestTitle"
                      placeholder="Request Title"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      value={FormRequests.requestTitle}
                      onChange={(e) => {
                        setFormRequests({
                          ...FormRequests,
                          requestTitle: e.target.value,
                        });
                      }}
                    />
                    <span className="flex text-[#e05858] text-xs ml-2 my-2">
                      {requestTitle}
                    </span>
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="Details"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Request Details:
                    </label>
                    <input
                      type="text"
                      name="Details"
                      id="requestDetails"
                      placeholder="Request Details"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      value={FormRequests.requestDetails}
                      onChange={(e) => {
                        setFormRequests({
                          ...FormRequests,
                          requestDetails: e.target.value,
                        });
                      }}
                    />
                     <span className="flex text-[#e05858] text-xs ml-2 my-2">
                      {requestDetails}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="guest"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Request:
                </label>
                <select
                  id="requestType"
                  value={FormRequests.requestType}
                  onChange={(e) => {
                    setFormRequests({
                      ...FormRequests,
                      requestType: e.target.value,
                    });
                  }}
                  
                  className="form-control mt-4 mb-4 py-4 w-full appearance-none rounded-md border border-[#e0e0e0] bg-white px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select...</option>
                  <option value="Feature Request">children</option>
                  <option value="Bug Report">Women's Clothing</option>
                  <option value="Other">Women's shoes</option>
                </select>
              </div>
              <span className="flex text-[#e05858] text-xs ml-2 my-2">
                      {requestType}
                </span>
              <div className="sm:flex justify-evenly">
                <div className="">
                  <button
                    className="hover:shadow-form rounded-md bg-[#5F00CD] hover:bg-[#901DFF] py-3 px-8 text-center text-base font-semibold text-white outline-none "
                    disabled={submitting}
                    type="submit"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
                <div className="py-3">
                  <a
                    href="/dashboard"
                    className="rounded-md bg-gray-400 hover:bg-gray-300 py-4 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Request Details
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormRequests;

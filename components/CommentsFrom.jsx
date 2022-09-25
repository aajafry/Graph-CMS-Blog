import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services/index";

export default function CommentsFrom({ slug }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [ShowSuccessMessage, setShowSuccessMessage] = useState(false);

  const nameEl = useRef();
  const emailEl = useRef();
  const commentEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = (e) => {
    e.preventDefault();
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { value: comment } = commentEl.current;
    const { checked: storeData } = storeDataEl.current;

    const commentObject = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObject).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    });
  };
  return (
    <div className=" rounded-lg shadow-lg p-8 pb-12 mb-8">
      <h2 className=" text-xl font-semibold border-b pb-4 mb-8 capitalize">
        Leave Your Reply
      </h2>

      <form action="" onSubmit={handleCommentSubmission}>
        <div className=" grid grid-cols-1 gap-4 mb-4">
          <textarea
            ref={commentEl}
            className="w-full p-6 outline-none rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200 "
            name="comment"
            placeholder="Comments"
            required
          />
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input
            className="p-2 w-full outline-none rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200 "
            placeholder="Name"
            name="name"
            type="text"
            ref={nameEl}
            required
          />
          <input
            className="p-2 w-full outline-none rounded-lg shadow-sm bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-200 "
            placeholder="Email"
            name="email"
            type="text"
            ref={emailEl}
            required
          />
        </div>
        <div className=" inline-block grid-cols-1 gap-4 mb-4">
          <input
            ref={storeDataEl}
            type="checkbox"
            name="storeData"
            id="storeData"
            value="true"
          />
          <label
            className=" capitalize text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my email and email for next comment
          </label>
        </div>
        {error && (
          <p className=" mt-6 text-sm font-semibold text-red-500">
            * all fields are required.
          </p>
        )}
        <div className=" flex justify-center mt-8">
          <button
            className="inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer capitalize transition duration-500 transform hover:translate-y-1"
            type="Submit"
            // disabled={ShowSuccessMessage}
          >
            Submit
          </button>
        </div>
        {ShowSuccessMessage && (
          <span className=" flex justify-center mt-6 text-sm font-semibold text-green-500">
            Comments Submitted for Review.
          </span>
        )}
      </form>
    </div>
  );
}

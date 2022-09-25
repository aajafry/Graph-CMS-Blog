import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { getcomments } from "../services/index";
export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getcomments(slug).then((result) => setComments(result));
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className=" rounded-lg shadow-lg p-8 pb-12 mb-8">
          <h2 className=" text-xl font-semibold border-b pb-4 mb-8">
            {comments.length}
            {"  "}
            Comments
          </h2>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className=" border-b border-gray-100 mb-4 pb-4"
            >
              <p className=" mb-4">
                <span className=" font-semibold">
                  {comment.name}
                  {"  "}
                  on
                  {"  "}
                  <Moment format="MMM DD, YYYY">{comment.createdAt}</Moment>
                </span>
              </p>
              <p className=" whitespace-pre-line text-gray-500 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

import React, { useState } from "react";
import { utils, read } from "xlsx";
import ReviewGrid from "./reviewGrid";
export const ReviewPortal = () => {
  const [sheetData, setSheetData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [publisherName, setPublisherName] = useState("PUB NAME");
  const [reviewSession, setReviewSession] = useState("Spring Review");
  const [reviewYear, setReviewYear] = useState(2024);
  const [outputView, setOutputView] = useState("summary");
  const [editorialLead, setEditorialLead] = useState(null);
  const readUploadFile = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        console.log(json[0]);
        setSheetData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
    e.target.value = null;
    setIsLoading(false);
  };

  const clearFile = () => {
    setPublisherName("PUB NAME");
    setReviewSession("Spring Review");
    setReviewYear(2023);
    setSheetData(null);
  };

  const printDocument = () => {
    window.print();
  };
  return (
    <div>
      <h3 class="print:hidden py-4">Please upload a file</h3>

      <details
        open
        className="open:bg-white border-b  open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg transition-all print:hidden"
      >
        <summary className="leading-6 text-slate-900 dark:text-white font-semibold select-none">
          Review Report Settings{" "}
        </summary>
        <div class=" sm:w-1/5 text-center items-center m-auto pt-8">
          <label
            class="block text-xs font-medium text-gray-500"
            for="publisher-name"
          >
            {" "}
            Publisher Name{" "}
          </label>
          <input
            type="text"
            name="publisher-name"
            id="publisher-name"
            value={publisherName}
            onChange={({ target }) => setPublisherName(target.value)}
            autoComplete="publisher-name"
            required
            class="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
          />{" "}
        </div>
        <div class=" sm:w-1/5 text-center items-center m-auto pb-8">
          <label
            class="block text-xs font-medium text-gray-500"
            for="review-year"
          >
            Review Year
            <input
              type="number"
              name="review-year"
              id="review-year"
              value={reviewYear}
              onChange={({ target }) => setReviewYear(target.value)}
              autoComplete="publisher-name"
              required
              class="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
            />
          </label>
          <label
            class="block text-xs font-medium text-gray-500"
            for="review-session"
          >
            Review Session
            <select
              id="review-session"
              value={reviewSession}
              onChange={({ target }) => setReviewSession(target.value)}
              class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              name="animals"
            >
              <option disabled value="">
                Select an option
              </option>
              <option>Spring Review</option>
              <option>Fall Review</option>
              <option>Midyear Review</option>
            </select>
          </label>
          <label
            class="block text-xs font-medium text-gray-500"
            for="editorial-name"
          >
            {" "}
            Editorial Lead
          </label>
          <input
            type="text"
            name="editorial-name"
            id="editorial-name"
            value={editorialLead}
            placeholder="Editorial Lead"
            onChange={({ target }) => setEditorialLead(target.value)}
            autoComplete="editorial-name"
            class="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
          />{" "}
        </div>{" "}
        <div className="flex flex-col text-center m-auto  w-2/12 items-center">
          <label
            for="file-upload"
            class="pointer cursor-pointer inline-block px-12 py-3 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white active:bg-red-500 focus:outline-none focus:ring"
          >
            Add File
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="xlsx, xls"
            multiple={false}
            onChange={readUploadFile}
          />
          <button onClick={clearFile} className="pt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        <ul class="flex text-center border-b border-gray-200 pt-4">
          <li class="flex-1">
            <button
              onClick={() => setOutputView("report")}
              class={`${
                outputView === "report"
                  ? "relative block p-4 text-sm font-medium bg-red-500 text-gray-200 border-t border-l border-r border-gray-200 w-full"
                  : "block p-4 text-sm font-medium text-gray-500 bg-gray-100 ring-1 ring-inset ring-white w-full"
              }`}
            >
              <span class="absolute inset-x-0 w-full h-px bg-white -bottom-px"></span>
              Report
            </button>
          </li>

          <li class="flex-1">
            <button
              onClick={() => setOutputView("summary")}
              class={`${
                outputView === "summary"
                  ? "relative block p-4 text-sm font-medium bg-red-500 text-gray-200 border-t border-l border-r border-gray-200 w-full"
                  : "block p-4 text-sm font-medium text-gray-500 bg-gray-100 ring-1 ring-inset ring-white w-full"
              }`}
            >
              Summary
            </button>
          </li>
        </ul>
      </details>

      <div className="p-8 print:p-1">
        {}
        {sheetData && !isLoading && (
          <ReviewGrid
            reviewData={sheetData}
            pubName={publisherName}
            session={reviewSession}
            year={reviewYear}
            outputView={outputView}
            editorialLead={editorialLead}
          />
        )}
        {isLoading && <h3>LOADING</h3>}

        {!sheetData && !isLoading && (
          <>
            <div class="relative p-8 text-center border border-gray-400 rounded-lg">
              <h2 class="text-2xl font-medium">There's nothing here...</h2>

              <p class="mt-4 text-sm text-gray-500">
                Load a file to get started
              </p>
              <p class="mt-4 text-sm text-gray-500">
                To create a new review summary, open "Review Report Settings"
                above.
              </p>
            </div>
          </>
        )}
      </div>
      {sheetData && !isLoading && (
        <>
          {" "}
          <div className="m-4 print:hidden">
            <button
              onClick={printDocument}
              class="inline-block px-12 py-3 text-sm font-medium text-white bg-red-600 border border-red-600 rounded active:text-red-500 hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring"
            >
              Print Report
            </button>
          </div>
          <h5 className="print:hidden text-sm text-gray-600">
            To export this summary press CTRL + P, and set Adobe PDF as the
            printer destination. This summary can be either landscape or
            portrait
          </h5>
        </>
      )}
    </div>
  );
};

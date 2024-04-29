import { useState } from "react";
import Pepper from "../components/pepperLogo.svg";
import ReportLine from "./reportLine";
export default function ReviewGrid(props) {
  let outputView = props.outputView;
  let publisherName = props.pubName;
  let reviewYear = props.year;
  let reviewSession = props.session;
  let editorialLead = props.editorialLead;

  const [reviewData, setReviewData] = useState(props.reviewData);
  const [search, setSearch] = useState("");
  let excelData = reviewData.sort(function (a, b) {
    return (
      b["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] -
      a["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"]
    );
  });

  const ECSelections = excelData.filter(checkEC);
  const CatSelections = excelData.filter(checkCat);
  const WebSelections = excelData.filter(checkWeb);
  const DatabaseSelections = excelData.filter(checkDatabase);

  function checkEC(piece) {
    return piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] >= 8;
  }
  function checkCat(piece) {
    return (
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 5.9 &&
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 8
    );
  }

  function checkWeb(piece) {
    return (
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 4.9 &&
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 6
    );
  }

  function checkDatabase(piece) {
    return (
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] <= 4.9 &&
      piece["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 0.1
    );
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = mm + "/" + dd + "/" + yyyy;

  const ECAlpha = ECSelections.sort(function (a, b) {
    if (
      a["PRODUCT_MASTER.TITLE"] !== null &&
      a["PRODUCT_MASTER.TITLE"] < b["PRODUCT_MASTER.TITLE"]
    ) {
      return -1;
    }
    if (
      a["PRODUCT_MASTER.TITLE"] !== null &&
      a["PRODUCT_MASTER.TITLE"] > b["PRODUCT_MASTER.TITLE"]
    ) {
      return 1;
    }
    if (
      a["PRODUCT_MASTER.TITLE"] == null &&
      a["PRODUCT_MASTER.INDEX_TITLE"] < b["PRODUCT_MASTER.INDEX_TITLE"]
    ) {
      return -1;
    }
    if (
      a["PRODUCT_MASTER.TITLE"] == null &&
      a["PRODUCT_MASTER.INDEX_TITLE"] > b["PRODUCT_MASTER.INDEX_TITLE"]
    ) {
      return 1;
    }
    return 0;
  });

  const sortedDataSet = ECAlpha.concat(
    CatSelections.sort(function (a, b) {
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] < b["PRODUCT_MASTER.TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] > b["PRODUCT_MASTER.TITLE"]
      ) {
        return 1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] < b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] > b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return 1;
      }
      return 0;
    }),
    WebSelections.sort(function (a, b) {
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] < b["PRODUCT_MASTER.TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] > b["PRODUCT_MASTER.TITLE"]
      ) {
        return 1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] < b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] > b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return 1;
      }
      return 0;
    }),
    DatabaseSelections.sort(function (a, b) {
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] < b["PRODUCT_MASTER.TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] !== null &&
        a["PRODUCT_MASTER.TITLE"] > b["PRODUCT_MASTER.TITLE"]
      ) {
        return 1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] < b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return -1;
      }
      if (
        a["PRODUCT_MASTER.TITLE"] == null &&
        a["PRODUCT_MASTER.INDEX_TITLE"] > b["PRODUCT_MASTER.INDEX_TITLE"]
      ) {
        return 1;
      }
      return 0;
    })
  );

  // This function allows the delete button to remove the deleted product from the review report dataset, removing it from both the report view and the summary view
  function deleteLineFromReport(pepperNum) {
    const filteredListData = reviewData.filter(
      (item) => item["PRODUCT_MASTER.PRODUCT_ID"] !== pepperNum
    );

    setReviewData(filteredListData);
  }

  const [foundResults, setFoundResults] = useState(reviewData);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "" && reviewData[0]["PRODUCT_MASTER.TITLE"]) {
      const results = reviewData.filter((rowData) => {
        return rowData["PRODUCT_MASTER.TITLE"]
          .toLowerCase()
          .includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundResults(results);
    } else if (keyword !== "" && reviewData[0]["PRODUCT_MASTER.INDEX_TITLE"]) {
      const results = reviewData.filter((rowData) => {
        return rowData["PRODUCT_MASTER.INDEX_TITLE"]
          .toLowerCase()
          .includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundResults(results);
    } else {
      setFoundResults(reviewData);
      // If the text field is empty, show all users
    }

    setSearch(keyword);
  };
  return (
    <div className="print:max-h-100 print:w-11/12 print:m-auto">
      <div class="border-b-2 p-4 mb-4 flex flex-col text-left  bg-white shadow rounded-lg font-semibold text-xl text-gray-900  m-auto">
        <img src={Pepper} class="w-40 print:w-40" />
        <span className="text-gray-700 print:text-base">
          {" "}
          {publisherName} {reviewYear} {reviewSession} Summary
        </span>
        <div className="text-gray-500 text-xs print:text-[8px]">
          Created {formattedToday} {editorialLead && <> by {editorialLead}</>}
        </div>
      </div>

      {outputView === "summary" && (
        <table class="table p-4 bg-white shadow rounded-lg m-auto w-full text-left ">
          <thead>
            {" "}
            <tr className="bg-red-800 font-semibold ">
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] pl-4 print:text-gray-800 print:font-semibold">
                Promo Code
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:font-semibold">
                Pepper Number
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:font-semibold">
                Title
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:font-semibold">
                Composer
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:font-semibold">
                Publisher SKU
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:font-semibold">
                Publisher Brand
              </th>
              <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100 print:text-[10px] print:text-gray-800 print:hidden">
                {" "}
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {excelData &&
              sortedDataSet.map((rowData) => {
                return (
                  <tr class="text-gray-700 break-after-auto">
                    <td class="border-b-2 p-0.5 text-left pl-4">
                      {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] >= 8 && (
                        <strong class="border  border-yellow-500 text-white bg-yellow-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px] print:text-gray-800 print:font-semibold">
                          EC
                        </strong>
                      )}
                      {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 5.9 &&
                        rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 8 && (
                          <strong class="border border-green-500 text-white bg-green-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px] print:text-gray-800 print:font-semibold">
                            C
                          </strong>
                        )}
                      {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 4.9 &&
                        rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 6 && (
                          <strong class="border border-blue-500 text-white bg-blue-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px] print:text-gray-800 print:font-semibold">
                            W
                          </strong>
                        )}
                      {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] <=
                        4.9 && (
                        <strong class="border border-gray-500 text-white bg-gray-500 uppercase px-5 py-1.5  print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px] print:text-gray-800 print:font-semibold">
                          DB
                        </strong>
                      )}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] print:text-gray-800 print:font-semibold">
                      {" "}
                      {rowData["PRODUCT_MASTER.PRODUCT_ID"]}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] w-2/8 print:text-gray-800 print:font-semibold ">
                      {" "}
                      {rowData["PRODUCT_MASTER.TITLE"] ||
                        rowData["PRODUCT_MASTER.INDEX_TITLE"]}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] print:text-gray-800 print:font-semibold">
                      {" "}
                      {rowData["PRODUCT_MASTER.COMPOSER"] ||
                        rowData["PRODUCT_GROUP.COMPOSER"]}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] print:text-gray-800 print:font-semibold">
                      {" "}
                      {rowData["PRODUCT_MASTER.PUBLISHER_PRODUCT_ID"]}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] print:text-gray-800 print:font-semibold">
                      {rowData["PRODUCT_MASTER.BRAND_CODE"]}
                    </td>
                    <td class="border-b-2 p-0.5 print:text-[10px] print:text-gray-800 print:hidden">
                      <button
                        className="print:hidden"
                        onClick={() =>
                          deleteLineFromReport(
                            rowData["PRODUCT_MASTER.PRODUCT_ID"]
                          )
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}

      {outputView === "report" && (
        <>
          <div
            class="p-4 text-red-700 border-l-4 border-red-700 bg-red-50 my-4"
            role="alert"
          >
            {" "}
            <h3 class="text-sm font-medium">
              Confidential! For internal use only
            </h3>
          </div>
          <div class="relative print:hidden mb-4">
            <span class="absolute text-gray-500 pointer-events-none -translate-y-1/2 top-1/2 left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <label class="sr-only" for="email">
              {" "}
              search{" "}
            </label>

            <input
              type="search"
              value={search}
              onChange={filter}
              class="w-full py-3 pl-12 pr-12 text-sm border-2 border-gray-200 rounded print:hidden"
              placeholder="Search by Title"
            />
          </div>
          <table class="table p-4 bg-white shadow rounded-lg m-auto w-full text-left ">
            <thead>
              {" "}
              <tr className="bg-red-800 font-semibold">
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Reconsider
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Promo Code
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Pepper Number
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Title
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800  print:text-[8px]">
                  Composer
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800  print:text-[8px]">
                  Pub SKU
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800  print:text-[8px]">
                  Publisher
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800  print:text-[8px]">
                  Rating
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800  print:text-[8px]">
                  Comments
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Editors
                </th>
                <th class="border-b-2 p-0.5  whitespace-nowrap font-semibold text-gray-100  print:text-gray-800 print:text-[8px]">
                  Additional Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {excelData &&
                foundResults.map((rowData) => {
                  const isChecked = false;
                  return <ReportLine rowData={rowData} />;
                })}
            </tbody>
          </table>
        </>
      )}
      <div
        class={`flex w-full gap-8 ${
          sortedDataSet.length > 10 && "page-break-after"
        } `}
      >
        <table class="table p-4 bg-white shadow rounded-lg mt-8 w-3/5 text-left ">
          <thead>
            <tr>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900 print:text-base">
                Results
              </th>
              <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900 print:text-base">
                #
              </th>
            </tr>
          </thead>
          <tbody class="text-left">
            <tr class="text-gray-700 pl-4">
              <td class="border-b-2 p-1 dark:border-dark-5 print:text-base pl-4">
                Editors Choice
              </td>
              <td class="border-b-2 p-1 dark:border-dark-5 print:text-base">
                {ECSelections.length}
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="border-b-2 p-1 dark:border-dark-5 print:text-base pl-4">
                Catalog
              </td>
              <td class="border-b-2 p-1 dark:border-dark-5 print:text-base">
                {CatSelections.length}
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base pl-4">
                Web
              </td>
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base">
                {WebSelections.length}
              </td>
            </tr>
            <tr class="text-gray-700">
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base pl-4">
                Database
              </td>
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base">
                {DatabaseSelections.length}
              </td>
            </tr>
            <tr class="text-gray-700 font-bold">
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base pl-4">
                Total
              </td>
              <td class="border-b-2 p-0.5 dark:border-dark-5 print:text-base">
                {excelData.length}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-col p-4 bg-white shadow rounded-lg mt-8  text-left w-full">
          <h1 class="flex-auto text-xl font-semibold ">
            J.W. Pepper Product Evaluation
          </h1>
          <div class="w-full flex-none text-regular font-medium text-gray-600 mt-2 print:text-xs">
            Questions regarding details of the reports can be directed to your
            product line editor, or Ian Mcloughlin, Director of Marketing.
          </div>
          <div class="w-full flex-none text-sm font-medium text-gray-400 mt-2 italic print:text-[9px]">
            The content of this report is confidential. If you have received it
            by mistake, please inform us by an email reply and then delete the
            message
          </div>
        </div>
      </div>
      <div class="table p-4 bg-white shadow rounded-lg mt-8 w-full text-left text-gray-700 text-sm">
        <p class="pb-4">
          {" "}
          <strong>EC</strong> = Highest promotion. "End cap" promotions; High
          visibility on the Pepper website; Titles will be in print promotions;
          will be in the EC viewer with full recordings and full PDFs; likely to
          appear in Pepper constructed reading sessions; high visibility on the
          Pepper website; EC branding. Definitely a stock item
        </p>{" "}
        <p class="pb-4">
          {" "}
          <strong>Catalog</strong> = High promotion. Good visibility on the
          Pepper website; Titles will be in print promotions; Somewhat likely to
          appear in Pepper constructed reading sessions; Will likely be a stock
          item
        </p>{" "}
        <p class="pb-4">
          {" "}
          <strong>Web</strong> = Good visibility on the Pepper website - equal
          to a catalog item. Some titles appropriate for Community/Collegiate
          markets could appear in print promotions or reading sessions.
          Typically, a non-stock item, but if it appears in a print catalog,
          stock would be ordered.
        </p>{" "}
        <p class="pb-4">
          {" "}
          <strong>Database</strong> = No promotional considerations, but will be
          on the website available for customers to purchase with appropriate
          cover images and recordings as provided by the publisher. Non stock
          item.
        </p>
      </div>
    </div>
  );
}

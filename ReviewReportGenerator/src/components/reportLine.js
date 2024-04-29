import { useState } from "react";

export default function ReportLine(props) {
  const rowData = props.rowData;
  const [isChecked, setIsChecked] = useState(false);
  return (
    <tr class="text-gray-700 break-after-auto h-[4rem]">
      <td class="sticky left-0 p-4 bg-white">
        <input
          class="w-5 h-5 border-gray-200 rounded"
          type="checkbox"
          id="row_1"
          value={isChecked}
        />
      </td>
      <td class="border-b-2 p-0.5 text-left w-1/12 ">
        {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] >= 8 && (
          <strong class="border  border-yellow-500 text-white bg-yellow-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px]">
            EC
          </strong>
        )}
        {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 5.9 &&
          rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 8 && (
            <strong class="border border-green-500 text-white bg-green-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px]">
              C
            </strong>
          )}
        {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] > 4.9 &&
          rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] < 6 && (
            <strong class="border border-blue-500 text-white bg-blue-500 uppercase px-5 py-1.5 print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px]">
              W
            </strong>
          )}
        {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"] <= 4.9 && (
          <strong class="border border-gray-500 text-white bg-gray-500 uppercase px-5 py-1.5  print:px-2 print:py-0.5 rounded-full text-[10px] tracking-wide print:text-[8px]">
            DB
          </strong>
        )}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] w-1/12 print:text-gray-800 print:font-semibold">
        {" "}
        {isChecked ? (
          <h2 className="text-blue-600">
            {rowData["PRODUCT_MASTER.PRODUCT_ID"]}
          </h2>
        ) : (
          rowData["PRODUCT_MASTER.PRODUCT_ID"]
        )}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px]  w-2/12 print:text-gray-800 print:font-semibold">
        {" "}
        {rowData["PRODUCT_MASTER.TITLE"] ||
          rowData["PRODUCT_MASTER.INDEX_TITLE"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] w-1/12 print:text-gray-800 print:font-semibold  ">
        {" "}
        {rowData["PRODUCT_MASTER.COMPOSER"] ||
          rowData["PRODUCT_GROUP.COMPOSER"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] print:text-gray-800 print:font-semibold">
        {" "}
        {rowData["PRODUCT_MASTER.PUBLISHER_PRODUCT_ID"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] print:text-gray-800 print:font-semibold ">
        {rowData["PRODUCT_MASTER.BRAND_CODE"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] print:text-gray-800 print:font-semibold ">
        {rowData["PRODUCT_MASTER.AVERAGE_REVIEW_SCORE"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] w-4/12 max-w-4/12 print:text-gray-800 print:font-semibold">
        {rowData["PRODUCT_EDITOR_REVIEWS.COMMENTS"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] w-2/12 print:text-gray-800 print:font-semibold ">
        {rowData["PRODUCT_EDITOR_REVIEWS.EDITOR_NAME"]}
      </td>
      <td class="border-b-2 p-0.5 print:text-[8px] w-2/12 print:text-gray-800 print:font-semibold ">
        <div>
          <label class="sr-only" for="message">
            Message
          </label>
          <textarea
            class="w-full p-3 text-sm border-gray-200 rounded-lg print:text-[8px]"
            placeholder="Comments"
            rows="8"
            id="message"
          ></textarea>
        </div>
      </td>
    </tr>
  );
}

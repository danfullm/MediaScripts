import { ReviewPortal } from "../components/reviewReport";
import Pepper from "../components/pepperLogo.svg";
import HelpModal from "../components/helpModal";

export default function HomePageView() {
  return (
    <div className="bg-gray-200 min-h-screen p-4 print:m-2">
      <img src={Pepper} class="w-40 print:hidden " />
      <h2 class="text-3xl font-bold sm:text-4xl print:hidden ">
        Editorial Review Creator
      </h2>

      <ReviewPortal />
    </div>
  );
}

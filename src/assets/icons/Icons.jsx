import { FaBell, FaBars, FaArrowDown, FaArrowUp,FaDumbbell} from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlinePayment, MdToday, MdAutorenew, MdModeEdit, MdDelete,MdQrCode } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const Icons = {
  QrCode:MdQrCode,
  Bell: FaBell,
  Bars: FaBars,
  Close: IoClose,
  Users: PiUsersThree,
  Credit: MdOutlinePayment,
  Dollar: AiOutlineDollar,
  Today: MdToday,
  Back: IoIosArrowBack,
  Renew: MdAutorenew,
  Edit: MdModeEdit,
  Delete: MdDelete,
  Up: FaArrowUp,
  Down: FaArrowDown,
  Dumble: FaDumbbell,

};

export default Icons;

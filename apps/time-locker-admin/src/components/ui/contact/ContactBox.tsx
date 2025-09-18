import { Link } from "react-router-dom";

const ContactBox = () => {
  return (
    <div className="bg-blue-500 px-8 py-5 text-white rounded-sm">
      <h3 className="font-semibold mb-1">Contact our agents</h3>
      <p className="text-sm font-medium mb-6">
        Feel free to give us a call or send a message if you're having trouble
        completing tasks or have any questions.
      </p>
      <Link
        className="flex justify-center w-3/4 bg-black text-white rounded-sm text-sm py-3"
        to="/"
      >
        Contact us
      </Link>
    </div>
  );
};
export default ContactBox;

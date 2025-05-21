import logo from "../../assets/Brown Elegant Initial Badge Logo (6).png";

const MessageLogo = ({ className }) => {
  return (
    <img
      src={logo}
      alt="App Logo"
      className={`rounded-sm  shadow-md ${className}`}
    />
  );
};

export default MessageLogo;

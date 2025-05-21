import logo from "../../assets/m-leraning logo.png";

const Logo = ({ className }) => {
  return (
    <img
      src={logo}
      alt="App Logo"
      className={`rounded-full shadow-md ${className}`}
    />
  );
};

export default Logo;

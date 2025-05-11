import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const GetStarted = () => {
  return (
    <div className="w-[90%] max-w-md bg-white text-[#051d38] mx-auto mt-28 md:mt-40 shadow-[0_0_20px_rgba(0,0,0,0.1)] my-16 rounded-lg p-6 sm:p-8">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Welcome to ProductA
        </h1>
        <p className="mb-6 text-gray-600 font-medium text-base sm:text-lg">
          A simple and unique product manager
        </p>

        <Link to="/pages">
          <Button variant="secondary" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;

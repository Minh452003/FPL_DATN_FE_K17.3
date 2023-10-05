const ForgotPassword = () => {
  return (
    <div className=" mx-auto bg-[url('https://i.pinimg.com/564x/2f/cc/65/2fcc65edb0dfe0d942a3a1e77cce9718.jpg')] bg-cover h-screen">
        
      <div className="flex justify-center items-center h-screen">
        <div className=" p-8 rounded shadow-md max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">
            Forgot Password
          </h1>
          <form action="reset_password.php" method="post">
            <div className="mb-4">
              <label
                form="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Send Password Reset Link
            </button>
          </form>
          <p className="text-white mt-4">
            Check your email for instructions on resetting your password.
          </p>
          <a
            href="login.html"
            className="block text-white hover:underline mt-4"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>

    // <div className="container mx-auto p-4 bg-white rounded shadow-lg w-full sm:w-96">
    //     <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
    //     <p className="text-gray-600 mb-4">Enter your email address to reset your password.</p>
    //     <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded mb-4" required/>
    //     <button  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Reset Password</button>
    //     <p id="message" className="mt-2"></p>
    // </div>
  );
};
export default ForgotPassword;

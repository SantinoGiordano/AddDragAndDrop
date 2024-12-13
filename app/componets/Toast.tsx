const Toast = ({ message }: { message: string }) => {
  return (
    <>
      <div className="toast">
        <div className="alert alert-info  bg-red-500 rounded-none text-white">
          <span>{message}.</span>
        </div>
      </div>
    </>
  );
};

export default Toast;

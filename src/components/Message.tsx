type MessageProps = {
  message: string;
  isError: boolean;
};

const Message = ({ message, isError }: MessageProps) => {
  const color = isError ? 'bg-red-600' : 'bg-green-600';
  return (
    <div
      className={`text-center my-4 text-white font-bold p-3 uppercase ${color}`}
    >
      {message}
    </div>
  );
};

export default Message;

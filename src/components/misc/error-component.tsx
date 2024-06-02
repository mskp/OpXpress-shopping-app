function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500 text-2xl">
        {message}
      </h1>
    </div>
  );
}
export default ErrorComponent;

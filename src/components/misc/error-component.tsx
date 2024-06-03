/**
 * The ErrorComponent displays an error message centered on the screen.
 * It takes a `message` prop to display the specific error message.
 *
 * @param {Object} props - The props object.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered ErrorComponent.
 */
function ErrorComponent({ message }: { message: string }): JSX.Element {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500 text-2xl">
        {message}
      </h1>
    </div>
  );
}

export default ErrorComponent;

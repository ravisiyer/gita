async function Page() {
  // let arr = new Array(100).fill(0); // Reports warning almost every time, if not every time
  let arr = new Array(50).fill(0); // Reports warning rarely, or does not report warning

  return (
    <div>
      {arr.map((dummy, index) => (
        <div key={index}>
          <p>div key:{index}</p>
          <p>
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah
          </p>
        </div>
      ))}
    </div>
  );
}
export default Page;

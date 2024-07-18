async function Page() {
  let arr = new Array(108);
  arr.fill(2);

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

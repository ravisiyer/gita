async function Page() {
  let arr = new Array(108);
  // let arr = new Array(18);
  arr.fill(2);

  return (
    <div>
      {arr.map((dummy, index) => (
        <div key={index}>
          <p>div key:{index}</p>
          {/* <h4>English Summary</h4> */}
          <p>
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blah blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah blah blah
            blahblah blah blahblah blah blahblah blah blahblah blah blahblah
            {/* blah blah blah blah blahblah blah blahblah blah blahblah blah
            blahblah blah blahblah blah blah blah blah blahblah blah blahblah
            blah blahblah blah blahblah blah blahblah blah blah */}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Page;

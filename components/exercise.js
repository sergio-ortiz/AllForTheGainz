/* parent component might implement something like this 
 Object.entries(data).filter(([k, v]) => /\d/.test(k).map(([k, v]) => <Exercise k={k} v={v} />))
 might have to have a class component with state = data and <Exercise /> <input onChange={(e) => this.setState({}[k] = e.target.value)} />
*/
const Exercise = ({ k, v, data, setData }) => {
  const handler = (e) => {
    const update = data;
    update[k] = e.target.value;
    console.log(update);
    setData((data[k] = e.target.value));
  };
  return (
    <>
      {/1/.test(k) ? (
        <p>
          {k
            .replace(/1/, "")
            .split("_")
            .map((e) => e[0].toUpperCase() + e.substring(1))
            .join(" ")}
        </p>
      ) : null}
      <label htmlFor={k}>set {k.match(/\d/)}</label>
      <input
        id={k}
        type="number"
        value={v || ""}
        onChange={(e) => handler(e)}
      />
    </>
  );
};

export default Exercise;

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import usePrevState from "./hooks/usePrevState";
function App() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);
  // solve one with one effect for debounce tech and the other effect if debounce change fire api  
  // const [debounce, setDebounce] = useState(term);
  // useEffect(() => {
  //   const DebounceSerach = setTimeout(() => {
  //     setDebounce(term);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(DebounceSerach);
  //   };
  // }, [term]);
  const prevTerm = usePrevState(term);
  
  useEffect(() => {
    const searchWiki = async () => {
      const response = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResult(response.data.query.search);
    };
    if (!result.length) {
      if (term) {
        searchWiki();
      }
    } else if (term !== prevTerm) {
      const DebounceSerach = setTimeout(() => {
        if (term) {
          searchWiki();
        }
      }, 1000);
      return () => {
        clearTimeout(DebounceSerach);
      };}
  }, [term, prevTerm, result.length]);
  const Data = result?.map((ele, indx) => {
    return (
      <tr key={ele.pageid}>
        <th scope="row">{indx}</th>
        <td>{ele.title}</td>
        <td>
          <p dangerouslySetInnerHTML={{ __html: ele.snippet }} />
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search Input
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
           {term && (
        <tbody>{Data}</tbody>
      )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { Card, Button, ListGroup } from "react-bootstrap";
import styles from "../styles/History.module.css";

export default function HistoryPage() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={historyItem} onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
              {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
              <Button variant="danger" size="sm" className="float-end" onClick={(e) => removeHistoryClicked(e, index)}>
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>Try searching for some artwork.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
